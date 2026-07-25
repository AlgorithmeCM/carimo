# CARIMO SkinMatch AI

A luxury multilingual beauty consultation concept designed to help CARIMO EMPIRE transform a large product catalogue into personalized, explainable and shoppable rituals.

## Experience direction

The interface is conceived as a **private beauty suite**, not a technical questionnaire. Its design language combines warm ivory, restrained metallic gold, deep CARIMO rose, editorial spacing, soft depth and calm interactions so that luxury, wellbeing and privileged service are felt throughout the journey.

## Included

- English, French and Arabic
- Automatic browser-language routing through `next-intl`
- Complete RTL layout for Arabic
- Photo upload/camera path plus a full no-photo path
- Explicit consent and cosmetic-only language
- Adaptive seven-question beauty questionnaire
- Deterministic demo analysis endpoint
- Explainable recommendation engine
- Essential, Complete and CARIMO Ritual tiers
- Direct links to current CARIMO EMPIRE product pages
- Mobile-first responsive interface
- Premium product presentation and interaction system
- Reduced-motion accessibility support
- PWA manifest starter

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The middleware routes the browser to `/en`, `/fr` or `/ar`.

## Production integration points

1. Replace the deterministic analysis endpoint with an approved multimodal provider.
2. Add real local image-quality checks before upload.
3. Replace `lib/products.ts` with a WooCommerce/API catalogue adapter.
4. Obtain approved English and Arabic product names and descriptions from CARIMO.
5. Add analytics, consent logs and an approved retention policy.
6. Connect cart operations through the shop API instead of simple outbound links.
7. Complete usability testing in English, French and Arabic on representative mobile devices.

## Important

This concept provides cosmetic beauty guidance. It must not diagnose diseases, identify ethnicity, prescribe treatment or retain face images without an appropriate legal basis and explicit consent.
