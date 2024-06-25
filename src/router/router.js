import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/PersonListPage.vue"),
  },
  {
    path: "/bill",
    name: "bill",
    component: () => import("../pages/BillPage.vue"),
  },
  {
    path: "/debts",
    name: "debts",
    component: () => import("../pages/DebtsPage.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
