import { createRouter, createWebHashHistory } from 'vue-router'
import LoginLayout from '../layouts/desktop/LoginLayout.vue'
import MainPageLayout from '../layouts/desktop/MainPageLayout.vue'
import ChatLayout from '../layouts/desktop/ChatLayout.vue'
import GameLayout from '../layouts/desktop/GameLayout.vue'

const routes = [
    {
        path: '/',
        component: LoginLayout
    },
    {
        path: '/MainPage',
        component: MainPageLayout
    },
    {
        path: '/Chat',
        component: ChatLayout
    },
    {
        path: '/Game',
        component: GameLayout
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router