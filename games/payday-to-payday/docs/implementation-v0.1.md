# Payday to Payday — first playable v0.1

## Completed
A complete offline 28-day fictional month: two goal choices, four food/weekly plans, twelve authored event cards, discretionary shifts/rest/friend time, a linked inspection/repair consequence, dated obligations and paychecks, energy/time/cash, choice confirmation, visible availability reasons, result story, ledger and replay. No production artwork, audio, accounts, external services or telemetry. No personal financial data.

Open `../play.html` directly in a browser. No server or installation required. State remains in memory; closing or refreshing starts a new run. Use same-month replay for another strategy, or the alternate bike condition. The initial condition is major; the alternative is minor. Inspecting reveals the condition before a second repair/wait choice. This is a prototype, not a claim about the effectiveness of financial education.

## Frozen rule clarifications versus initial scope
- Week 1 starts at 65 energy: the stated starting 75 already lost its first 10 baseline-work energy. Later weeks lose 10 and receive three time blocks. Resources cannot go below zero.
- Inspection does not advance the calendar until the player chooses repair/wait; otherwise the information would arrive without an opportunity to use it. Repairing after inspection on day 5 costs $20 minor / $60 major. Deferring to day 14 costs $40/$120. Immediate blind repair costs $80.
- Essential bike repairs remain available with outstanding bills. Blocking them would create a recovery trap after day 14, when an unrepaired bike blocks extra shifts.
- The community food choice is available to everyone, as an explicit money/time/energy tradeoff. It costs one block and 10 energy, not social standing. The name is not an eligibility claim about real assistance.
- Optional actions can use remaining blocks between cards, not only at the weekly plan. One extra shift maximum per week; day 17's $90 shift shares that cap with ordinary $70 shifts.
- A day-26 rest or repair does not silently revise an earlier promise. Only the event’s help/delivery/boundary choice resolves it.
- Goals can be booked on day 24 or completed on day 28. Completion is recorded immediately as a commitment to the month-end moment, with no financial return.
- The sale, speaker, café, garden and help choices have their stated effects only. There is no hidden relationship currency or secret future payout. Narrative moments are recorded separately from money.

## Baseline balance results
The source test policies execute the same rules as the playable game. All use the initial major-fault condition. These are a small feasibility screen, not an exhaustive search for dominant strategies or evidence of fun.

| Strategy | Goal | Cash left | Energy | Bills paid | Outstanding | Distinct experience |
|---|---|---:|---:|---:|---:|---|
| Balanced | Gathering completed | $160 | 40 | 7/7 | $0 | Café, garden, repair, gathering, promise kept |
| Recovery-focused | Course completed | $0 | 45 | 7/7 | $0 | More convenience/rest, lamp, delayed repair, extra shift, course |
| Spending-focused | Gathering deferred | $65 | 10 | 7/7 | $0 | Café, lamp, garden, support-food week, delayed repair, delivery help; promise revised |

The recovery policy changed one week from convenience food to cooking to make the course affordable. The spending run cannot purchase every offered object; unavailable choices disclose the constraint. None of these outcomes is labeled a universal win/loss.

[Cash-flow ledger](balance-ledger-v0.1.csv) includes every money change for these policies. Non-money decisions are represented in tests and the in-game journal. Initial resources plus money changes reconcile to each final balance.

## Validation
- Twelve engine tests pass: three strategies, invalid-choice immutability, shift restrictions, deterministic replay, payday/bill ordering, one-time fees and overdue settlement, inspection repair, weekly reset/energy cap, forecast, terminal immutability, promise handling and 150 varied runs preserving invariants.
- Browser integration passes a full month through actual controls: opening goal, cancellation and confirmation, plans/actions, inspection/repair, promises, goal, ending and replay. Expected balanced result: $160, 40 energy, 7/7 bills, goal completed.
- Help and 390px phone overflow checks pass. Screenshots inspected for desktop and phone layouts. No browser page errors or remote requests.
- No human playtest yet. Session duration, enjoyment, narrative attachment and learning transfer remain unvalidated. No claim of a market-ready release.

## Next true gate
Kevin's first playthrough, followed by independent clarity/fun testing. Ask: what choice felt difficult, what felt unfair or obvious, did any decision change your next plan, and would you replay voluntarily? Do not expand scenarios or build a financial simulation before resolving those findings. Keep the three-game testing direction, but Trash Panda still needs its own bounded scope before code.
