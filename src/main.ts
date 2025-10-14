import { createApp } from 'vue'
import { initMswWorker } from '@/mocks/browser'
import App from './App.vue'
import router from './router'
import store from './stores'

import '@/assets/styles/index.css'

initMswWorker()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
