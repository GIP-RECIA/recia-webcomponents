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

import { register as registerCustomElements } from '@/ce'
import { register as registerFontAwsome } from '@/plugins/fontawesome'
import 'regenerator-runtime/runtime.js'

registerCustomElements()
registerFontAwsome()

if (import.meta.env.DEV) {
  const {
    VITE_BASE_API_URL,
    VITE_RESSOURCES_DIFFUSABLES_API_URI,
    VITE_USER_INFO_API_URI,
    VITE_RESOURCES_PER_PAGE_DEFAULT,
  } = import.meta.env

  const component = document.createElement('ui-ressources-gar')
  component.setAttribute('base-api-url', VITE_BASE_API_URL)
  component.setAttribute('ressources-diffusables-api-uri', VITE_RESSOURCES_DIFFUSABLES_API_URI)
  component.setAttribute('user-info-api-url', VITE_USER_INFO_API_URI)
  component.setAttribute('resources-per-page-default', VITE_RESOURCES_PER_PAGE_DEFAULT)
  document.body.appendChild(component)
}
