import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import './style.css'
import './index.scss'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faLock);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)   
    .use(store)
    .use(router)
    .use(i18n);
    
app.mount('#app');
