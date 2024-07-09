import { mount } from 'cypress/vue';
import '../../src/index.scss'; // Import any global styles

Cypress.Commands.add('mount', mount);
