import type { App } from 'vue';
import {
    ActionableDataTable, 
    Attendance,
    Card, 
    DualListbox, 
    Footer,
 } from '@/components';

export default {
    install: (app: App) => {
        app.component('ActionableDataTable', ActionableDataTable);
        app.component('Attendance', Attendance);
        app.component('Card', Card);
        app.component('DualListbox', DualListbox);
        app.component('Footer', Footer);
    }
};

export { ActionableDataTable, Attendance, Card, DualListbox, Footer }