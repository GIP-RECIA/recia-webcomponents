const availableLanguages: Array<string> = ['fr', 'en', 'es', 'de', 'ru', 'zh'];

const findLanguage = (fallbackLocale: string): string => {
  if (availableLanguages.includes(window.navigator.language)) return window.navigator.language;

  const matchLanguages = window.navigator.languages.filter((lang) =>
    availableLanguages.find((available) => lang == available),
  );
  if (matchLanguages.length > 0) return matchLanguages[0];

  return fallbackLocale;
};

export { findLanguage };
