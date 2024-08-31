///<reference types="cypress"/>

describe('cy.root example', () => {
    /**
     * This test suite demonstrates the usage of the `cy.root()` command within a Cypress test.
     * The test interacts with checkboxes on a sample page, specifically focusing on verifying
     * and manipulating the state of checkboxes. By using `cy.root()`, we ensure that the assertions
     * and actions are scoped correctly to the root element within a `within()` block, avoiding the need
     * to re-select the root element.
     */
    it('cy.root example test case', () => {
        cy.visit('https://the-internet.herokuapp.com/checkboxes')

        cy.get('#checkboxes').within(() => {
            // Verify that the first checkbox is not checked
            cy.get('input[type="checkbox"]').as('checkbox')
            
            cy.get('@checkbox').first().should('not.be.checked')

            // Click the first checkbox
            cy.get('@checkbox').first().click()

            // Verify that the first checkbox is now checked
            cy.root().find('input[type="checkbox"]').first().should('be.checked')

            cy.log('**uncheck the first checkbox**')

            // Uncheck the first checkbox
            cy.get('@checkbox').first().click()

            // Verify that the first checkbox is not checked again
            cy.root().find('input[type="checkbox"]').first().should('not.be.checked')
        })
    })
})


// Contextual Reference: When you use cy.root() inside a within(), it references the root element
//  (#bread in this case) without the need to select it again. This is especially useful to avoid 
//  ambiguity and to ensure you are checking or interacting with the intended element within the 
//  current scope.

// Avoid Redundant Selectors: Without cy.root(), you might have to reselect the element #bread, 
// which could lead to redundant code. Using cy.root() makes the code cleaner and more maintainable.

// Scope Awareness: cy.root() is particularly important when you're deeply nested within a DOM 
// structure or if the element has complex children. It ensures that you are always referring back 
// to the correct element within the within() block.