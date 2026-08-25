# AI Operations Assistant

An executable portfolio demo for AI-assisted triage of incoming business requests.

## Business problem

Operations teams receive unstructured requests through email, chat and forms. Someone must read each message, determine urgency, identify the responsible team, spot risks, recommend next steps and reply.

This demo automatically produces:

- request category
- P1-P4 priority
- recommended owner/team
- risk flags
- ordered next actions
- an acknowledgement draft

## Run it

Requires Node.js 18+.

```bash
node index.mjs sample-request.json
```

Without credentials, it runs a transparent deterministic triage layer.

### Enable LLM mode

```bash
export OPENAI_API_KEY="your-key"
export OPENAI_MODEL="your-model-id"
node index.mjs sample-request.json
```

No API key or model credentials are committed to GitHub.

## Why this is more than a chatbot

The goal is not conversation for its own sake. The output is structured for **business action**.

A production version can send the resulting JSON to:

- n8n / Make workflow routing
- Jira / Linear / helpdesk tickets
- CRM activity records
- Slack / Teams alerts
- email response queues
- dashboards and SLA monitoring

## Example production flow

`email / form / chat -> normalized request -> AI triage -> risk/priority gate -> assigned team -> response -> audit log`

High-risk or P1 cases should always include human review and explicit escalation rules.

## Responsible automation principles

- Do not invent facts missing from the request.
- Use deterministic rules for critical safety/escalation boundaries where appropriate.
- Keep API credentials outside source control.
- Log classifications and human overrides for quality improvement.
- Allow human review before consequential actions.

## Skills demonstrated

Prompt engineering, AI integration, operations design, API integration, structured outputs, risk-aware automation and business-process optimization.
