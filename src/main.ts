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
router.afterEach((to) => {
  //遍历meta改变title
  if (to.meta.title) {
    document.title = to.meta.title as string + ' | 南邮通达程序设计校队';
  } else {
    document.title = ' 南邮通达程序设计校队';
  }
})

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
