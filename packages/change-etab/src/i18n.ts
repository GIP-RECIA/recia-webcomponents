import en from './locales/en.json';
import fr from './locales/fr.json';
import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  allowComposition: true,
  locale: window.navigator.language,
  fallbackLocale: 'en',
  messages: {
    en,
    'en-US': en,
    fr,
    'fr-FR': fr,
  },
});
