import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import vuetify from "./vuetifySettings.js";
import router from "./router/router.js";

const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
