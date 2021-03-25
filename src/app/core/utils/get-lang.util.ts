import { environment } from '@environments/environment';

export function getLangFromParams(): string {
  let currentLang = localStorage.getItem('__lang') || environment.defaultLang;

  const url = new URL(location.href);
  const lang = url.searchParams.get('lang');

  if (lang) {
    currentLang = lang;
  }
  if (currentLang === 'uz') {
    currentLang = 'uz-latn';
  }
  localStorage.setItem('__lang', currentLang);

  return currentLang;
}
