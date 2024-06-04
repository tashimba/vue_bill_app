import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import { createVuetify, components, directives } from "./vuetifySettings.js";

import router from "./router/router.js";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
