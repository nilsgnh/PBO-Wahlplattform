import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from './config/i18n';
import markdown from './config/markdown'; // Markdown-Konfiguration importieren

const app = createApp(App);

// Markdown-It global registrieren
app.config.globalProperties.$markdown = markdown;

// Plugins registrieren
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
