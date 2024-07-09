// cypress/support/commands.ts

// Example of creating a custom command
// Cypress.Commands.add('login', (username, password) => {
//     cy.request({
//       method: 'POST',
//       url: '/login', // Update with your login endpoint
//       body: {
//         username,
//         password
//       }
//     }).then((resp) => {
//       expect(resp.status).to.eq(200);
//       cy.setCookie('session_id', resp.body.session_id); // Update according to your application's response
//     });
//   });
  
//   // Example of overwriting an existing command
//   Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
//     // Add any additional logic here
//     return originalFn(url, options);
//   });
  