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

import type { ToastContainerOptions } from 'vue3-toastify'
import { createApp, defineComponent } from 'vue'
import Vue3Toasity from 'vue3-toastify'
import { register as registerCustomElements } from '@/ce'
import { register as registerFontAwsome } from '@/plugins/fontawesome'
import 'regenerator-runtime/runtime.js'
import 'vue3-toastify/dist/index.css'

const app = createApp(defineComponent({}))

registerCustomElements()
registerFontAwsome()

app.use(Vue3Toasity, {
  limit: 0,
  newestOnTop: true,
  theme: 'colored',
} as ToastContainerOptions)

if (import.meta.env.DEV) {
  const {
    VITE_BASE_API_URL,
    VITE_PARAMETAB_API_URI,
    VITE_USER_INFO_API_URI,
    VITE_DEFAULT_LOGO_ICON,
  } = import.meta.env

  const component = document.createElement('param-etab')
  component.setAttribute('base-api-url', VITE_BASE_API_URL)
  component.setAttribute('param-etab-api', VITE_PARAMETAB_API_URI)
  component.setAttribute('user-info-api-url', VITE_USER_INFO_API_URI)
  component.setAttribute('default-logo-icon', VITE_DEFAULT_LOGO_ICON)
  document.body.appendChild(component)
}
