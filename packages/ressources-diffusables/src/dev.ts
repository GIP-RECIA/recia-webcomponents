import 'regenerator-runtime/runtime';

import { createApp } from 'vue';

import { register as registerCustomElements } from '@/ce';
import { register as registerFontAwsome } from '@/plugins/fontawesome';
import i18n from '@/plugins/i18n';

import App from '@/AppDev.vue';

const app = createApp(App);

registerCustomElements();
registerFontAwsome();

app.use(i18n);

app.mount('#app');
