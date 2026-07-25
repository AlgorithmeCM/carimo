# CARIMO SkinMatch AI v1.1 fixes

## Fixed

- Replaced the deprecated `locale` callback parameter in `getRequestConfig` with `await requestLocale`.
- Added a safe default-locale fallback for requests that are intentionally outside the locale middleware.
- Centralized locale configuration in `i18n/routing.ts` and reused it in the middleware and request configuration.
- Added `setRequestLocale(locale)` before `getMessages()` so `next-intl` no longer needs to read `X-NEXT-INTL-LOCALE` through `headers()`.
- Validated the async Next.js 15 `params` value before using the locale.
- Added `generateStaticParams()` for `en`, `fr` and `ar`.
- Moved the analysis route from `app/[locale]/api/analyze/route.ts` to `app/api/analyze/route.ts`.
- Updated the client request from `/{locale}/api/analyze` to `/api/analyze`.
- Excluded `/api`, static assets and internal Next.js routes from the locale middleware.
- Added `/favicon.ico`, 192px and 512px PWA icons.
- Added manifest metadata to the locale layout.

## Verification

- All TypeScript and TSX source files passed syntax transpilation checks.
- English, French and Arabic message files are valid JSON.
- The PWA manifest is valid JSON.
- No deprecated `getRequestConfig(async ({locale}) => ...)` or direct synchronous `headers()` access remains in the source.

A full dependency install/build could not be executed in the isolated environment because its npm package gateway returned HTTP 503 responses.
