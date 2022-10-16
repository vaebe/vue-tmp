import { createApp } from 'vue';
import store from '@/store';
import router from './router';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import './assets/css/ress.css';
import './assets/css/reset-el-style.scss';

const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(store);
app.use(router);
app.mount('#app');
