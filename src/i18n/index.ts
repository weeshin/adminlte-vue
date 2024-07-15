import { createI18n } from "vue-i18n";
import cn from './cn.json';
import en from './en.json';
import my from './my.json';

export const i18n = createI18n({
    locale: 'cn',
    messages: {cn, en, my},
    fallbackLocale: 'en',
    legacy: false
});