import { mount } from '@cypress/vue';
import MessageDropdown from '../../src/components/MessageDropdown.vue';

describe('MessageDropdown.vue', () => {
  const sampleMessages = [
    {
      image: 'path/to/user1.jpg',
      caller: 'John Doe',
      short_message: 'Hello, how are you?',
      time: '2 hours ago'
    },
    {
      image: 'path/to/user2.jpg',
      caller: 'Jane Smith',
      short_message: 'Are you available for a meeting?',
      time: '1 hour ago'
    }
  ];

  beforeEach(() => {
    mount(MessageDropdown, {
      props: {
        totalMessages: sampleMessages.length.toString(),
        messages: sampleMessages
      }
    });
  });

  it('renders the dropdown icon and badge correctly', () => {
    cy.get('.fa-comments').should('exist');
    cy.get('.badge-danger.navbar-badge').should('contain', sampleMessages.length.toString());
  });

  it('renders the correct number of messages', () => {
    cy.get('.dropdown-item').should('have.length', sampleMessages.length + 1); // Including "See All Messages"
  });

  it('displays message details correctly', () => {
    sampleMessages.forEach((message, index) => {
      cy.get('.dropdown-item').eq(index).within(() => {
        cy.get('h3.dropdown-item-title').should('contain', message.caller);
        cy.get('p.text-sm').first().should('contain', message.short_message);
        cy.get('p.text-sm.text-muted').should('contain', message.time);
      });
    });
  });

  it('has a "See All Messages" link', () => {
    cy.get('.dropdown-footer').should('contain', 'See All Messages');
  });
});
