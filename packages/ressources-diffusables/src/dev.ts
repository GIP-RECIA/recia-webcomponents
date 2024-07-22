import 'regenerator-runtime/runtime.js';

import { createApp } from 'vue';

import { register as registerCustomElements } from '@/ce.ts';
import { register as registerFontAwsome } from '@/plugins/fontawsome.ts';
import i18n from '@/plugins/i18n.ts';

import App from '@/AppDev.vue';

const app = createApp(App);

registerCustomElements();
registerFontAwsome();

app.use(i18n);

app.mount('#app');
