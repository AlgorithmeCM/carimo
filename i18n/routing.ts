import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

export type AppLocale = (typeof routing.locales)[number];

export function isSupportedLocale(locale: string | undefined): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}
