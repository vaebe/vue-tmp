import { initMswWorker } from '@/mocks/browser'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

import 'ress/ress.css'
import '@/assets/styles/index.scss'

initMswWorker()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
