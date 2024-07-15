import { mount } from '@cypress/vue';
import Footer from '../../src/components/Footer.vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      footer: {
        copyright: 'Copyright',
        version: 'Version'
      }
    }
  }
});

describe('Footer Component', () => {
  const currentYear = new Date().getFullYear().toString();

  beforeEach(() => {
    mount(Footer, {
      global: {
        plugins: [i18n]
      },
      props: {
        version: '1.0.0',
        url: 'https://example.com',
        shortname: 'Example'
      }
    });
  });

  it('should display the current year', () => {
    cy.get('footer').contains(currentYear).should('exist');
  });

  it('should display the correct version', () => {
    cy.get('footer .float-right b').contains('Version').next().contains('1.0.0').should('exist');
  });

  it('should have the correct URL and shortname', () => {
    cy.get('footer a')
      .should('have.attr', 'href', 'https://example.com')
      .and('have.attr', 'target', '_blank')
      .contains('Example')
      .should('exist');
  });
});