import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import Main from '@/modules/main/main.vue';
import Dashboard from '@/pages/dashboard.vue';
import Dashboard2 from '@/pages/dashboard2.vue';

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
            }
        ]
    }  
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;