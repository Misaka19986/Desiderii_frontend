import { createRouter, createWebHashHistory } from 'vue-router'
import MainPageLayout from '../layouts/desktop/MainPageLayout.vue'

const routes = [
    {
        path: '/',
        component: MainPageLayout
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router