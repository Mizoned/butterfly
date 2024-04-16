import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';


//Styles
import './assets/styles/styles.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue,
  {
    inputStyle: "outlined",
    ripple: true
  }
);
app.directive('badge', BadgeDirective);
app.use(ToastService);
app.component('Toast', Toast);

app.mount('#app')
