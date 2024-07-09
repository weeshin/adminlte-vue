import { mount } from 'cypress/vue';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a Vue component
       * @param component The Vue component to mount
       * @param options Options to pass to the mount function
       */
      mount(component: any, options?: Parameters<typeof mount>[1]): Chainable<any>;
    }
  }
}
