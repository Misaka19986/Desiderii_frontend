import { createRouter, createWebHashHistory } from 'vue-router'
import LoginLayout from '../layouts/desktop/LoginLayout.vue'
import MainPageLayout from '../layouts/desktop/MainPageLayout.vue'
import ChatLayout from '../layouts/desktop/ChatLayout.vue'
import GameLayout from '../layouts/desktop/GameLayout.vue'
import UserSpaceLayout from '../layouts/desktop/UserSpaceLayout.vue'
import ArticleLayout from '../layouts/desktop/ArticleLayout.vue'

const routes = [
    {
        path: '/',
        component: LoginLayout
    },
    {
        path: '/mainpage',
        component: MainPageLayout
    },
    {
        path: '/chat',
        component: ChatLayout
    },
    {
        path: '/game',
        component: GameLayout
    },
    {
        path: '/userspace/:name',
        component: UserSpaceLayout
    },
    {
        path: '/article/:title',
        component: ArticleLayout,
        props: true
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router