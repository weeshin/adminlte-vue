import { mount } from '@cypress/vue';
import { i18n } from '../../src/i18n';
import Attendance from '../../src/components/Attendance.vue';


describe('Attendance', () => {
    const data = [
        { "title": "Sophia", "body": [ { "day": "2024-07-01", "content": "m1 - absent" }, { "day": "2024-07-02", "content": "m" }]},
        { "title": "Benjamin", "body": [{ "day": "2024-07-01", "content": "m" }, {"day": "2024-07-05", "content": "m"}]}
    ];

    const mountComponent = (onSubmit) => {
        mount(Attendance, {
            global: {
                plugins: [i18n]
            },
            props: {
                initialYear: "2024",
                initialMonth: '7',
                records: data
            }
        });
    };
  
    beforeEach(() => {
        mountComponent(() => {});
    });
    
    it('should display current month and year', () => {
      cy.get('.current-date').should('have.text', 'July 2024');
    });
    
    it('should navigate to the previous month', () => {
      cy.get('.btn-group > .btn').first().click();
      cy.get('.current-date').should('have.text', 'June 2024');
    });
    
    it('should navigate to the next month', () => {
      cy.get('.btn-group > .btn').last().click();
      cy.get('.current-date').should('have.text', 'August 2024');
    });
    
    it('should navigate to the current month', () => {
      cy.get('.btn').contains('Current Month').click();
      cy.get('.current-date').should('have.text', 'July 2024');
    });
  
    it('should search for a record', () => {
      cy.get('#search').type('Sop');
      cy.get('tbody tr').should('have.length', 1);
      cy.get('tbody tr').first().find('td').first().should('have.text', 'Sophia');
    });
    
    it('should display attendance data for a specific day', () => {
      cy.get('#search').type('Sophia');
      // Check the first row in the tbody after searching for 'Sophia'
      cy.get('tbody tr').first().within(() => {
          
        // Check the content in the first cell
        cy.get('td').eq(1).within(() => {
          cy.get('span > div > div').should('contain', 'm1 ...');
        });
        
        // Check the content in the second cell
        cy.get('td').eq(2).within(() => {
          cy.get('span > div > div').should('contain', 'm');
        });
      });
    });
  });
  