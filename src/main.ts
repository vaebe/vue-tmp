import { createApp } from 'vue';
import store from '@/store';
import './style.css';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

const app = createApp(App);
app.use(store);
app.use(ElementPlus, { locale });
app.mount('#app');
