import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';
import Toast, { POSITION, PluginOptions } from 'vue-toastification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "vue-toastification/dist/index.css";
// import './style.css'
import './index.scss'
import 'prismjs/themes/prism.css';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faLock);

const options: PluginOptions  = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
};

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)   
    .use(store)
    .use(router)
    .use(i18n)
    .use(Toast, options);
    
app.mount('#app');
