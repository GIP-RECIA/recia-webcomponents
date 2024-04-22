import AppDev from './AppDev.vue'
import { register as registerCustomElements } from './ce'
import { register as registerFontAwsome } from '@/plugins/fontawesome'
import i18n from './i18n'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'

const app = createApp(AppDev)

registerCustomElements()
registerFontAwsome()

app.use(i18n)
app.mount('#app')
