import { factory, stripMarkdownFences } from 'spactory-core/factory-only'

export default factory('pitch-deck', async (ctx) => {
  const brief = await ctx.stage('brief', {
    prompt: buildBriefPrompt(ctx.input),
    gate: 'human',
  })

  const narrative = await ctx.stage('narrative', {
    prompt: buildNarrativePrompt(brief),
    gate: 'human',
  })

  const rawSlides = await ctx.stage('slides', {
    prompt: buildSlidesPrompt(narrative),
  })

  return stripMarkdownFences(rawSlides, 'markdown')
})

export function buildBriefPrompt(input: string): string {
  return `You are a venture capital analyst helping a startup founder prepare for investor meetings.

The founder has given you the following description:

"${input}"

Write a structured pitch brief in Markdown. Be crisp, investor-ready, and specific. Avoid filler phrases like "innovative solution" or "cutting-edge technology". Every sentence should earn its place.

Include these sections with ## headings:

## Problem
What specific problem does this solve? Who feels this pain and how acutely? Quantify if possible.

## Solution
What does the product do? How does it solve the problem? One clear paragraph.

## Target Market
Who is the primary customer? Describe the segment precisely (industry, company size, role, geography, or demographic). What is the total addressable market?

## Business Model
How does the company make money? Pricing model, revenue streams, unit economics if known.

## Traction
What evidence exists that this works? Users, revenue, pilots, letters of intent, growth rate. If pre-launch, describe progress to date.

## The Ask
What is the company raising? How much, at what stage, and what will the capital be used for?

Output only the Markdown. No preamble, no summary, no closing remarks.`
}

export function buildNarrativePrompt(brief: string): string {
  return `You are a presentation designer helping a founder turn a pitch brief into a slide-by-slide narrative.

Here is the approved pitch brief:

${brief}

Create a slide narrative for a 10-12 slide investor pitch deck. Write exactly one sentence per slide — the single most important thing that slide must communicate. Each sentence should be punchy and self-contained.

Format as a numbered list, one slide per line. For example:
1. [Slide title]: [One sentence describing what this slide says]

Include these slides (you may adjust titles but keep the structure):
1. Title / Company tagline
2. Problem
3. Market size
4. Solution
5. How it works (product demo or key screenshot description)
6. Business model
7. Traction / social proof
8. Competitive landscape
9. Team
10. Financials / unit economics
11. The ask
12. (Optional) Vision / why now

Output only the numbered list. No preamble, no explanation.`
}

export function buildSlidesPrompt(narrative: string): string {
  return `You are a presentation writer. Expand a slide narrative into full slide content for an investor pitch deck.

Here is the approved slide narrative:

${narrative}

For each slide in the narrative, write the full content. Use this format:

## [Slide title]
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]
- [Optional bullet 4]
- [Optional bullet 5]

Rules:
- Every slide must have a ## heading matching the slide title from the narrative
- Every slide must have 3-5 bullet points
- Bullets must be specific and factual — no generic filler
- Keep bullets short enough to fit on a slide (one line each)
- Do not add speaker notes or presenter commentary
- Include all slides from the narrative, in order

Respond with only the Markdown. No explanation, no preamble, no closing remarks.`
}
