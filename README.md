# CARIMO SkinMatch AI

**AI-assisted, multilingual beauty recommendation concept built with Next.js, TypeScript and explainable decision logic.**

CARIMO SkinMatch AI explores how a large beauty catalogue can be transformed into personalized, understandable and shoppable routines without presenting cosmetic guidance as medical diagnosis.

## Why this project matters

This repository demonstrates a practical approach to AI-enabled product design: start from a real business problem, structure user inputs, produce explainable recommendations, support multiple languages and design clear integration points for production AI services.

### What it demonstrates

- AI product thinking and prompt-ready workflow design
- Explainable recommendation logic
- Multilingual UX: English, French and Arabic
- Full RTL support for Arabic
- Structured data collection and validation
- Consent-aware photo/camera journey plus a complete no-photo path
- Mobile-first responsive product design
- API-oriented architecture with clear production integration points
- Business-oriented recommendation tiers and commerce links

## Core experience

- Automatic browser-language routing with `next-intl`
- Adaptive seven-question beauty questionnaire
- Photo upload/camera path and no-photo alternative
- Explicit consent and cosmetic-only language
- Deterministic demo analysis endpoint
- Explainable recommendation engine
- Essential, Complete and CARIMO Ritual recommendation tiers
- Direct links to CARIMO EMPIRE product pages
- PWA manifest starter

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- `next-intl`
- React Hook Form
- Zod
- Framer Motion

## Architecture direction

The current version intentionally uses deterministic demo analysis so the UX, recommendation logic and safety boundaries can be evaluated independently from any AI provider.

A production implementation can replace the demo analysis layer with an approved multimodal/LLM provider while preserving the validated product flow.

### Production integration points

1. Replace the demo analysis endpoint with an approved multimodal provider.
2. Add local image-quality checks before upload.
3. Connect the recommendation layer to a real WooCommerce/API catalogue.
4. Add approved localized product names and descriptions.
5. Add analytics, consent logs and an approved retention policy.
6. Connect cart operations through the commerce API.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The middleware routes the browser to `/en`, `/fr` or `/ar`.

## Engineering checks

```bash
npm run typecheck
npm run build
```

## Responsible-use boundary

This concept provides **cosmetic beauty guidance only**. It must not diagnose disease, identify ethnicity, prescribe treatment or retain face images without an appropriate legal basis and explicit consent.

## Portfolio context

This is a public technical showcase of practical **AI integration, product thinking, multilingual UX and digital transformation** work.

See [`PORTFOLIO.md`](PORTFOLIO.md) for the curated technical portfolio.
