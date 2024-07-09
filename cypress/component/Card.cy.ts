import Card from '../../src/components/card.vue';

describe('Card.vue', () => {
  it('renders props.title when passed', () => {
    cy.mount(Card, {
      props: { title: 'Test Title' },
    });

    cy.get('.card-title').should('contain', 'Test Title');
  });

  it('toggles card body visibility when button is clicked', () => {
    cy.mount(Card);

    cy.get('.card-body').should('be.visible');
    cy.get('.btn-tool').first().click();
    cy.get('.card-body').should('not.be.visible');
  });

  it('closes the card when the close button is clicked', () => {
    cy.mount(Card);

    cy.get('.card').should('be.visible');
    cy.get('.btn-tool').last().click();    
    cy.get('.card').should('not.exist');
  });
});
