# Security

**Português:** [SECURITY.md](SECURITY.md). This is a translation; if the two differ, the Portuguese text prevails.

## How to report a flaw

Do not open a public issue. Use GitHub's private reporting: on the
repository page, **Security** tab, **Report a vulnerability** button. Only the people who maintain
the project see the report.

Say:

- what happens and what should happen;
- how to reproduce it: the formula, the file or the exact steps;
- the version: the commit, if you know it, or the date you used it;
- the browser and the operating system.

## What counts as a security flaw

- The verifier accepting a wrong proof, or the Caderno saying "proved" without
  a proof.
- A certificate managing to bring its own axioms, or to swap the formula that
  it certifies.
- Private content leaving the device or going up to the repository: notes,
  keys or personal data.
- An imported file running code, or changing notes it should not.

## What to expect

The people who maintain the project confirm receipt, fix the flaw, and agree with the reporter
on when it becomes public. The credit goes to the reporter, if they
want it.
