# Payday to Payday

A short, turn-based fictional life strategy game about making room for the life you want between paydays.

**Status:** first complete playable prototype v0.1. Human fun/clarity testing is next.

## Play
Download `play.html` and open it in your browser. Choose a goal, read the in-game guide and play the month. No installation, server, accounts or personal financial information required. Nothing advances while you read. Progress resets on refresh/closing; replay is available at the end.

- [Initial scope](docs/scope-v0.1.md)
- [Implementation, rule clarifications and balance results](docs/implementation-v0.1.md)
- [Frozen card choices and effects](docs/content-v0.1.md)
- [Three-strategy cash-flow ledger](docs/balance-ledger-v0.1.csv)

## Development
`npm test` runs the engine suite. `npm run build` regenerates the standalone file. Optional browser integration requires Playwright and Chromium; set `PAYDAY_BROWSER_PATH` to the executable and run `npm run test:browser`. Set `PAYDAY_SCREENSHOT_DIR` to save screenshots. These are test-time tools, not game dependencies.

The scenario uses fictional amounts and payment rules. It is entertainment, not a tool for managing real finances.
