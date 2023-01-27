import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { setupUserInfoGuard } from './router/guard/userLoginInfo'

const app = createApp(App)

setupUserInfoGuard(router);

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
