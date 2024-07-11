import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import Main from '@/modules/main/main.vue';
import Dashboard from '@/pages/dashboard.vue';
import Dashboard2 from '@/pages/dashboard2.vue';
import Maps from '@pages/Maps.vue';

const routes: Array<RouteRecordRaw> = [  
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard
            },            
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'dashboard2',
                component: Dashboard2
            },
            {
                path: 'maps',
                component: Maps
            }
        ]
    }  
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;