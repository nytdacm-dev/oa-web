import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { setupUserInfoGuard } from "./router/guard/userLoginInfo";
import { setupNProcess } from "@/router/guard/process";

const app = createApp(App)
setupNProcess(router);
setupUserInfoGuard(router);
router.afterEach((to) => {
  //遍历meta改变title
  if (to.meta.title) {
    document.title = to.meta.title as string + ' | 南邮通达程序设计校队';
  } else {
    document.title = ' 南邮通达程序设计校队';
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
