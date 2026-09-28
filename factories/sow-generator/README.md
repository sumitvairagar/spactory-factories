# SOW Generator Factory

Turns a project description into a professional Statement of Work document — scoped, reviewed, and ready to send to a client.

## What it produces

A complete Markdown SOW document with all standard sections: Overview, Scope of Work, Deliverables, Timeline, Payment Terms, and Terms & Conditions. The output reads as a real professional document, not a fill-in-the-blanks template.

## Input format

A description of the project: what the client wants built, timeline, budget, and any known constraints.

```
Build a mobile app for a yoga studio to manage class bookings and payments.
The studio has 200 members. They need iOS and Android apps. 3-month timeline, $40k budget.
Integrate with their existing Mindbody account for scheduling data.
```

The more detail you provide, the more accurate the scope breakdown will be. Vague input produces a vague scope — the gate lets you review and reject it before the full SOW is written.

## Stages and gates

### Stage 1 — Scope (gate: human)
The model generates a structured project scope breakdown:
- **Deliverables** — concrete outputs the client will receive
- **Out of Scope** — what is explicitly excluded (protects against scope creep)
- **Assumptions** — conditions the project depends on
- **Risks** — top risks with mitigations
- **Open Questions** — blockers before work can start

**Gate:** You review the scope before the SOW is written. This is the most important gate — a wrong scope produces a wrong SOW. Edit the scope at this gate to correct any mistakes before continuing.

### Stage 2 — SOW (gate: human)
Using the approved scope, the model writes the full Statement of Work. All sections are populated with real content based on the scope breakdown.

**Gate:** You review the complete SOW before it is output. Make any final edits — adjust payment terms, timeline, or boilerplate to match your standard contract terms.

## Example command

```bash
OPENAI_API_KEY=sk-... node packages/spactory-cli/dist/index.js run \
  ./factories/sow-generator/factory.ts \
  "Build a mobile app for a yoga studio to manage class bookings and payments. 3-month timeline, 40k budget." \
  > sow.md
```

Your browser opens at `http://localhost:4000`. Approve two gates. The final Markdown SOW prints to stdout (redirected to `sow.md`).

## Output example

```markdown
## Overview

This Statement of Work ("SOW") governs the engagement between the Client (the yoga studio)
and the Contractor for the design and development of a mobile booking and payments application.
This document defines the scope, deliverables, timeline, and commercial terms for the engagement.

## Deliverables

1. **iOS application** — Native iOS app supporting class browsing, booking, and payment
2. **Android application** — Feature-equivalent Android app
3. **Mindbody integration** — Read-only sync of class schedule and instructor data
4. **Payment processing** — Stripe integration for class pack purchases and memberships
5. **Admin web dashboard** — Class management and booking overview for studio staff
```

## Tips

- At the scope gate, check the "Out of Scope" section carefully — add anything you want to explicitly exclude before the client signs.
- If the client provided a budget, it appears in Payment Terms. Edit the milestone amounts at the SOW gate to match your preferred payment schedule.
- The Terms & Conditions section uses reasonable defaults. Replace with your own standard terms if you have them.
- The generated SOW is a starting point — always have your own legal review before sending to clients on high-value engagements.
