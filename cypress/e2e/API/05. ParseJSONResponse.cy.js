///<reference types="cypress"/>

describe('Parse JSON response', () => {

    let baseUrl = `${Cypress.env('fakestoreUrl')}products`;
    it('Parse JSON response', () => {
        cy.request({
            method: 'GET',
            url: baseUrl
        }).then((response) => {
            cy.checkStatus(response, 200);
            // use JSON path to find the structure - https://jsonpathfinder.com/
            expect(response.body[0].id).to.equal(1);
            expect(response.body[0].title).to.equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
            expect(response.body[0].category).to.equal("men's clothing");
            expect(response.body[0].rating.rate).to.equal(3.9);

            expect(response.body[19].id).to.equal(20);
            expect(response.body[19].title).to.equal('DANVOUY Womens T Shirt Casual Cotton Short');
            expect(response.body[19].category).to.equal("women's clothing");
            expect(response.body[19].rating.rate).to.equal(3.6);
        })
    })

    it('Extract price from all objects and output the final sum ', () => {
        let length;
        let sum = 0;
        cy.request({
            method: 'GET',
            url: baseUrl
        }).then((response) => {
            cy.checkStatus(response, 200);
            length = response.body.length;
            // use JSON path to find the structure - https://jsonpathfinder.com/

            for (let i = 0; i < length; i++) {
                sum = sum + response.body[i].price;
            }
            expect(Math.round(sum)).to.equal(3241);
        })
    })

    it('Extract price from first five products ', () => {
        let length;
        let sum = 0;
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs:{limit:5}
        }).then((response) => {
            cy.checkStatus(response, 200);
            length = response.body.length;
            response.body.forEach(($element)=>{
                sum = sum + $element.price;
            })

            expect(sum).to.equal(899.23);
        })
    })
})