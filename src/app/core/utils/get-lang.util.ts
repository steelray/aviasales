import { APP_LANGS } from '@core/const/app-langs.const';
import { environment } from '@environments/environment';

export function getLangFromParams(): string {
  let currentLang = localStorage.getItem('__lang') || environment.defaultLang;

  const url = new URL(location.href);
  const lang = url.searchParams.get('lang');

  if (lang) {
    currentLang = lang;
  }
  if (currentLang === 'uz') {
    currentLang = APP_LANGS.uz;
  }

  if (!Object.values(APP_LANGS).includes(currentLang)) {
    currentLang = APP_LANGS.ru; // by default
  }

  localStorage.setItem('__lang', currentLang);

  return currentLang;
}
