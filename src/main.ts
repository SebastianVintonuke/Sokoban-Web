import { createApp } from 'vue';
import App from './App.vue';
import vueRouter from './router';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('./assets/en.json'),
    es: require('./assets/es.json'),
    jp: require('./assets/jp.json')
  }
});

createApp(App)
  .use(vueRouter)
  .use(i18n)
  .mount('#app');