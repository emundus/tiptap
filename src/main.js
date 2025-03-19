import {createApp} from 'vue';
import App from './App.vue'

import 'material-symbols';

import "./assets/css/main.scss"
import translate from "@/mixins/translate.js";

let app = null;

app = createApp(App);

app.mixin(translate);

const devmode = import.meta.env.MODE === 'development';
if(devmode) {
  app.config.productionTip = false;
  app.config.devtools = true;
}

app.mount('#app');

if(devmode) {
  const version = app.version;
  const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  devtools.enabled = true;
  devtools.emit('app:init', app, version, {});
}
