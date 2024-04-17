import AppDev from './AppDev.vue'
import { register as registerCustomElements } from './ce'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'

const app = createApp(AppDev)

registerCustomElements()

app.mount('#app')
