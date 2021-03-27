import { createApp } from 'vue'

import 'normalize.css'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './plugins/element-plus'

import { dbInit } from './plugins/db'
dbInit()

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, { size: 'mini' })
    .mount('#app')
