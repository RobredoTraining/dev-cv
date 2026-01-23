import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, defaultLocale, type Locale} from '../next-intl.config';

export default getRequestConfig(async ({locale, requestLocale}) => {
  const resolved =
    (locale as Locale | undefined) ??
    ((await requestLocale) as Locale | undefined) ??
    defaultLocale;

  if (!locales.includes(resolved)) notFound();

  return {
    locale: resolved,
    messages: (await import(`../src/languages/${resolved}.json`)).default
  };
});
