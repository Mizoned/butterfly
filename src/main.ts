import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import Antd from 'ant-design-vue';

// @Styles
import '@/assets/styles/main.scss';

const app = createApp(App);

app.use(Antd).use(router).use(createPinia()).mount('#app');
