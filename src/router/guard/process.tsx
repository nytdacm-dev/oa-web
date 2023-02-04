import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { Router } from "vue-router";

export const setupNProcess = (router: Router) => {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
