/**
 * O idioma da interface. O português é o original. No inglês, cada texto da tela que está no dicionário
 * (idioma-en.ts) é trocado pelo equivalente, e o que não está continua em português. A troca é só de exibição: o
 * texto que a pessoa escreve, os campos, as fórmulas e o código não mudam, e o app continua lendo os mesmos valores.
 * O dicionário só é baixado quando o inglês está escolhido.
 */

export type Idioma = 'pt' | 'en'

const CHAVE = 'cosmos-idioma'
/** Não traduz dentro destes elementos, nem em [data-sem-traducao]. */
const PULAR = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'KBD', 'SAMP', 'NOSCRIPT'])
const ATRIBUTOS = ['placeholder', 'title', 'aria-label', 'alt']

/** A escolha guardada neste aparelho; sem escolha, o idioma do navegador (português para quem usa português). */
export function idiomaEscolhido(): Idioma {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === 'pt' || salvo === 'en') return salvo
  } catch { /* sem armazenamento: segue o navegador */ }
  if (typeof navigator === 'undefined') return 'pt'
  const idiomas = navigator.languages?.length ? navigator.languages : [navigator.language]
  if (!idiomas.some(Boolean)) return 'pt'
  return idiomas.some((i) => i?.toLowerCase().startsWith('pt')) ? 'pt' : 'en'
}

/** Guarda a escolha e recarrega a página (voltar ao português pede a tela original). */
export function trocarIdioma(idioma: Idioma) {
  try { localStorage.setItem(CHAVE, idioma) } catch { /* vale só até fechar */ }
  location.reload()
}

const normaliza = (s: string) => s.replace(/\s+/g, ' ').trim()
const escapa = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Monta o tradutor a partir do dicionário: o texto exato primeiro, depois os modelos com valores no meio. */
export function criarTradutor(textos: Record<string, string>, modelos: [string, string][]) {
  const compilados = modelos.map(([pt, en]) => {
    const partes = pt.split(/\{(\d+)\}/)
    const ordem: number[] = []
    let fonte = '^'
    partes.forEach((p, i) => {
      if (i % 2) { ordem.push(Number(p)); fonte += '(.+?)' } else fonte += escapa(p)
    })
    return { re: new RegExp(fonte + '$', 's'), ordem, en }
  })
  return (texto: string): string | null => {
    const t = normaliza(texto)
    if (!t || !/[A-Za-zÀ-ÿ]/.test(t)) return null
    const exato = textos[t]
    if (exato !== undefined) return exato
    for (const { re, ordem, en } of compilados) {
      const m = re.exec(t)
      if (!m) continue
      const valores: string[] = []
      ordem.forEach((n, i) => { valores[n] = m[i + 1] })
      return en.replace(/\{(\d+)\}/g, (_, n: string) => {
        const v = valores[Number(n)] ?? ''
        return textos[normaliza(v)] ?? v
      })
    }
    return null
  }
}

/** Liga o inglês na página, se for o idioma escolhido. A página fica escondida até a primeira troca (no máximo 2 s). */
export async function iniciarIdioma() {
  if (typeof document === 'undefined' || idiomaEscolhido() !== 'en') return
  const raiz = document.documentElement
  raiz.lang = 'en'
  raiz.style.visibility = 'hidden'
  const mostrar = () => { raiz.style.visibility = '' }
  const reserva = setTimeout(mostrar, 2000)
  try {
    const { TEXTOS, MODELOS } = await import('./idioma-en')
    traduzirPagina(criarTradutor(TEXTOS, MODELOS))
  } catch (e) {
    console.warn('Cosmos: o inglês não carregou; a página segue em português.', e)
  } finally {
    clearTimeout(reserva)
    mostrar()
  }
}

function traduzirPagina(traduzir: (texto: string) => string | null) {
  // o valor que esta função pôs em cada nó: se o app não mexeu nele, não traduz de novo
  const posto = new WeakMap<Node, string>()

  const fora = (el: Element | null) => !!el && (PULAR.has(el.tagName) || el.closest('[data-sem-traducao]') !== null || (el as HTMLElement).isContentEditable)

  const texto = (no: Text) => {
    const pai = no.parentElement
    if (!pai || fora(pai)) return
    // opção sem value: o texto é o valor que o app lê
    if (pai.tagName === 'OPTION' && !pai.hasAttribute('value')) return
    if (posto.get(no) === no.data) return
    const novo = traduzir(no.data)
    if (novo === null) return
    const inicio = /^\s*/.exec(no.data)![0], fim = /\s*$/.exec(no.data)![0]
    const valor = inicio + novo + fim
    posto.set(no, valor)
    if (valor !== no.data) no.data = valor
  }

  const atributo = (el: Element, nome: string) => {
    if (fora(el)) return
    const v = el.getAttribute(nome)
    if (!v) return
    const novo = traduzir(v)
    if (novo !== null && novo !== v) el.setAttribute(nome, novo)
  }

  const no = (n: Node) => {
    if (n.nodeType === Node.TEXT_NODE) { texto(n as Text); return }
    if (n.nodeType !== Node.ELEMENT_NODE) return
    const el = n as Element
    if (fora(el)) return
    for (const a of ATRIBUTOS) atributo(el, a)
    const caminho = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (x) => x.nodeType === Node.ELEMENT_NODE && (PULAR.has((x as Element).tagName) || (x as Element).hasAttribute('data-sem-traducao'))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    })
    for (let x = caminho.nextNode(); x; x = caminho.nextNode()) {
      if (x.nodeType === Node.TEXT_NODE) texto(x as Text)
      else for (const a of ATRIBUTOS) atributo(x as Element, a)
    }
  }

  no(document.documentElement)
  new MutationObserver((mudancas) => {
    for (const m of mudancas) {
      if (m.type === 'childList') m.addedNodes.forEach(no)
      else if (m.type === 'characterData') texto(m.target as Text)
      else if (m.type === 'attributes' && m.attributeName) atributo(m.target as Element, m.attributeName)
    }
  }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS })
}
