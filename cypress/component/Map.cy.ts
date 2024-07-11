import { mount } from '@cypress/vue';
import Map from '../../src/components/Map.vue';

describe('Map.vue', () => {
  it('renders the map container', () => {
    mount(Map);

    cy.get('#map').should('exist');
    cy.get('#map').should('have.css', 'height', '180px');
  });

  it('initializes the Leaflet map', () => {
    mount(Map);

    // Check if the Leaflet container exists
    cy.get('.leaflet-container').should('exist');

    // Additional checks can be done to ensure map tiles are loaded, etc.
    // This may require waiting for Leaflet to fully load the map tiles
    cy.get('.leaflet-tile').should('exist');
  });
});
