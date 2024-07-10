import type { App } from 'vue';
import { Card, DualListbox, Footer } from '@/components';

export default {
    install: (app: App) => {
        app.component('Card', Card);
        app.component('DualListbox', DualListbox);
        app.component('Footer');
    }
};

export { Card, DualListbox, Footer }