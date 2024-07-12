import { mount } from '@cypress/vue';
import Map from '../../src/components/Map.vue'; // Adjust the path as necessary

describe('Map.vue', () => {
  const initialRoutes = [
    [3.2690515637244513, 101.65283525496457],
    [3.271960009172302, 101.65429184988885],
    [3.275110815549323, 101.65186419168171],
    [3.2705057875029464, 101.65101451130921],
    [3.2637193918402643, 101.64907238474346]
  ];

  beforeEach(() => {
    mount(Map, {
      props: {
        routes: initialRoutes.slice(0, 1) // Start with the first location
      }
    });
  });

  it('renders the map container', () => {
    cy.get('#map').should('exist');
  });

});
