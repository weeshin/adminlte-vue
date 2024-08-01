import type { App } from 'vue';
import {
    DataGrid, 
    Attendance,
    Card, 
    DualListbox, 
    Footer,
 } from './index';

export default {
    install: (app: App) => {
        app.component('DataGrid', DataGrid);
        app.component('Attendance', Attendance);
        app.component('Card', Card);
        app.component('DualListbox', DualListbox);
        app.component('Footer', Footer);
    }
};

export { DataGrid, Attendance, Card, DualListbox, Footer }