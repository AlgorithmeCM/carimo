#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const inputPath = process.argv[2] || new URL('./sample-request.json', import.meta.url).pathname;
const request = JSON.parse(await readFile(inputPath, 'utf8'));

function offlineTriage(request) {
  const text = `${request.subject ?? ''} ${request.message ?? ''}`.toLowerCase();
  const riskFlags = [];
  let category = 'GENERAL_OPERATIONS';
  let owner = 'Operations';
  let priority = 'P3';

  if (/payment|invoice|refund|charge|billing/.test(text)) {
    category = 'FINANCE';
    owner = 'Finance';
  }
  if (/security|breach|password|unauthorized|fraud/.test(text)) {
    category = 'SECURITY';
    owner = 'IT / Security';
    priority = 'P1';
    riskFlags.push('Potential security or fraud issue.');
  }
  if (/outage|down|cannot access|not working|critical/.test(text)) {
    category = 'INCIDENT';
    owner = 'IT / Operations';
    priority = 'P1';
    riskFlags.push('Potential service interruption.');
  }
  if (/delivery|shipment|late|missing parcel|cargo/.test(text)) {
    category = 'LOGISTICS';
    owner = 'Logistics';
    if (priority !== 'P1') priority = 'P2';
  }
  if (/complaint|angry|unacceptable|cancel/.test(text)) {
    riskFlags.push('Customer dissatisfaction / churn risk.');
    if (priority === 'P3') priority = 'P2';
  }
  if (request.customerTier === 'VIP' && priority === 'P3') priority = 'P2';

  const recommendedActions = priority === 'P1'
    ? ['Acknowledge immediately.', 'Assign an owner now.', 'Collect missing incident facts.', 'Escalate until service/risk is contained.']
    : ['Acknowledge the request.', `Route to ${owner}.`, 'Confirm required facts and expected resolution time.', 'Log the outcome.'];

  return {
    mode: 'offline-demo',
    category,
    priority,
    owner,
    riskFlags,
    recommendedActions,
    replyDraft: `Hello ${request.from || 'there'}, thank you for contacting us. Your request has been reviewed and routed to the appropriate team. We are checking the details now and will keep you updated on the next action and expected resolution.`
  };
}

function extractText(response) {
  if (typeof response.output_text === 'string' && response.output_text.trim()) return response.output_text;
  const chunks = [];
  for (const item of response.output || []) {
    for (const part of item.content || []) {
      if (typeof part.text === 'string') chunks.push(part.text);
    }
  }
  return chunks.join('\n').trim();
}

function parseJsonFromText(text) {
  try { return JSON.parse(text); } catch {}
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(text.slice(start, end + 1));
  throw new Error('Model did not return valid JSON.');
}

async function aiTriage(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) return offlineTriage(request);

  const prompt = `You are an AI operations triage assistant.\n\nClassify the incoming business request using only the supplied information. Never invent customer facts. Prioritize safety, fraud, outages, deadlines and customer impact.\n\nReturn JSON only using this schema:\n{\n  "category": "short uppercase category",\n  "priority": "P1" | "P2" | "P3" | "P4",\n  "owner": "recommended team",\n  "riskFlags": ["specific risks supported by the message"],\n  "recommendedActions": ["ordered concrete actions"],\n  "replyDraft": "short professional acknowledgement"\n}\n\nRequest:\n${JSON.stringify(request, null, 2)}`;

  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, input: prompt })
  });
  if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { mode: 'llm', ...parseJsonFromText(extractText(data)) };
}

const result = await aiTriage(request);
console.log(JSON.stringify(result, null, 2));
