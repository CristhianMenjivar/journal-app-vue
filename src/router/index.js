import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import dayBookRouter from "../modules/daybook/router";
import authRouter from "../modules/auth/router";
import isAuthenticatedGuard from "../modules/auth/router/auth-guard";

const routes = [
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/daybook",
    beforeEnter: [isAuthenticatedGuard],
    ...dayBookRouter,
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "",
    redirect: "daybook",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
