import { createMemoryHistory, createRouter } from "vue-router";
import PersonsPage from "../pages/PersonsPage.vue";
import BillPage from "../pages/BillPage.vue";
import DebtsPage from "../pages/DebtsPage.vue";

const routes = [
  {
    path: "/",
    component: PersonsPage,
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
  history: createMemoryHistory(),
});

export default router;
