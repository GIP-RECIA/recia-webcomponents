const availablesLanguages: Array<string> = ['en', 'fr'];

const findLanguage = (fallback: string, availables: Array<string> = availablesLanguages): string => {
  const isLanuage: boolean = availables.includes(window.navigator.language);
  if (isLanuage) return window.navigator.language;
  const matchLanguages = window.navigator.languages.filter((lang) => availables.find((available) => lang == available));
  if (matchLanguages.length > 0) return matchLanguages[0];
  return fallback;
};

export { findLanguage };
