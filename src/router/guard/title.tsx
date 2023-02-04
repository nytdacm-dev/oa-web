import type { Router } from "vue-router";

export const setupTitleChange = (router: Router) => {
  router.afterEach((to) => {
    //遍历meta改变title
    if (to.meta.title) {
      document.title = to.meta.title as string + " | 南邮通达程序设计校队";
    } else {
      document.title = " 南邮通达程序设计校队";
    }
  });
};
