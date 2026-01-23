import {ReactNode} from 'react';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale, getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, type Locale} from '../../../next-intl.config';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
    locale={locale}
    messages={messages}
    key={locale}
  >
      {children}
    </NextIntlClientProvider>
  );
}
