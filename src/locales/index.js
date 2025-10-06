import { en } from './en.js';
import { tr } from './tr.js';

const translations = { en, tr };
let currentLanguage = 'en';

export function getCurrentLanguage() {
  return currentLanguage;
}

export function setCurrentLanguage(lang) {
  currentLanguage = lang;
  window.dispatchEvent(new CustomEvent('language-changed', {
    detail: { lang }
  }));
}

export function t(key) {
  const keys = key.split('.');
  let value = translations[currentLanguage];

  for (const k of keys) {
    value = value[k];
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value;
}
