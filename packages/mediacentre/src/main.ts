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

import App from '@/AppUI.vue'
import { registerElements as registerCustomElements } from '@/ce'
import { register as registerFontAwsome } from '@/plugins/fontawesome'
import i18n from '@/plugins/i18n'
import { createApp } from 'vue'
import 'regenerator-runtime/runtime.js'
import '@gip-recia/info-modal'

const app = createApp(App)

registerCustomElements()
registerFontAwsome()

app.use(i18n)
