# Frozen card content — v0.1

Exact labels and costs from the playable rules. Negative cash spends; positive cash earns. Block counts are costs; energy is a signed change. Availability additionally depends on cash, time, energy, debt, prior decisions and the weekly shift cap.

## Day 3 — The group chat has plans

Jo has found a tiny café with enormous slices of cake. The invitation is real. So are the bills before payday.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Meet Jo for cake | -25 | 1 | 0 | Record a shared moment. |
| Send a warm rain check | 0 | 0 | 0 | No cost. Preserve cash and time. |

## Day 5 — Your bike has developed a percussion section

Something rattles when you pedal. A mechanic can inspect it, repair it without an inspection, or let you take your chances.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Buy an inspection | -30 | 0 | 0 | Reveal the condition: minor repair $20 or major repair $60 afterward. Inspection does not fix the bike. |
| Repair without inspection | -80 | 0 | 0 | Pay $80 to fix either condition. |
| Wait and watch | 0 | 0 | 0 | Day 14 repair will cost $40 if minor or $120 if major. Unrepaired then, the bike blocks extra shifts. |

## Day 8 — Payday. And a suspiciously perfect sale.

The paycheck landed. A lamp you love is on sale for $80. Tomorrow’s rent is still $300.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Bring the lamp home | -80 | 0 | 0 | A purchase you enjoy; no hidden financial bonus. |
| Enjoy the window shopping | 0 | 0 | 0 | Keep the cash. |

## Day 10 — A favor, with room to say no

Jo asks whether you can help on day 26. A promise costs nothing today, but it needs one free-time block in week 4.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Promise to help on day 26 | 0 | 0 | 0 | Reserve one week-4 block in your plan. You can revise later; Jo will notice. |
| Say you cannot promise yet | 0 | 0 | 0 | No penalty or hidden fee. You may still help later. |

## Day 12 — The neighborhood needs a pair of hands

There is a community garden to tidy. It will not pay your bills. You might enjoy being part of it.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Join the garden crew | 0 | 1 | 0 | One block for a neighborhood moment. |
| Keep the time open | 0 | 0 | 0 | No cost. |

## Day 14 — The bike follows up

The choice you made earlier has caught up with the calendar. This is a consequence, not a random new problem.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Repair the bike now | -120 | 0 | 0 | Condition is major. The earlier disclosed cost is now known. |
| Leave repair pending | 0 | 0 | 0 | Extra shifts stay unavailable until you repair. Base pay still arrives. |

## Day 17 — An extra shift, if you want it

A short-notice shift pays $90 today instead of the usual $70. Same time and energy cost. One extra shift per week still applies.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Take the $90 shift | 90 | 1 | -15 | One block, 15 energy, counts as this week’s extra shift. |
| Take the evening off | 0 | 1 | 20 | Recover 20 energy, up to 100. |
| Keep the time open | 0 | 0 | 0 | No cost. |

## Day 19 — Secondhand. First-rate temptation.

A neighbor is selling a lovely little speaker for $45. It is an opportunity, not a requirement.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Buy the little speaker | -45 | 0 | 0 | An enjoyable object, not an investment. |
| Let someone else have it | 0 | 0 | 0 | Keep the cash. |

## Day 22 — Paid again. Still your choices.

Your second paycheck arrived before this week’s food plan. Now you can see every remaining bill in the month.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Take a look ahead | 0 | 0 | 0 | Check your calendar, then move on. Payday has already settled. |

## Day 24 — Make room for your moment

The gathering or creative course can be booked now. Booking spends the money and time; the moment happens at month’s end.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Host the little gathering | -100 | 1 | 0 | One chosen milestone. No income reward or universal score. |
| Decide at the end of the month | 0 | 0 | 0 | Goal stays available on day 28; you will still need its cash and one block. |

## Day 26 — A friend needs a hand

Jo needs help carrying a ridiculously large fern. You can help, offer $20 toward delivery, or keep your boundary.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Help with the giant fern | 0 | 1 | 0 | Choose to help without an earlier promise. |
| Offer $20 for delivery | -20 | 0 | 0 | A different kind of help; an earlier time promise is revised. |
| Explain that you cannot help | 0 | 0 | 0 | No cash penalty. An earlier promise, if any, is revised. |

## Day 28 — A month that looks like you

You cannot do everything. You did choose what to make room for. There is one last chance to follow through on your goal.

| Choice | Cash | Blocks | Energy | Effect / condition |
|---|---:|---:|---:|---|
| Host the little gathering | -100 | 1 | 0 | One chosen milestone. No income reward or universal score. |
| Leave the goal for another month | 0 | 0 | 0 | Finish with your actual choices; no forced game over. |

## Conditional branches

Day 5 after inspection: repair $20 minor / $60 major, or wait for day 14. Once repaired, acknowledge the quiet ride. Day 14: already repaired means acknowledge with no cost; otherwise pay $40 minor / $120 major or keep repair pending. Day 24/28: gathering costs $100 and one block; course $160 and one block. Already completed goals receive a no-cost acknowledgment/finish option.

## Weekly and free-time choices

| Choice | Cash | Blocks | Energy |
|---|---:|---:|---:|
| Cook | -35 | 1 | 0 |
| Convenience food | -70 | 0 | 0 |
| Community food | 0 | 1 | -10 |
| Extra shift | +70 | 1 | -15 |
| Rest | 0 | 1 | +20 capped at 100 |
| Friend time | -25 | 1 | 0 |

Day 17 offers a $90 shift with the same one-per-week limit. Cash-free event acknowledgments keep consequences readable; they are candidates for removal if playtesting finds them repetitive.
