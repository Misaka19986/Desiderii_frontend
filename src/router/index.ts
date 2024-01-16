import { createRouter, createWebHashHistory } from 'vue-router'
import LoginLayout from '../layouts/desktop/LoginLayout.vue'
import MainPageLayout from '../layouts/desktop/MainPageLayout.vue'

const routes = [
    {
        path: '/',
        component: LoginLayout
    },
    {
        path: '/MainPage',
        component: MainPageLayout
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router