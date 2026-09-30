# One More Shift — Festival Finish

Status: pre-production. No playable build exists yet.

## 5. One More Shift — initial pre-production package
### Player fantasy and premise
“Everything is going sideways, but my crew and I can pull this off.”

The player coordinates the final 45 minutes at a whimsical neighborhood workshop that builds bizarre gadgets. Eighteen expressive crew members work across Gather, Assemble and Dispatch. A machine seizes just as a festival order rush appears. Rescue the promises worth keeping, repair or bypass the fault, and keep enough crew energy to finish well. The setting is playful rather than a replica of Amazon or an industrial training scenario.

The camera shows the whole workshop. Packages hop along colorful lanes; crew jog between stations; blocked queues wobble; a repaired machine bursts back to life with a satisfying rhythm. The player directs flow rather than manually performing every task.

### Moment-to-moment loop
1. Notice an approaching deadline, blocked lane, fatigue cue, or event telegraph.
2. Pause if desired; inspect an area's expected throughput and the effect of a transfer.
3. Select one or several crew members and send them to a station, repair bay, or rest area. Change the order priority when necessary.
4. Resume and watch the workshop respond: one queue drains, another grows, a repair progresses, a deadline shifts from possible to precarious.
5. Make the next adjustment or deliberately hold the plan. A successful recovery should create a visible burst of progress.

Target: an interesting decision every 15–30 real seconds, not a click quota. Avoid rewarding needless reassignment. Ordinary flow remains automatic.

### Decisions and understandable tradeoffs
| Decision | Immediate benefit | Visible cost or risk |
|---|---|---|
| Move crew to the current constraint | Drain its queue faster | Travel delay and reduced capacity elsewhere |
| Repair the machine | Restore future throughput | Qualified crew stop ordinary work during repair |
| Use manual bypass | Keep some assembly running immediately | Lower rate and faster fatigue; cannot ignore that cost |
| Rest a tired group | Recover sustainable capacity | Less work during the rest interval |
| Prioritize a near deadline | Rescue that order | Another order waits; show which one |
| Accept all, part, or none of the rush | More fulfilled promises and reward | Less slack and a larger recovery problem |
| Retain a small reserve | Faster disruption response | Lower current utilization |

No overtime purchase, dismiss-worker button, hidden personality penalties, or mandatory unsafe action. Crew refuse actions beyond clearly stated limits; exhaustion never grants limitless output. Partial success is legitimate.

### Scenario: Festival Finish
Initial 18 crew: six at each area. Six are cross-trained technicians, two initially at each area. All can perform ordinary work; any two technicians can repair. A technician's special qualification is visible on their token. Crew start with 75 energy out of 100.

Use **45 simulated minutes = 360 real seconds** at normal speed. One simulated minute takes eight real seconds. Pause freezes simulation and event time; offer a slower pace at 16 real seconds per simulated minute. No score penalty for pausing or slower speed. The countdown explicitly says “shift minutes,” so no one expects a 45-minute session.

Three areas form a strict chain: Gather → Assemble → Dispatch. Initial unfinished work: 18 items waiting to Gather, 12 ready for Assemble, and 6 ready for Dispatch; zero completed. Three base orders total 36 items: 12 due at elapsed minute 15, 12 at minute 30, and 12 at minute 45. Items are identical in v0.1 and assigned to orders only when dispatched; the player chooses priority. This avoids three item inventories per station before that complexity earns its place.

A ten-item incoming rush is announced at elapsed minute 12, arrives at minute 15, and is due at minute 45. Player can accept 0, 5, or 10 before arrival. Accepted quantity adds unfinished items to Gather. Rejected quantity loses an opportunity, not a moral grade; the result screen shows fulfilled work against the full available 46-item opportunity and against the commitments actually accepted.

The assembly machine rattles at elapsed minute 6 and fails at minute 8. Failure stops normal assembly. Player can use the manual bypass and/or repair it; bypass cannot multiply output by adding unlimited workers. Repair needs two technicians and four simulated minutes of continuous work. Progress persists if one leaves, but stops until two are present. Machine remains fixed for the rest of the baseline scenario.

### Initial simulation parameters — tuning values, not realism claims
| System | Proposed rule |
|---|---|
| Fixed step | 0.1 real-second simulation step; render separately; aggregate identical workers without pathfinding |
| Normal area output | Per simulated minute: min(assigned workers, area slots) × rate × mean energy factor |
| Area rates and slots | Gather 0.25 items/worker/minute, 8 slots; Assemble 0.20, 8 slots; Dispatch 0.30, 6 slots |
| Fractional work | Accumulate work credit; produce an integer item when credit reaches 1 and upstream inventory exists; blocked areas do not bank unlimited future credit |
| Travel | One simulated minute between any areas; moving crew produce nothing while in transit |
| Energy | Productive normal work uses 1 energy/minute; manual assembly uses 2; repair uses 1; rest restores 4; idle or travel neither drains nor restores |
| Energy effect | 40–100 energy: full rate; 20–39: 75% rate; below 20: crew automatically rests to 40; show thresholds in UI |
| Manual bypass | Maximum four workers, 0.10 items/worker/minute before energy factor |
| Machine repair | Two technicians × four simulated minutes; no cash, random repair success, or extra resource stock |
| Buffers | Unbounded for this prototype; queue size creates delay pressure, not invented spill penalties |
| Deadlines | Late work remains deliverable with a late flag; no compounding arbitrary punishment |

At six workers per area, assembly is the normal bottleneck. That is intentional for onboarding, but transferring everyone there cannot work because upstream and dispatch starve. Baseline rates require balance checks against several policies before player testing; feasibility is not yet certified. Tune so at least two different humane strategies can meet base commitments, and the full rush requires tighter decisions. Do not manufacture difficulty by making the tutorial mathematically impossible.

### Pressure and consequence system
The timer, queue shapes, deadline cards, repair bar, and crew energy are the complete pressure surface. No opaque “chaos” meter. Event notices explain what is known; optional later variations can give uncertain ranges, explicitly labeled.

Pressure rises in three acts: establish flow, recover from failure, decide how much rush to absorb. Each intervention creates a delayed consequence through the same model. One worker leaving must visibly reduce area capacity; no invisible rubber-banding. Warnings precede fixed events in the baseline. Random variants come only after deterministic strategies are understood.

### Progression structure
Prototype: one scenario, repeat with the same seed and compare two runs. No unlock grind.

Later vertical slice: three shifts introduce transfer delays, repairs and rush decisions separately, then combine them. New crew roles, layouts and tools expand choices without granting flat permanent production bonuses. Campaign progression awards responsibility and new puzzle relationships; previously earned knowledge remains useful. Challenge seeds use equal starting conditions.

### Scoring and feedback
Use an outcome card with three equally visible dimensions: commitments fulfilled on time, crew condition, and recovery story. Never hide human cost inside a single productivity grade.

Optional prototype comparison score: 70 × (on-time items / 46 available items) + 30 × (mean final crew energy / 100), rounded to an integer. The full denominator stays 46 so rejecting everything cannot manufacture a perfect fulfillment score. This formula represents a declared game challenge, not an objective moral ranking; display its weights and allow unscored play. Also show accepted commitments met, late items, unaccepted opportunities, auto-rest incidents, and rush quantity chosen. No public leaderboard in v0.1.

The recovery story uses observable facts: “Moving two crew restored Dispatch capacity; five waiting items left before the deadline.” Avoid claiming causality from correlation. Alternate strategy comparisons require re-simulating a branched run under the same event timeline; this is later scope. Prototype feedback may describe measured changes and timing, but must not invent the counterfactual claim “you would have saved eight items.”

### Failure, recovery and replay
The run always reaches shift end, even with missed deadlines. Late orders remain meaningful, repair progress is retained, and rest restores crew. At the end, choose Rematch, Slower Pace, or Review Timeline. Same-seed replay provides a fair test of a new strategy. New seed is a later option; the first fixed scenario teaches the system without memorized arbitrary punishment.

A run can fail the chosen order target and still demonstrate good recovery. Crew exhaustion is visible and reversible. The game does not punish pauses, accessibility settings, or refusal of the rush.

### Tone and visual direction
Warm, slightly mischievous miniature workshop; chunky silhouettes, toy-like conveyors, silly gadget orders, short crew reactions, and a restrained soundtrack that gains layers as flow returns. Human crew have names and tiny expressive reactions, but no 18 biographies to read. Character humor points at situations, not suffering or incompetence.

Use a fixed top-down or shallow isometric board. Three big station regions and visible lanes dominate the screen. Workers remain countable and selectable; no tiny tables. Labels, icons and shape support color. Reduce-motion, independent audio controls, keyboard selection, pause, and slower pace are part of the prototype design. Events communicate through text as well as animation/sound.

### Smallest playable prototype — build contract
**Includes:** one screen; 18 selectable tokens; three linked areas; visible queues and animated item flow; travel; energy/rest; machine warning/failure/repair/bypass; one rush decision; three order deadlines; pause/slower pace; shift-end card; instant deterministic rematch; basic event/action timeline. Simple geometric art is sufficient if movement and sound communicate cause and effect.

**Controls:** click a worker or select a group, then click destination; Shift-click adds/removes workers; a station offers “move one” and “move two” shortcuts for accessibility. Keyboard cycles areas/crew and confirms destination; Space pauses. Repair and Rest are explicit destinations. Order cards allow selecting dispatch priority. Invalid actions explain the missing condition. No drag-only interaction requirement.

**Implementation recommendation:** a static TypeScript desktop browser game, with one simulation module independent of rendering, scenario configuration data, and a lightweight canvas/SVG or DOM view. No backend, login, external service, generative AI, real employee data, or persistent analytics requirement. Store a local replay log and last result only if useful. Choose rendering tooling during implementation; do not spend pre-production selecting a portfolio engine.

**State model:** elapsed time, crew role/location/target/energy, station inventory/work credit, machine mode/repair progress, orders/fulfilled counts/deadline status, rush choice, scheduled events, and timestamped player actions. Seed and scenario version accompany any replay. UI derives from simulation; it does not maintain independent queue totals.

**Required correctness checks:** workers always total 18 including travel/rest/repair; item conservation from initial and accepted rush through every stage; no downstream processing without upstream inventory; pause changes nothing; crew move only once per command; repair requires two technicians; rush resolves once; identical scenario/actions reproduce identical results; terminal state resolves all deadline flags. These are meaningful simulation tests, not mirrored UI tests.

**Excluded:** hiring, payroll, infinite inventory catalog, freeform building, multiple maps, pathfinding, dialogue trees, co-op, cloud saves, leaderboards, monetization, account system, mobile store packaging, permanent upgrades, and full campaign.

**Playable acceptance:** a new player can start, reassign, repair or bypass, decide on rush, finish, understand consequences, and rematch without a facilitator. The board visibly responds to every committed action. Basic orders are achievable by at least two policies with different crew-energy outcomes; no single static staffing plan dominates every tested event variant. Baseline run takes six active minutes plus chosen pauses.

### Prototype evaluation and release gates
Observe 8–12 volunteer players, with at least half outside operations/supervisory work and several outside management-game fandom. This is a directional usability/fun screen, not statistical proof of demand or learning transfer. Get consent before collecting recordings; local notes are sufficient.

Before explaining the TR mission, ask players what they think the goal is. Watch first, help only when stuck, and record facilitator intervention. Proposed go/pivot targets: at least 8 of 10 can complete unaided; at least 6 of 10 voluntarily choose a second run when stopping is explicitly easy; at least 7 of 10 can name one action and a visible consequence; and “feels like chores/my job” is not a recurring complaint. These are planning thresholds, not validated benchmarks.

Measure variety: did players repair early, bypass first, maintain reserve, or choose a smaller rush? If all successful players repeat one script, adjust the system before adding content. Ask separately about fun, clarity, pressure, and desire to replay. Better scores on replay are evidence of learning this game, not evidence of improved workplace judgment.
