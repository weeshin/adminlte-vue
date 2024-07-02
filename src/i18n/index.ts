import { createI18n } from "vue-i18n";
import en from './en.json';
import my from './my.json';

export const i18n = createI18n({
    locale: 'my',
    messages: {en, my},
    fallbackLocale: 'en',
    legacy: false
});