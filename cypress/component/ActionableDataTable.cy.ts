import { mount } from '@cypress/vue';
import ActionableDataTable from '../../src/components/ActionableDataTable.vue';
import { i18n } from '../../src/i18n';

describe('ActionableDataTable', () => {
  const config = {
    title: "form",
    fields: [
      { model: 'username', label: 'Username', type: 'text' },
      { model: 'fullname', label: 'Full Name', type: 'text' },
      { model: 'email', label: 'Email', type: 'email' },
      { model: 'role', label: 'Role', type: 'select', options: [{ text: 'Admin', value: 'admin' }, { text: 'User', value: 'user' }] }
    ]
  };

  const columnNames = ['username', 'fullname', 'email', 'role'];
  const data = [
    { id: 1, username: 'johndoe', fullname: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, username: 'janedoe', fullname: 'Jane Doe', email: 'jane@example.com', role: 'user' }
  ];

  const mountComponent = (onSubmit) => {
    mount(ActionableDataTable, {
      global: {
        plugins: [i18n],
      },
      props: {
        config,
        title: 'User DataTable',
        modalTitle: 'Edit User',
        columnNames,
        data: data,
        onSubmit
      }
    });
  };

  it('renders the table with the correct data', () => {
    mountComponent(() => {});
    cy.get('table').within(() => {
      cy.get('tr').should('have.length', data.length + 1); // including header row
      data.forEach((user, index) => {
        cy.get('tr').eq(index + 1).within(() => {
          cy.get('td').eq(0).should('contain', user.username)
          cy.get('td').eq(1).should('contain', user.fullname);
          cy.get('td').eq(2).should('contain', user.email);
          cy.get('td').eq(3).should('contain', user.role);
        });
      });
    });
  });

  it('opens the modal with the correct form fields', () => {
    mountComponent(() => {});
    cy.get('button').contains('Create').click();
    cy.get('.modal').should('be.visible');
    cy.get('input#username').should('exist');
    cy.get('input#fullname').should('exist');
    cy.get('input#email').should('exist');
    cy.get('select#role').should('exist');
  });

  it('calls the onSubmit callback with form data', () => {
    const onSubmit = cy.spy().as('onSubmit');
    mountComponent(onSubmit);
    cy.get('button').contains('Create').click();
    cy.get('input#username').type('newuser');
    cy.get('input#fullname').type('New User');
    cy.get('input#email').type('newuser@example.com');
    cy.get('select#role').select('user');
    cy.get('button').contains('Submit').click();
    cy.get('@onSubmit').should('have.been.calledWith', {
      username: 'newuser',
      fullname: 'New User',
      email: 'newuser@example.com',
      role: 'user'
    });
  });
});
