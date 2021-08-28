import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import dayBookRouter from "../modules/daybook/router";

const routes = [
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/daybook",
    ...dayBookRouter,
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
