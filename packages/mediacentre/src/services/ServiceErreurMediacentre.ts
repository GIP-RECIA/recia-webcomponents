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

import i18n from '@/plugins/i18n';

const { t } = i18n.global;

const setError = (statusCode: any) => {
  let errorMessage;
  switch (statusCode) {
    case 400:
      errorMessage = 'error-messages.400';
      break;
    case 401:
      errorMessage = 'error-messages.401';
      break;
    case 403:
      errorMessage = 'error-messages.403';
      break;
    case 500:
      errorMessage = 'error-messages.500';
      break;
    case 'ECONNABORTED':
      errorMessage = 'error-messages.503';
      break;
    default:
      errorMessage = 'error-messages.400';
      break;
  }
  return t(errorMessage);
};

export { setError };
