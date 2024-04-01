import { createWebHistory, createRouter } from "vue-router";
import PersonListPage from "../pages/PersonListPage.vue";
import BillPage from "../pages/BillPage.vue";
import DebtsPage from "../pages/DebtsPage.vue";

const routes = [
  {
    path: "/",
    component: PersonListPage,
  },
  {
    path: "/bill",
    component: BillPage,
  },
  {
    path: "/debts",
    component: DebtsPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
