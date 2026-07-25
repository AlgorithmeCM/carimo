import '../globals.css';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {isSupportedLocale, routing} from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'CARIMO SkinMatch AI',
  description: 'A multilingual AI-assisted beauty routine recommender for CARIMO EMPIRE.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico'
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>;

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Supply the validated route locale directly. This prevents next-intl from
  // falling back to the middleware header and therefore avoids sync headers().
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
