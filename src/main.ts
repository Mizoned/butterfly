import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

// @Styles
import '@/assets/styles/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
