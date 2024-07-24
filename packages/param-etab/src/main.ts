import 'regenerator-runtime/runtime';
import { createApp } from "vue";
import App from "./App.vue";

import i18n from "./i18n";
import "./icons";
import { register as registerCustomElements } from "./ce";

const app = createApp(App);

registerCustomElements();

app.use(i18n);