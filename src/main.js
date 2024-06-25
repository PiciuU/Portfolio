import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import '@/assets/styles/main.scss';

import icon from '@/components/common/icon.vue';

/* Locales i18n */
import { createI18n } from 'vue-i18n';
import pl from '@/assets/locales/pl.json';
import en from '@/assets/locales/en.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { pl, en }
});

const app = createApp(App);

app.component('icon', icon);

app.use(createPinia()).use(router).use(i18n).mount('#app');
