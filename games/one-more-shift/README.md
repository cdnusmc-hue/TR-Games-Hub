# One More Shift — Festival Finish

Playable prototype **0.3.0**. One workshop, 18 crew, a failed machine, a late rush and a six-minute strategy run. This is a functional prototype for testing decisions and replay; it has not yet been validated with players.

## Play now

Download **[play.html](play.html)** using GitHub's **Download raw file** button, then open the downloaded file in a modern browser. All visuals, styles, sound cues and simulation are embedded. No installation, login, network connection or local server is required. Desktop landscape is the intended first experience; the narrow-screen layout is also usable.

Select an area's ordinary crew, choose 1/2/all, then click a destination. Select the two technicians separately. Pause freely. Manual assembly needs one technician; repair needs both. Transfers take one shift minute. Energy below 40 slows output; below 20 triggers recovery. Rest restores energy. The rush offer pauses once and lets you commit to 0, 6 or 12 extra items.

Normal pace: approximately six active minutes, plus your pauses. Slower pace: approximately twelve active minutes. Space pauses when focus is outside interactive controls. Tab and Enter operate controls. Shift-click adds individual crew to selection.

## Development and verification

No runtime dependencies. From this directory:

- `npm test` — deterministic simulation tests.
- `npm run build` — regenerate the embedded `play.html` from `index.html` and `src/`.
- `npm run serve` — optional development server at localhost:8080.

Optional browser check: install Playwright and Chromium in your development environment, then run `node tests/browser-smoke.cjs`. `OMS_BROWSER_PATH` can select an existing Chromium executable; `OMS_SCREENSHOT_DIR` can save visual artifacts. These packages are verification tools, not game dependencies.

The build artifact is committed so downloading one file is enough to play. Regenerate it after changing source.

## Design and implementation evidence

- [Design v0.2](docs/design-v0.2.md)
- [Original paper balance worksheet](docs/balance-v0.2.md)
- [Implementation notes and current balance](docs/implementation-v0.3.md)

The current simulation uses 1/60-shift-minute steps and a Dispatch rate of 0.32 items per worker/minute. The older coarse worksheet uses 0.30 and remains historical evidence, not an exact forecast of this implementation.
