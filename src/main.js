import { createApp } from '@vue/compat';
import App from './App.vue';
import router from './router/index';
import BootstrapVue from 'bootstrap-vue';
import { vfmPlugin } from 'vue-final-modal';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


createApp(App).use(router).use(BootstrapVue).use(vfmPlugin).mount('#app');
