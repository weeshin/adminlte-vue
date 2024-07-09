// cypress/support/e2e.ts

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands');

// This is a great place to put global configuration and behavior that modifies Cypress.
// For example, you can register global before or after hooks here.

// You can disable uncaught exceptions handling if needed
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
