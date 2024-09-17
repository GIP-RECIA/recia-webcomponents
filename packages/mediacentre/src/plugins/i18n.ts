import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { findLanguage } from '@/utils/i18nUtils';
import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  locale: findLanguage('fr'),
  fallbackLocale: 'fr',
  messages: {
    en,
    fr,
  },
});
