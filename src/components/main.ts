import type { App } from 'vue';
import { Card, DualListbox } from '@/components';

export default {
    install: (app: App) => {
        app.component('Card', Card);
        app.component('DualListbox', DualListbox);
    }
};

export { Card, DualListbox }