///<reference types="cypress"/>

describe('Javascripts alerts test', () => {
    it('should stub window.alert and verify it was called', () => {

        // Step 1: Visit the target page
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

        // Step 2: Stub the window.alert method
        cy.window().then(($win) => {
            cy.stub($win, 'alert').as('alert');
        });

        // Step 3: Click the "Click for JS Alert" button
        cy.contains('button', 'Click for JS Alert').click();

        // Step 4: Verify the alert was triggered
        cy.get('@alert').should('have.been.calledOnce');

        // Step 5: Assert the text
        cy.get('#result').should('have.text','You successfully clicked an alert');
    })
})