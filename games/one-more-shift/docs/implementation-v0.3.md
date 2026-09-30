# Festival Finish — implementation and verification v0.3

September 30, 2026. Status: complete first playable prototype, awaiting human playtesting. This is not a finished commercial game. Design v0.2 remains the scope baseline; the differences below are the implemented rules.

## Delivered experience

Opening instructions; fixed top-down workshop; 18 selectable crew and group-first controls; linked inventory; travel; two technicians; manual assembly; interrupted/resumed repair; energy/rest/forced recovery; warning/failure; once-only rush commitment; dispatch priority; deadlines; pause/slower pace; optional synthesized sound; reduced motion; results with separate outcome dimensions; timeline; deterministic rematch. The six-minute normal run requires no remote service.

`play.html` embeds the source for offline opening. The maintainable files remain `index.html`, `src/engine.js`, `src/app.js` and `src/style.css`. JavaScript was chosen over the earlier TypeScript suggestion to avoid a compilation/install requirement for this bounded prototype. The simulation remains independent of the UI and is directly testable in Node.

## Changes from paper arithmetic

The implemented deterministic step is 1/60 of a shift minute (0.1333 real seconds at normal pace). It conserves whole items; incomplete item progress is held as fractional work, downstream output is deferred one step, and energy drain is prorated to actual work in that step. Transfers and repairs have exact simulated durations. Rendering animates independently; no elapsed wall time accumulates while paused or away from the tab.

Dispatch rate changed from 0.30 to **0.32 items per worker/minute**. With the paper's 0.30 rate, the sampled early/full plan delivered only 59/60 in the smaller-step model. The adjustment restores feasibility without making the sampled bypass/full commitment safe. It is a prototype tuning choice; future player evidence can justify further changes.

| Implemented sampled plan | On-time / accepted | Mean final energy | Lowest final energy |
|---|---:|---:|---:|
| Early repair, full rush, rebalance; rest Gather after completion | 60/60 | 49.3 | 35.8 |
| Bypass first, half rush, same transfers/rest | 54/54 | 52.9 | 36.3 |
| Bypass first, full rush, same transfers/rest | 59/60 | 48.5 | 31.8 |

These are specific scripted schedules, not optimality claims. The final full-rush bypass outcome differs from the earlier paper result of 57/60. Bypass still has a small immediate-output benefit; early repair is still the best known baseline strategy. Strength and entertainment of the alternatives need player testing.

Technicians stay in Repair after completion until reassigned, preserving player control; manual crew automatically return to powered assembly at the same station. Automatic earliest-deadline dispatch is the starting default. Explicit manual priority overrides it until that order finishes. The rush offer auto-pauses once; inspection leaves it pending with a clearly stated default of no added work.

## Verification completed

15 deterministic simulation tests pass: pause immutability; transfer timing and duplicate prevention; once-only rush and expiry; qualified/interrupted repair; technician conflict; unsupervised manual work; mandatory rest/recovery; late-delivery separation; two feasible policies; overcommitment consequence; identical replay; terminal immutability; clean rematch; randomized reassignment with conservation checks.

A Chromium browser check passes through actual controls: opening, 18 crew, group transfers, repair, rush selection, a complete 60/60 shift, results, rematch, pace, reduced motion and keyboard pause. The browser check advances simulation time programmatically between actions, so it verifies integration rather than six minutes of human real-time play. Zero JavaScript page errors and zero remote network requests were observed. Desktop and 390px-wide layouts were rendered and visually inspected; narrow-screen horizontal overflow was checked.

The browser run caught a stale repair-active flag that incorrectly requested confirmation when moving technicians after the machine was already fixed. That was corrected and covered in the simulation regression test. A narrow-layout illustration overflow was also corrected.

## Remaining evidence and next true stopping point

A user can now play a complete shift and report whether controls, consequences and the recovery choice are enjoyable. No real players have been observed yet. Browser checks used Chromium; Firefox/Safari are not certified by this test. The art is stylized CSS and tokens, not final animated character art. There is no hosted production URL or native app installer.

Next work should respond to actual play: unclear selection, small bypass value, pace, moving constraints and voluntary replay. Do not add more scenarios, campaigns, upgrades or portfolio infrastructure before that evidence. The immediate stopping point is the user's first test drive.
