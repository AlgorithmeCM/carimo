# AI Automation Portfolio Demos

Two small, executable demonstrations of practical AI integration for business workflows.

## 1. AI Lead Qualification Workflow

Turns an inbound B2B lead into a qualification score, HOT/WARM/COLD tier, evidence-based signals, next action and suggested reply.

**Demonstrates:** prompt engineering, sales automation, structured outputs, API integration and CRM-ready workflow thinking.

Run:

```bash
node ai-lead-qualification/index.mjs ai-lead-qualification/sample-lead.json
```

## 2. AI Operations Assistant

Turns an unstructured business request into category, priority, owner, risk flags, recommended actions and an acknowledgement draft.

**Demonstrates:** AI triage, operations automation, risk-aware routing, structured outputs and human-in-the-loop design.

Run:

```bash
node ai-operations-assistant/index.mjs ai-operations-assistant/sample-request.json
```

## Two operating modes

Both demos run in **offline demo mode** with no credentials. If `OPENAI_API_KEY` and `OPENAI_MODEL` are supplied, they call the OpenAI Responses API and use the LLM prompts included in the source code.

```bash
export OPENAI_API_KEY="your-key"
export OPENAI_MODEL="your-model-id"
```

Credentials are never stored in the repository.

## Portfolio philosophy

These examples are intentionally small enough to review in minutes. The emphasis is on turning AI into a dependable business workflow: clear inputs, constrained reasoning, structured output, operational next actions, security boundaries and easy integration with tools such as n8n, CRM systems, email and messaging platforms.
