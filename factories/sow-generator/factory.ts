import { factory, stripMarkdownFences } from 'spactory-core/factory-only'

export default factory('sow-generator', async (ctx) => {
  const scope = await ctx.stage('scope', {
    prompt: buildScopePrompt(ctx.input),
    gate: 'human',
  })

  const rawSow = await ctx.stage('sow', {
    prompt: buildSowPrompt(scope),
    gate: 'human',
  })

  return stripMarkdownFences(rawSow, 'markdown')
})

export function buildScopePrompt(input: string): string {
  return `You are a senior project manager helping a freelancer or agency scope a client project before writing a Statement of Work.

The client has described the project as follows:

"${input}"

Analyse this description and produce a structured project scope breakdown in Markdown. Be professional, specific, and use plain language — no buzzwords.

Include these sections with ## headings:

## Deliverables
List every concrete output the client will receive. Be specific: name features, screens, integrations, documents. Use a bullet list. If the description is vague, make reasonable assumptions and note them.

## Out of Scope
List what is explicitly NOT included. Protect against scope creep by naming the common additions clients ask for later. Use a bullet list.

## Assumptions
List the conditions this scope depends on. For example: client provides copy and assets, design decisions are made within 3 business days, third-party APIs are available and documented. Use a bullet list.

## Risks
Identify 3-5 risks that could affect timeline, cost, or quality. For each risk, name the risk and one mitigation. Use a bullet list.

## Open Questions
List any questions that must be answered before the project can start. If the input was clear, this section can be brief or empty.

Output only the Markdown. No preamble, no summary, no closing remarks.`
}

export function buildSowPrompt(scope: string): string {
  return `You are a professional consultant writing a Statement of Work for a client engagement.

Here is the approved project scope breakdown:

${scope}

Write a complete, professional Statement of Work document in Markdown. The document should read as a real legal/commercial document ready to send to a client — not a template with placeholders. Use specific, professional language throughout.

Include these sections with ## headings:

## Overview
One to two paragraphs describing the engagement: what will be built, who the parties are (use "the Client" and "the Contractor"), and the purpose of this document.

## Scope of Work
A detailed description of the work to be performed. Reference the deliverables from the scope breakdown. Write in clear prose, not bullet points.

## Deliverables
A numbered list of every deliverable, with a one-sentence description of each. These should match the scope breakdown exactly.

## Timeline
A phased timeline with milestone names and estimated completion dates (use relative dates like "Week 2", "Week 6", "Week 12" if no start date is given). Include a final delivery date.

## Payment Terms
Payment schedule tied to milestones. Specify: total engagement value (use the budget from the scope if provided, otherwise use a reasonable placeholder), payment amounts per milestone, due dates, and accepted payment methods.

## Terms & Conditions
Standard SOW terms covering:
- Change request process (scope changes require written approval and may affect timeline/cost)
- Intellectual property (all work product transfers to Client upon final payment)
- Confidentiality (both parties agree to keep project details confidential)
- Termination clause (either party may terminate with 14 days written notice; Client pays for work completed to date)
- Limitation of liability (Contractor's liability limited to fees paid in the prior 30 days)

Respond with only the Markdown. No explanation, no preamble.`
}
