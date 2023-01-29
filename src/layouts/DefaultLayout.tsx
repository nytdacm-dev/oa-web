import { ElContainer, ElFooter, ElHeader, ElMain } from "element-plus";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Header from "./default-layout/Header.vue";
import Footer from "./default-layout/Footer.vue";
import style from "./DefaultLayout.module.scss"

export const DefaultLayout = defineComponent({
  setup() {
    return () => (
      <>
        <ElContainer>
          <ElHeader>
            <Header />
          </ElHeader>
          <ElMain class={style.main}>
            <RouterView />
          </ElMain>
          <ElFooter class={style.footer}>
            <Footer />
          </ElFooter>
        </ElContainer>
      </>
    )
  }
})

export default DefaultLayout;
