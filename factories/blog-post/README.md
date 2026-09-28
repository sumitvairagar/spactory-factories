# Blog Post Factory

Turns a topic and key points into a full SEO-ready blog post — outlined, gate-reviewed, and ready to publish.

## What it produces

A complete Markdown blog post with:
- YAML front matter containing the meta description (for SEO tooling)
- `#` H1 title
- Intro, body sections as `##` headings, conclusion, and CTA
- 1,000–2,000 words, written for a professional audience

## Input format

A topic plus 3-5 key points. Can be a sentence or a paragraph.

```
Topic: Why spec-driven development saves money.
Key points: catches bad requirements early, reduces rework, forces alignment before coding,
gives developers a clear target, makes scope changes explicit and expensive.
```

Or more informally:

```
Write about the hidden costs of skipping the spec phase in software projects.
Main angles: rework is 10x more expensive late, stakeholders don't know what they want until they see it,
a spec review catches misaligned assumptions before a line of code is written.
```

## Stages and gates

### Stage 1 — Outline (gate: human)
The model generates a structured post outline:
- **SEO Title** — 50-60 character title optimised for search
- **Meta Description** — 120-150 character summary for Google search results
- **Sections** — 4-6 H2 headings with one-line summaries of each section's purpose
- **Notes for Writer** — specific data points and angles to include

**Gate:** You review the outline before the full post is written. This is the important gate — change the story arc, reorder sections, or reject and start over if the angle is wrong. Editing here saves you from editing 1,500 words later.

### Stage 2 — Post (no gate)
Using the approved outline, the model writes the full blog post. Runs automatically and produces the final output.

## Example command

```bash
OPENAI_API_KEY=sk-... node packages/spactory-cli/dist/index.js run \
  ./factories/blog-post/factory.ts \
  "Topic: Why spec-driven development saves money. Key points: catches bad requirements early, reduces rework, forces alignment before coding." \
  > post.md
```

Your browser opens at `http://localhost:4000`. Approve one gate (the outline). The final Markdown post prints to stdout (redirected to `post.md`).

## Output example

```markdown
---
description: Skipping the spec phase costs teams 10x more in rework. Here's why investing an hour in spec review pays back in weeks.
---

# Why Spec-Driven Development Saves Money (And Your Sanity)

Most software projects that run over budget don't fail because of bad code.
They fail because the team built the wrong thing. Spec-driven development exists
to catch that mismatch before a line of code is written.

Here's what it costs when you skip the spec — and how a single review session pays for itself.

## The 10x Cost of Late Rework

Catching a requirement error in a spec review takes 30 minutes...
```

## Tips

- The more specific your key points, the sharper the outline. Vague inputs like "write about AI" produce generic posts.
- At the outline gate, check the section headings — they should be specific and interesting, not generic chapter titles.
- The meta description in the YAML front matter can be used directly in your CMS (Ghost, WordPress, Webflow all support it).
- If you're writing a series, mention the series angle in your input ("Part 2 of our spec-driven development series") and the model will frame the post accordingly.
