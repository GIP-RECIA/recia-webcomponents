/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const availablesLanguages: Array<string> = ['en', 'fr'];

const findLanguage = (fallback: string, availables: Array<string> = availablesLanguages): string => {
  const isLanuage: boolean = availables.includes(window.navigator.language);
  if (isLanuage) return window.navigator.language;
  const matchLanguages = window.navigator.languages.filter((lang) => availables.find((available) => lang == available));
  if (matchLanguages.length > 0) return matchLanguages[0];
  return fallback;
};

export { findLanguage };
