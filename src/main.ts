import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from "pinia";
import './assets/style.css'
import './assets/ticket.css'
import "@/assets/styles/tailwind.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

const pinia = createPinia();

loadFonts()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .mount('#app')
