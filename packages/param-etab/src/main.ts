import App from './App.vue';
import { register as registerCustomElements } from './ce';
import i18n from './i18n';
import './icons';
import 'regenerator-runtime/runtime';
import { createApp } from 'vue';

const app = createApp(App);

registerCustomElements();

app.use(i18n);
