import { mount } from '@cypress/vue';
import FullscreenButton from '../../src/components/FullscreenButton.vue';

describe('FullscreenButton.vue', () => {
  beforeEach(() => {
    mount(FullscreenButton);
  });

  it('renders the button icon correctly', () => {
    cy.get('.nav-link').should('exist');
    cy.get('.nav-link i').should('have.class', 'fas fa-expand-arrows-alt');
  });

//   it('toggles fullscreen mode when button is clicked', () => {
//     // Start with fullscreen off
//     cy.get('html').should('not.have.class', 'fullscreen');

//     // Click the fullscreen button
//     cy.get('.nav-link').click();

//     // Check if fullscreen mode is enabled
//     cy.get('html').should('have.class', 'fullscreen');

//     // Click the fullscreen button again
//     cy.get('.nav-link').click();

//     // Check if fullscreen mode is disabled
//     cy.get('html').should('not.have.class', 'fullscreen');
//   });

  it('asserts console errors or exceptions', () => {
    cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('Failed to enter fullscreen');

        return false;
    });

    // Click the fullscreen button again
    cy.get('.nav-link').click();
  });
});
