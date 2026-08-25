# AI Lead Qualification Workflow

A small, executable portfolio demo showing how AI can turn an inbound lead into a structured sales decision.

## Business problem

Sales teams often receive leads from forms, WhatsApp, email and social channels, then manually decide who deserves immediate attention. That creates slow response times and inconsistent qualification.

This demo turns a lead record into:

- a 0-100 qualification score
- HOT / WARM / COLD tier
- evidence-based qualification signals
- recommended next action
- a concise suggested reply

## Why it is portfolio-relevant

It demonstrates the full automation mindset rather than only a prompt:

`lead data -> validation -> scoring/LLM reasoning -> structured JSON -> next action`

The output can be connected to n8n, Make, a CRM, a spreadsheet, email or a WhatsApp integration.

## Run it

Requires Node.js 18+.

```bash
node index.mjs sample-lead.json
```

No API key is required for the deterministic demo mode.

### Enable LLM mode

Set both environment variables:

```bash
export OPENAI_API_KEY="your-key"
export OPENAI_MODEL="your-model-id"
node index.mjs sample-lead.json
```

The API key is never stored in the repository.

## Design choices

- **Zero dependencies:** easy for a recruiter to run.
- **Graceful fallback:** useful demonstration even without credentials.
- **Evidence-based prompt:** the LLM is instructed not to invent missing lead facts.
- **Structured output:** makes downstream automation straightforward.
- **Provider boundary:** the model id is environment-configured rather than hard-coded.

## Example integration

A practical production workflow could be:

1. Website / Meta Lead Ads / WhatsApp receives enquiry.
2. n8n normalizes the lead data.
3. This qualification layer evaluates the opportunity.
4. HOT leads are pushed to CRM and sales notification immediately.
5. WARM leads receive discovery questions.
6. COLD leads enter a nurture sequence.
7. All decisions are logged for later review and prompt/scoring improvement.

## Skills demonstrated

Prompt engineering, AI integration, workflow design, Node.js, API integration, structured outputs, sales automation and business-process thinking.
