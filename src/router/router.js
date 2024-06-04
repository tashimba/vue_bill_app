import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/PersonListPage.vue"),
  },
  {
    path: "/bill",
    component: () => import("../pages/BillPage.vue"),
  },
  {
    path: "/debts",
    component: () => import("../pages/DebtsPage.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
