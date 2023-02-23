import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui'
import Header from './default-layout/Header.vue'
import Footer from './default-layout/Footer.vue'
import style from './DefaultLayout.module.scss'

export const DefaultLayout = defineComponent({
  setup() {
    return () => (
      <>
        <NLayout>
          <NLayoutHeader>
            <Header />
          </NLayoutHeader>
          <NLayoutContent contentStyle={'padding:0 24px; '} class={style.main}>
            <RouterView />
          </NLayoutContent>
          <NLayoutFooter class={style.footer}>
            <Footer />
          </NLayoutFooter>
        </NLayout>
      </>
    )
  },
})

export default DefaultLayout
