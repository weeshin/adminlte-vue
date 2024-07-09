import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Update this to match your development server URL
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    supportFile: 'cypress/support/component.ts',
    indexHtmlFile: 'cypress/support/component-index.html'
  }
});
