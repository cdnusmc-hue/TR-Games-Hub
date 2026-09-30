# One More Shift — Festival Finish prototype brief

Current design: **v0.2**, implemented as playable prototype **v0.3.0**. See [play instructions](../README.md) and [implementation evidence](implementation-v0.3.md).

Read [scope, scenario and interaction map](design-v0.2.md) for authoritative rules and [balance worksheet](balance-v0.2.md) for the numerical comparisons. The original lead-game section in the portfolio v0.1 package is historical.

## Bounded first build

- One fixed top-down miniature workshop and one six-minute normal-speed shift, with unlimited pause and slower pace.
- Eighteen crew; two technicians; three linked production areas plus manual assembly, repair and rest destinations.
- Forty-eight base gadgets in three orders; optional rush of 0, 6 or 12.
- Machine warning at shift minute 6, failure at 8, rush offer at 10, arrival at 12.
- Base deadlines 14/30/45; rush due at 42; shift ends at 45.
- Shared technician requirement: repair needs both; manual assembly needs at least one.
- Group-first reassignment, explicit order priority, visible queues, travel, energy, results, action timeline and rematch.
- Separate delivery and crew-condition feedback; no combined score.

## Evidence so far

Coarse one-minute worksheet calculations support early repair/full rush and bypass-first/half rush as distinct successful plans. The same tested bypass plan with full rush leaves three base items unfinished. Resting crew after their area's work completes improves final energy without reducing deliveries. Those results require verification using the actual implementation's time steps.

## Excluded

No hiring/payroll, construction, complex products, character skill trees, campaign, multiplayer, AI, accounts, monetization or native app packaging.

## Next gate

Implementation and automated verification are complete. The next gate is human playtesting: determine whether decisions, feedback and replay are entertaining.
