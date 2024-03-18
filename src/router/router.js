import { createRouter,createWebHashHistory } from "vue-router"
import Main from "../pages/Main.vue"
import PersonsPage from "../pages/PersonsPage.vue"
import BillPage from "../pages/BillPage.vue"



const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/persons',
        component: PersonsPage
    },
    {
        path: '/bill',
        component: BillPage
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router