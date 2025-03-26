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

import App from '@/App.vue'
import { register as registerCustomElements } from '@/ce'
import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/solid.css'
import 'regenerator-runtime/runtime.js'

const app = createApp(App)
registerCustomElements()

app.mount('#app')
