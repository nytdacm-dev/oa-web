import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { setupUserInfoGuard } from "./router/guard/userLoginInfo";
import { setupNProcess } from "@/router/guard/process";
import { setupTitleChange } from "@/router/guard/title";

const app = createApp(App)

setupNProcess(router);
setupUserInfoGuard(router);
setupTitleChange(router);

app.use(createPinia())
app.use(router)

app.mount('#app')
