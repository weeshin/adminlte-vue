import type { App } from 'vue';
import {
    ActionableDataTable, 
    Card, 
    DualListbox, 
    Footer,
 } from '@/components';

export default {
    install: (app: App) => {
        app.component('ActionableDataTable', ActionableDataTable);
        app.component('Card', Card);
        app.component('DualListbox', DualListbox);
        app.component('Footer', Footer);
    }
};

export { ActionableDataTable, Card, DualListbox, Footer }