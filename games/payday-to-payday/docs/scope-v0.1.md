# Payday to Payday — scope and opportunity map v0.1

Status: pre-production proposal; no game code, financial data integration or market validation. This document is the build direction, not a claim that the loop is already fun. Fictional dollars and rules serve this scenario, not financial advice or local cost estimates.

## Product promise
Live a month worth remembering without running out of options before the next payday. A warm, humorous, turn-based life strategy game where money buys possibilities, time makes them happen, and recovery keeps them available. Players should want to see what happens next and replay a different life strategy.

The fantasy is making a small life feel like your own: a friend’s invitation, a noisy bike, an extra shift, a tempting sale, a creative opportunity. Avoid a bank dashboard, moral judgments about purchases, or treating work as the only legitimate choice. The world should notice generosity, enjoyment and ambition as well as cash reserves.

## Portfolio map
| Dimension | Direction |
|---|---|
| Family | Financial and resource judgment, with interpersonal choices |
| Player fantasy | Keep life moving and make room for something you care about |
| Judgment | Cash timing, opportunity cost, uncertainty, competing priorities, recovery and revising plans |
| Loop | Look ahead → choose a commitment → resolve its costs → see consequences → revise at the next decision |
| Audience | Initial test: 16+ players who enjoy narrative choices, light strategy and life simulation; no budgeting knowledge assumed |
| Genre/platform | Turn-based narrative resource game; responsive offline browser prototype, desktop and phone targets |
| Progression | Unlock more situations and choices; improve forecasting and strategy, not grind money or gain permanently cheaper bills |
| Replay | Same scenario for controlled comparison, then curated event variants and different personal goals |
| Social | Share a fictional month-end story and strategy, not wealth rankings or personal finances |
| Commercial hypothesis | Free bounded demo plus a paid full game/scenario collection; test later, no launch monetization in prototype |
| Complexity | Medium overall; low–medium for one scenario. Main risk is meaningful writing/balance rather than rendering |
| TR fit | Consequences illuminate choices; different lives can be worthwhile; the player owns priorities |
| Runway bridge | Optional end-screen invitation to a separate practical tool after game enjoyment is validated; no account import or compulsory referral |
| Trifecta role | Deliberate personal choices contrast with One More Shift’s live flow and Trash Panda’s proposed heist tactics |

## Moment-to-moment experience
A fictional neighborhood scene surrounds a large event card. The player sees cash now, the next income date, upcoming obligations, remaining free-time blocks this week, and energy. An expandable timeline answers “what happens before I am paid again?” A choice previews exact known money/time/energy effects; uncertain results have bounded ranges and explicit conditions. Resolve animates purchases, invitations and consequences in the scene and timeline. Nothing advances on a real-time clock.

Each week starts with a short plan choice. Between plans, three authored event cards create decisions. The timeline advances to the next card and settles intervening dated items in chronological order. About 16 meaningful choices across 28 fictional days; target 8–12 real minutes, to be measured in playtests. No clicking through 28 empty days.

## Smallest playable scenario: First Month on Your Own
One fictional adult, a modest apartment and a bike. Starting cash $420, energy 75/100. Paydays: $720 on day 8 and $720 on day 22. Four weeks: days 1–7, 8–14, 15–21, 22–28. Three discretionary time blocks per week, replenished at week start; unused blocks expire. Baseline work is already reflected in income and the weekly energy loss. The discretionary blocks represent remaining free time, not every hour of life.

Choose a primary personal goal at the opening: host a small gathering ($100 and one block in week 4) or begin a creative course ($160 and one block in week 4). Neither is the correct goal. Both remain optional opportunities; other goal completion is recorded too. The month-end result shows essentials, commitments, goal progress, cash and energy separately, with no universal virtue score.

### Known cash calendar
| Day | Item | Cash change |
|---:|---|---:|
| Start | Available cash | +420 |
| 2 | Rent installment | -300 |
| 6 | Phone | -40 |
| 8 | Paycheck, before that day’s choices | +720 |
| 9 | Rent installment | -300 |
| 13 | Transit upkeep | -60 |
| 16 | Rent installment | -300 |
| 20 | Utilities | -100 |
| 22 | Paycheck, before that day’s choices | +720 |
| 23 | Rent installment | -300 |

Known bills total $1,400. Four planned food packages cost $35/week = $140; quick-meal packages cost $70/week = $280. Food choice is paid once per week, covers the week, and is independent of energy: planned food uses one block, quick food uses zero. A payment cannot be made with unavailable cash. If a plan is unaffordable, choose one explicit hardship food option: $0, one block, -10 energy; this scenario abstraction is explained in the guide. No hidden daily food debits.

All four rent dates and bill settlement rules are visible from the opening. Available cash is not presented as safe discretionary spending. The game’s look-ahead displays balance after known obligations, with a clear warning that future choices/events are excluded.

## Decision vocabulary
| Decision | Exact starting rule | Consequence / tension |
|---|---|---|
| Planned food | -$35, -1 block | Preserves cash, spends time |
| Quick food | -$70, no blocks | Buys freedom to do something else |
| Optional extra shift | +$70, -1 block, -15 energy; max once/week | Helps liquidity but competes with recovery and plans |
| Rest | -1 block, +20 energy capped at 100 | Protects later options without immediate cash benefit |
| Friend time | -$25, -1 block; marks a relationship moment | A worthwhile experience that does not earn money |
| Gathering goal | -$100, -1 block; week 4 only, once | A chosen social milestone |
| Course goal | -$160, -1 block; week 4 only, once | A chosen creative milestone; no fictional instant income return |
| Decline / defer optional event | Usually $0, no block | Preserve options; character response acknowledges the choice |

After each weekly food plan, the player may schedule remaining blocks as shifts, rest or unscheduled time. Scheduling resolves costs immediately; unscheduled time is available for that week’s event cards. At the beginning of each week energy loses 10, including week 1; then the player plans. Energy below 30 disables extra shifts until recovery. Spending the last free block is allowed but clearly previews which later invitations cannot be accepted. All unavailable options show why. Food hardship cannot force energy below 0.

## Event map — 12 authored cards
| Day | Situation | Primary judgment |
|---:|---|---|
| 3 | Friend invites you out before the first payday | Connection vs early liquidity |
| 5 | Bike makes an odd sound; mechanic offers a $30 inspection | Buy evidence, repair or take a disclosed risk |
| 8 | Payday and a tempting $80 sale | Current cash vs next obligations |
| 10 | Swap an inconvenient commitment with a friend | Time and reciprocity; do not invent an infinite cash exploit |
| 12 | Offer to host a small community task | Give time vs retain a block |
| 14 | Consequence card for the bike decision | Earlier evidence changes options; no unrelated punishment |
| 17 | An optional shift becomes available | Recovery vs liquidity; counts toward weekly shift cap |
| 19 | A desired item is available used for $45 | Timing, enjoyment and reserve |
| 22 | Second payday; preview final obligations | Plan before spending |
| 24 | Prepare the chosen week-4 milestone | Preserve the block and cash needed to follow through |
| 26 | Friend needs help; decline, offer a block, or give $20 | Boundaries and generosity |
| 28 | Goal opportunity and month-end story | Fulfill a chosen commitment or own the revision |

Cards without a cash/time consequence still require a meaningful information or commitment decision; remove filler if a card does not change later play. Only the bike chain has uncertain monetary outcomes in v0.1. Other writing must use fixed, previewed effects. Freeze each card’s exact choices and availability in the content sheet before coding; no procedural story generator.

Bike chain starting specification: the underlying condition is minor or major, set at scenario start. Inspect costs $30 and reveals it; repair after inspection costs $20 minor / $60 major, no time block. Immediate blind repair costs $80 and resolves either condition. Waiting produces no charge on day 5; on day 14 repair costs $40 minor / $120 major. Show both possible waiting costs before commitment. A fixed seed uses major for the first baseline; replay variants may choose either. An unaffordable repair remains pending and disables optional extra shifts until paid, representing commuting disruption; base paycheck remains intact. No surprise pay cut. Inspection information persists visibly in the journal.

## Consequences, setbacks and endings
Known bills settle automatically on their dates if cash is sufficient. If a bill cannot settle, cash stays unchanged and the full amount becomes a visible outstanding obligation. It does not silently consume a partial payment. One fixed $15 late charge attaches to that bill once; no daily compounding. Optional spending is blocked until outstanding bills are resolved, but extra shifts and rest remain available. After any cash gain, overdue bills settle oldest first when the full amount including its fee is affordable. The player can inspect this rule before accepting a choice. These are fictional game rules, not claims about real creditors.

The run continues through hardship; no eviction animation, humiliation or sudden game over. Endings acknowledge what the player accomplished and left unresolved. Example: “You hosted the gathering and made every payment, but finished exhausted”; “The course waits until next month; your reserve grew”; “A rough middle week left one bill outstanding. Your repair kept later choices open.” No ending calls the player financially irresponsible.

## Tone, art and audio
Warm illustrated neighborhood; mildly absurd sale copy, recognizable friends and charming objects. Cash changes are readable but not casino-style showers. Consequences appear in the world: repaired bike, gathering lights, a course sketchbook. Use authored portraits or code-native placeholders in the prototype. Optional soft interface sounds; no distress alarms, streaks, punishment for leaving, countdown offers or notifications. Reduced motion, keyboard controls, text contrast and touch targets are acceptance criteria.

## In-game teaching — mandatory scope
Start with: “Make it through the month and leave room for something you care about.” Guide the first food choice with highlighted costs, explain time blocks, then highlight the next bill/payday on the timeline. Teach before the first irrevocable decision. Keep Help reopenable. Every card explains unavailable choices, previews known changes, labels uncertainty and asks for a single explicit confirmation. Distinguish available cash from projected cash, preview from actual, and shift minutes in One More Shift from dated turns here. No external instructions required.

## Included and excluded
Included: one month, one character, two personal-goal options, four weekly plans, twelve cards, one bike consequence chain, visible cash calendar, deterministic seed/replay, in-game guidance, outcomes and local reset. Approximately 16–20 decisions depending on scheduled blocks; do not inflate clicks to meet a count.

Excluded: bank connections, real budgets, investing, credit scoring, loans, interest calculations, tax calculations, multiple jobs, city navigation, multiplayer, accounts, cloud saves, AI-generated dialogue, procedural economies, monetization, meta-currency, advertising and production art packs. No shared hub launcher until separate games justify it.

## Prototype acceptance and testing
First prove feasibility with a paper ledger: one viable balanced path, one recovery path and one tempting-spend path with distinct consequences. Do not claim exact balance before this check. Verify no negative cash, duplicated paychecks/bills, repeated fees or shift-cap exploit; time resets and deterministic replay must work. Test date ordering and overdue settlement around payday.

Observe 8–12 players separately from the One More Shift test. No instructions from the facilitator after the opening. Directional gates: at least 8/10 can identify the next bill and payday, 8/10 can explain why one option is unavailable, 6/10 voluntarily choose a replay or request another scenario, and at least three recognizable strategies appear. Ask what was fun before asking what they learned. Small samples guide iteration; they do not validate commercial demand or learning transfer.

Pivot if players mainly optimize a number, regard rest/social choices as traps, wait for prescribed correct answers, or replay only because the interface was unclear. A fixed authored month must be fun before generating more content. A follow-up scenario can change income timing and obligations to test transfer after enjoyment is established.

## Progression and commercial direction after the gate
Later scenarios add one system at a time: irregular pay, shared commitments, equipment choices, or uncertain opportunities. Unlock scenarios through completion or direct selection, not repetitive saving. Allow practice, lower pressure, full forecasts and replay seeds. Prototype is free for testers. Evaluate a paid scenario collection only after replay and audience evidence; never sell extra energy, a way out of debt, retries, better outcomes or artificial scarcity.

## Build sequence and stopping point
1. Freeze card choices and run the three paper ledgers; resolve arithmetic and strategy dominance.
2. Build deterministic dates, ledger, plans, resources and card state; meaningful edge-case tests.
3. Build one complete guided month and result/rematch screen; no production polish first.
4. Observe players, revise the dominant friction, then release the bounded trifecta test when each game passes its own clarity gate.

Current stopping point: scope complete; card-level content and paper balance are next, before game code. No user decision blocks those steps. One More Shift can be tested during Payday pre-production; keep only one active new game implementation at a time. Trash Panda remains an opportunity brief until its own bounded scope is defined.
