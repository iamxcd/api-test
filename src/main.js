import { createApp } from 'vue'

import 'normalize.css'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './plugins/element-plus'

import { dbInit } from './plugins/db'
dbInit()

import directives from './plugins/directive'

const app = createApp(App)
// 注册自定义指令
directives(app)
app.use(store)
    .use(router)
    .use(ElementPlus, { size: 'mini' })
    .mount('#app')

