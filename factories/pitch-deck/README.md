# Pitch Deck Factory

Turns a one-paragraph startup description into a full investor pitch deck in Markdown — structured, gate-reviewed, and ready to paste into any slide tool.

## What it produces

A Markdown file with 10-12 slides, each as a `##` heading with 3-5 bullet points. The output can be pasted directly into Google Slides, Notion, PowerPoint, or any Markdown-aware tool.

## Input format

One paragraph describing your startup or product. Include as much context as you have:

```
A B2B SaaS that helps restaurants reduce food waste using AI demand forecasting.
We have 3 pilot customers and are raising a $1.5M pre-seed to hire two engineers.
```

Vague input produces a vague brief — the gate lets you review and reject it before the model wastes tokens on downstream stages.

## Stages and gates

### Stage 1 — Brief (gate: human)
The model generates a structured pitch brief covering:
- Problem and market pain
- Solution and product description
- Target market with sizing
- Business model and revenue streams
- Traction or pre-launch progress
- Funding ask

**Gate:** You review the brief before the model proceeds. Approve to continue, reject to abort, or edit the brief to correct facts before the next stage.

### Stage 2 — Narrative (gate: human)
Using the approved brief, the model generates a slide-by-slide narrative — one sentence per slide, 10-12 slides total.

**Gate:** You review the narrative to confirm the story arc before the model writes the full slide content.

### Stage 3 — Slides (no gate)
Using the approved narrative, the model writes full slide content: every slide as a `##` heading with 3-5 bullets. Runs automatically and produces the final output.

## Example command

```bash
OPENAI_API_KEY=sk-... node packages/spactory-cli/dist/index.js run \
  ./factories/pitch-deck/factory.ts \
  "A B2B SaaS that helps restaurants reduce food waste using AI demand forecasting." \
  > deck.md
```

Your browser opens at `http://localhost:4000`. Approve two gates. The final Markdown prints to stdout (redirected to `deck.md`).

## Output example

```markdown
## Problem
- Restaurants waste 4-10% of food purchased — $162B annually in the US alone
- Over-ordering driven by inaccurate demand forecasting, not poor intent
- Existing solutions require manual data entry and are too expensive for SMB restaurants

## Solution
- AI demand forecasting integrated with POS systems — no manual input required
- Predicts optimal order quantities 48 hours in advance, per-ingredient
- Mobile dashboard for owners; automatic purchase order generation for suppliers
```

## Tips

- The more specific your input, the better the brief. Include real numbers (revenue, users, market size) if you have them.
- At the brief gate, check the "ask" section — the model may invent a funding amount if you didn't specify one.
- At the narrative gate, reorder slides if the story arc doesn't flow — edit the numbered list directly before approving.
