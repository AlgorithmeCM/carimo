#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const inputPath = process.argv[2] || new URL('./sample-lead.json', import.meta.url).pathname;
const lead = JSON.parse(await readFile(inputPath, 'utf8'));

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function offlineQualification(lead) {
  let score = 15;
  const signals = [];

  if (lead.decisionMaker === true) {
    score += 22;
    signals.push('Decision-maker is directly involved.');
  }
  if ((lead.budgetAed ?? 0) >= 15000) {
    score += 22;
    signals.push('Budget is above the high-intent threshold.');
  } else if ((lead.budgetAed ?? 0) >= 5000) {
    score += 12;
    signals.push('Budget is commercially actionable.');
  }
  if ((lead.timelineDays ?? 999) <= 30) {
    score += 18;
    signals.push('Timeline indicates near-term buying intent.');
  } else if ((lead.timelineDays ?? 999) <= 90) {
    score += 10;
    signals.push('Timeline is within a normal sales cycle.');
  }

  const text = `${lead.need ?? ''} ${lead.notes ?? ''}`.toLowerCase();
  if (/autom|ai|crm|whatsapp|lead|sales|integration|workflow/.test(text)) {
    score += 14;
    signals.push('Need strongly matches AI/automation services.');
  }
  if (/urgent|asap|this week|immediately/.test(text)) {
    score += 7;
    signals.push('Urgency language detected.');
  }

  score = clamp(score, 0, 100);
  const tier = score >= 75 ? 'HOT' : score >= 50 ? 'WARM' : 'COLD';
  const nextAction = tier === 'HOT'
    ? 'Book a 20-minute discovery call within 24 hours.'
    : tier === 'WARM'
      ? 'Send a short discovery questionnaire and follow up within 2 business days.'
      : 'Add to nurture sequence and request budget/timeline clarity.';

  return {
    mode: 'offline-demo',
    score,
    tier,
    summary: `${lead.company || 'Lead'} is a ${tier.toLowerCase()} opportunity based on budget, authority, urgency and problem fit.`,
    signals,
    nextAction,
    suggestedReply: `Hi ${lead.contactName || 'there'}, thanks for sharing your requirements. I can see a clear opportunity to simplify this workflow with AI and automation. I would suggest a short discovery call to map the current process, identify the highest-value automation and define a practical first implementation.`
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

async function aiQualification(lead) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) return offlineQualification(lead);

  const prompt = `You are a B2B AI automation sales qualification assistant.\n\nEvaluate the lead using only the supplied data. Do not invent facts. Consider budget, decision authority, urgency, business impact, implementation fit and clarity of need.\n\nReturn JSON only with this schema:\n{\n  "score": 0-100,\n  "tier": "HOT" | "WARM" | "COLD",\n  "summary": "one sentence",\n  "signals": ["short evidence-based signals"],\n  "nextAction": "specific next sales action",\n  "suggestedReply": "concise professional reply to the lead"\n}\n\nLead data:\n${JSON.stringify(lead, null, 2)}`;

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

const result = await aiQualification(lead);
console.log(JSON.stringify(result, null, 2));
