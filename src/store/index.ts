import { createStore } from "vuex";
import uiModule from './ui';

export default createStore({
    modules: {
        ui: uiModule
    }
});