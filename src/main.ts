import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import 'regenerator-runtime/runtime'
import { register as registerCustomElements } from './ce'
import { register as registerFontAwsome } from '@/plugins/fontawesome'

const app = createApp(App)

registerCustomElements()
registerFontAwsome()

app.use(i18n)
app.mount('#app')
