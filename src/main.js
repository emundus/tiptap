import {createApp} from 'vue';
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "./assets/css/main.scss"
import translate from "@/mixins/translate.js";

library.add(fas)

let app = null;

app = createApp(App);

app.use(FontAwesomeIcon);
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
