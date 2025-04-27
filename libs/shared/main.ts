// shared/main.ts
/**
 * Shared application initialization
 * Sets up global configurations, plugins, and error handling
 */

import { createApp, type App as VueApp, type ComponentPublicInstance } from 'vue'; // Import type and value separately
import router from './router';
import { createPinia } from 'pinia';
import App from '../web-vue/src/App.vue';

// Initialize global error handling with proper typing
const setupErrorHandling = (app: VueApp) => {
  app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    console.error('Global error:', { 
      error: err,
      component: instance,
      info 
    });
    // TODO: Add error reporting service
  };
};

const initApp = () => {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);

  setupErrorHandling(app);

  app.mount('#app');
};

initApp();