import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from "pinia";
import router from './router/index.ts'

import './css/tailwind.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'

const pinia = createPinia()

createApp(App).use(Quasar, {plugins: {}, }).use(router).use(pinia).mount('#app')
