import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import 'bytemd/dist/index.css'
import "@/assets/css/base.less";
import "@/assets/css/style-dark.less";
import VueParticles from 'vue-particles'

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(VueParticles)


import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(router).use(pinia).use(ElementPlus).mount("#app");
