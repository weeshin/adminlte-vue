import { mount } from 'cypress/vue';
import '../../src/index.scss'; // Import any global styles
import '../../src/main.ts';

Cypress.Commands.add('mount', mount);
