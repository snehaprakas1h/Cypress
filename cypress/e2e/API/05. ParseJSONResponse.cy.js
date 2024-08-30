///<reference types="cypress"/>

describe('API Response Parsing and Validation', () => {
    const baseUrl = `${Cypress.env('fakestoreUrl')}products`;

    /**
     * Validates specific attributes of the first and last product in the list.
     */
    it.only('Validate product details in JSON response', () => {
        cy.request({
            method: 'GET',
            url: baseUrl
        }).then((response) => {
            cy.checkStatus(response, 200);

            // Validate the first product's details
            const firstProduct = response.body[0];
            expect(firstProduct.id).to.equal(1);
            expect(firstProduct.title).to.equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
            expect(firstProduct.category).to.equal("men's clothing");
            expect(firstProduct.rating.rate).to.equal(3.9);

            // Validate the last product's details
            const lastProduct = response.body[19];
            expect(lastProduct.id).to.equal(20);
            expect(lastProduct.title).to.equal('DANVOUY Womens T Shirt Casual Cotton Short');
            expect(lastProduct.category).to.equal("women's clothing");
            expect(lastProduct.rating.rate).to.equal(3.6);
        });
    });

    /**
     * Calculates and validates the total sum of all product prices.
     */
    it('Calculate and validate the total price of all products', () => {
        cy.request({
            method: 'GET',
            url: baseUrl
        }).then((response) => {
            cy.checkStatus(response, 200);

            const totalSum = response.body.reduce((sum, product) => sum + product.price, 0);
            expect(Math.round(totalSum)).to.equal(3241);
        });
    });

    /**
     * Extracts and validates the sum of prices for the first five products.
     */
    it('Calculate and validate the total price of the first five products', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: { limit: 5 }
        }).then((response) => {
            cy.checkStatus(response, 200);

            const totalSum = response.body.reduce((sum, product) => sum + product.price, 0);
            expect(totalSum).to.equal(899.23);
        });
    });
});

// use JSON path to find the structure - https://jsonpathfinder.com/

