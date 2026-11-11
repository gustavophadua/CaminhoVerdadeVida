// Os testes do Tubo no verificador do Cosmos (fora da suíte da CI: cada arquivo abre o Z3, de cerca de 2 GB).
// Uso, na raiz do repositório: npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { maxWorkers: 1, include: ['autor/projeto-tubo/cosmos/**/*.test.ts'] },
})
