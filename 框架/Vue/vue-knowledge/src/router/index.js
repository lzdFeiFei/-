/*
 * @Author: your name
 * @Date: 2021-02-01 22:48:18
 * @LastEditTime: 2021-02-01 23:30:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-knowledge\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  },
  {
    path: "/communication",
    name: "Communication",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/communication/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
