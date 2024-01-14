import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router/index.ts'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'

createApp(App).use(Quasar, {plugins: {}, }).use(router).mount('#app')
