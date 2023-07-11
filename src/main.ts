import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import 'bytemd/dist/index.css'
import 'virtual:uno.css'
import VueGtag from 'vue-gtag'

import { VueRecaptchaPlugin } from 'vue-recaptcha'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { setupUserInfoGuard } from './router/guard/userLoginInfo'
import { setupNProgress } from '@/router/guard/progress'
import { setupTitleChange } from '@/router/guard/title'

const app = createApp(App)
const head = createHead()

setupNProgress(router)
setupUserInfoGuard(router)
setupTitleChange(router)

app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueGtag, {
  config: { id: 'G-9RHP6VXYRZ' },
})
// @ts-expect-error
app.use(VueRecaptchaPlugin, {
  v2SiteKey: '6LeOZBMnAAAAALtuibq6WgI_s1kheCBtjZ5T-Mw3',
  loaderOptions: {
    useRecaptchaNet: true,
  },
})

app.mount('#app')
