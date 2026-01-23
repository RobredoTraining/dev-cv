'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {locales, type Locale} from '../../next-intl.config';

function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : 'en';
}

function stripLocale(pathname: string) {
  for (const l of locales) {
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = getLocaleFromPathname(pathname);
  const basePath = stripLocale(pathname);

  const go = (locale: Locale) => {
    if (locale === current) return;

    const query = searchParams.toString();
    const url =
      `/${locale}` +
      (basePath === '/' ? '' : basePath) +
      (query ? `?${query}` : '');

    router.replace(url);
  };

  const btnBase =
    'inline-flex items-center justify-center rounded-md border px-2 py-1 text-lg leading-none transition hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="inline-flex gap-2">
      <button
        type="button"
        onClick={() => go('en')}
        className={btnBase}
        disabled={current === 'en'}
        aria-label="Switch to English"
        title="English"
      >
        🇬🇧
      </button>

      <button
        type="button"
        onClick={() => go('es')}
        className={btnBase}
        disabled={current === 'es'}
        aria-label="Cambiar a español"
        title="Español"
      >
        🇪🇸
      </button>
    </div>
  );
}
