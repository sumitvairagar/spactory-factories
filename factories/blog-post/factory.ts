import { factory, stripMarkdownFences } from 'spactory-core/factory-only'

export default factory('blog-post', async (ctx) => {
  const outline = await ctx.stage('outline', {
    prompt: buildOutlinePrompt(ctx.input),
    gate: 'human',
  })

  const rawPost = await ctx.stage('post', {
    prompt: buildPostPrompt(outline),
  })

  return stripMarkdownFences(rawPost, 'markdown')
})

export function buildOutlinePrompt(input: string): string {
  return `You are an SEO content strategist helping a writer plan a blog post before writing it.

The writer has given you this topic and key points:

"${input}"

Create a blog post outline in Markdown. Be specific and opinionated — not generic. The outline should tell a clear story that a reader will want to follow.

Include these sections with ## headings:

## SEO Title
One title, 50-60 characters, that includes the primary keyword. Make it click-worthy but not clickbait.

## Meta Description
One sentence, 120-150 characters maximum, summarising the post for search engines. Include the primary keyword. This will appear in Google search results.

## Sections
List 4-6 H2 sections in the order they should appear in the post. For each section, include:
- The H2 heading text (specific, not generic — "How spec reviews catch $50k mistakes early" not "Benefits of spec reviews")
- One sentence describing what this section covers and what the reader will learn

Format the sections as:
### [Section heading]
[One-line summary of what this section covers]

## Notes for Writer
Any specific data points, examples, or angles that should be included. List 3-5.

Output only the Markdown. No preamble, no explanation.`
}

export function buildPostPrompt(outline: string): string {
  return `You are a professional content writer. Write a complete blog post based on this approved outline.

Here is the approved outline:

${outline}

Write the full blog post in Markdown. Follow the outline exactly — use the same H2 headings, cover each section's stated purpose, and include the notes for writer.

Structure:
1. Introduction (2-3 paragraphs, no heading) — hook the reader, state the problem, preview what they'll learn
2. Body sections — one H2 per section from the outline, 3-5 paragraphs each
3. Conclusion — 1-2 paragraphs summarising the key takeaways
4. Call to Action — one short paragraph prompting the reader to take a next step (try the tool, subscribe, comment, etc.)

Writing style:
- Write for a professional audience — clear, direct, no filler phrases
- Use concrete examples and specifics, not generalities
- Short paragraphs (3-4 sentences max)
- Occasional use of bullet lists is fine for enumerations
- No keyword stuffing — use the primary keyword naturally 3-4 times

Output only the Markdown. Include the meta description as YAML front matter at the very top of the document:

---
description: <meta description from the outline>
---

Then the title as # H1, then the body. No other preamble.`
}
