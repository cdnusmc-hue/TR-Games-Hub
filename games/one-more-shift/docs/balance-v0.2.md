# Festival Finish — numerical balance worksheet v0.2

Status: analytical pre-production ledger. No game implementation. Model assumptions intentionally visible; the numbers are reproducible but not a certified real-time game balance.

## Calculation convention

Forty-five one-minute intervals: [0,1), [1,2), … [44,45). A move at t arrives at t+1. Events and arrivals at each interval start happen before production. All areas process their **start-of-interval** inventory; their output enters the next area at interval end, so an item cannot cross multiple stations within a single minute. Delivery at a deadline counts as on time. Arrival of rush at t=12 is reflected in the checkpoint for minute 13, not the checkpoint at 12.

Each station carries fractional work credit. Add the sum of active workers' individual effective rates for the minute; complete floor(credit) items, limited by available inventory; subtract completed units from credit. If the queue empties, retain less than one item of credit, never accumulate unlimited credit while empty. An area with no starting stock performs no productive work and drains no energy. The last fractional minute uses the full listed energy cost for the minute in this coarse ledger; final real-time simulation will prorate actual productive time.

Update worker energy after computing this interval's output. Workers below 40 start the next interval at 75% rate. No sampled run falls below 20, so automatic rest is not exercised by these results. Repair starts only when both technicians have arrived and failure has occurred; four full qualified intervals restore the machine at the next boundary. Waiting for failure does not drain repair energy.

Orders: base quantities 16/16/16 due at 14/30/45; rush 0/6/12 due at 42. Priorities in the main comparisons: first base, second base, rush, final base. In these runs, the first 32 deliveries complete well after rush arrival, so no pre-arrival rush allocation occurs. In an implementation, unavailable orders must be excluded explicitly.

## Assignment schedule — complete, not just repair timing

IDs 0–5 start Gather, 6–11 Assemble, 12–17 Dispatch. IDs 6 and 7 are the only technicians. Numbers are bookkeeping; the UI will use crew tokens and badges.

| Time | Early repair | Bypass first | No action |
|---:|---|---|---|
| 0 | 6 Gather / 6 Assemble / 6 Dispatch | Same | Same |
| 6 | Move Gather IDs 0,1 to Assemble; arrive 7 | Same | Hold |
| 8 | Move technicians 6,7 to Repair; arrive 9 | Run manual assembly with IDs 6,7,0,1; four-worker cap | Hold; machine remains failed |
| 9–13 | Both techs repair during [9,13); machine returns at 13 | Manual work through [8,11) | Hold |
| 11 | Continue repair | Move technicians to Repair; arrive 12; repair during [12,16) | Hold |
| 12 | Accepted rush enters Gather | Same | Full rush enters Gather for comparison |
| 13 | Move technicians back to Assemble; arrive 14; six ordinary workers operate repaired machine meanwhile | Continue repair | Hold |
| 16 | Hold | Machine returns; move technicians back, arrive 17 | Hold |
| 18 | Move Dispatch IDs 12,13 to Gather; arrive 19 | Same | Hold |
| 33 | Return IDs 12,13 to Dispatch; arrive 34 | Same; half-rush Gather has already emptied, which makes a separate efficiency opportunity | Hold |
| 45 | Close | Close | Close |

Prepared-repair variant: same as early, except technicians move to Repair at 6, arrive 7 and wait; repair during [8,12), return to Assemble at 12 and arrive 13. Other transfers occur on the same schedule. Thus it pays a pre-failure capacity cost rather than receiving free preparation.

Rest variant: same as early/full rush; at t=33 send remaining Gather IDs 2–5 to Rest, arrive 34; at t=42 Assembly has completed all assembly work, so send its eight crew to Rest, arrive 43. Dispatch keeps completing the remaining finished gadgets. Rest restores four energy/minute up to 100. This demonstrates exploiting **completed work**, not evidence that early rest is always beneficial.

## Checkpoints

| Plan / rush | Delivered by 14 | By 30 | By 42 | By 45 | Rush on time | Base on time | Final mean / lowest energy |
|---|---:|---:|---:|---:|---:|---:|---|
| Early / 12 | 16 | 36 | 55 | 60 | 12 | 48 | 38.3 / 35 |
| Early + rest / 12 | 16 | 36 | 55 | 60 | 12 | 48 | 51.7 / 35 |
| Prepared repair / 12 | 16 | 37 | 55 | 60 | 12 | 48 | 37.8 / 34 |
| Bypass / 6 | 17 | 33 | 52 | 54 | 6 | 48 | 41.4 / 34 |
| Bypass / 12 | 17 | 33 | 52 | 57 | 12 | 45 | 37.7 / 30 |
| No action / 12 | 15 | 15 | 15 | 15 | 0 | 15 | 60.0 / 47 |

Full minute-by-minute data are in [paper-ledger-v0.2.csv](paper-ledger-v0.2.csv). Policy `early` = baseline early plan; `prepared` = preposition technicians; `bypass` appears with rush 6 and 12; `rest` = early/full plus end-of-task rest; `idle` = no intervention/full rush.

## Conservation and boundary checks

For every checkpoint: Gather queue + Assemble queue + Dispatch queue + total delivered = 48 before rush arrival, and 48 + accepted rush afterward. All checkpoints in the six traces satisfy this equality; none has negative inventory. Every transfer moves existing IDs, keeping crew total 18. None of the sampled runs reaches auto-rest threshold; that boundary remains for implementation verification, not a passed test.

No-action/full-rush final inventory is 45 waiting at Assemble plus 15 delivered = 60. Bypass/full final inventory is 3 waiting at Dispatch plus 57 delivered = 60. Early/full final inventory is zero plus 60 delivered. Technician sharing makes simultaneous productive repair and supervised manual operation unavailable with only two qualified crew.

## Priority sensitivity

Under early/full staffing, choosing first base → second base → final base → rush gives 55 departures by minute 42, with 48 assigned to base and only 7 to rush. Five rush items are late. Choosing first base → second base → rush → final base uses the same production to get all rush items out by 42, then the last five base items by 45. This is an allocation effect, not extra capacity. Default earliest-due priority helps a first-time player; a manual override remains available.

## What we can and cannot conclude

We have two materially different sampled policies that meet every accepted promise: early/full with rest, and bypass/half. Full rush requires stronger recovery in these traces. The shared technician constraint removes the most obvious free combined tactic. End-of-task rest improves crew condition without compromising production.

We have not proven strategy optimality, equal value of repair and bypass, robustness to all event variants, meaningful early-rest tradeoffs, fun, readability, or transfer of judgment outside the game. Early repair is the best known policy in the baseline; bypass provides just one extra early delivery. If that small benefit is not interesting in play, increase urgent demand or alter its deadline within the same scenario rather than adding scope.

The coarse worksheet defers each station's output until the next interval. A continuous model may finish earlier and make the full rush easier; repeat these schedules against the actual simulation and tune starting stock/rates/deadlines if needed. The worksheet is a feasibility screen and a reproducible comparison, not a specification that the player should watch minute-by-minute jumps.
