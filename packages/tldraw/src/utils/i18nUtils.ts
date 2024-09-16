const locales: Array<string> = [
  'ar',
  'da',
  'de',
  'en',
  'es',
  'fa',
  'fr',
  'gl',
  'he',
  'it',
  'ja',
  'ko_kr',
  'ku',
  'my',
  'nb_no',
  'ne',
  'nn_no',
  'pl',
  'pt_br',
  'pt_pt',
  'ru',
  'sv',
  'te',
  'th',
  'tr',
  'uk',
  'zh_cn',
  'zh_tw',
];

const findLanguage = (fallbackLocale: string, availableLanguages: Array<string> = locales): string => {
  if (availableLanguages.includes(window.navigator.language)) return window.navigator.language;

  const matchLanguages = window.navigator.languages.filter((lang) =>
    availableLanguages.find((available) => lang == available),
  );
  if (matchLanguages.length > 0) return matchLanguages[0];

  return fallbackLocale;
};

export { findLanguage };
