/// <reference types="cypress"/>

describe('HTTP Requests', () => {

    const baseUrl = Cypress.env('httpUrl');

    it('GET HTTP Call', () => {
        cy.request('GET', `${baseUrl}/1`).then((response) => {
            cy.checkStatus(response, 200);
        })
    });

    it('POST HTTP Call', () => {
        const newPost = {
            userId: 1,
            title: "Exploring Cypress for API Testing",
            body: "This post demonstrates how to create a new resource using a POST request in Cypress."
        };

        cy.request('POST', baseUrl, newPost).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body).to.include(newPost);
        });
    });


    it('PUT HTTP Call', () => {
        const updatedPost = {
            userId: 1,
            id: 1,
            title: "Updated: Cypress API Testing Guide",
            body: "This post has been updated to include more advanced details about using PUT requests in Cypress."
        };

        cy.request('PUT', `${baseUrl}/1`, updatedPost).then((response) => {
            cy.checkStatus(response, 200);
            expect(response.body).to.include(updatedPost);
        });
    });

    it('DELETE HTTP Call', () => {
        cy.request('DELETE', `${baseUrl}/1`).then((response) => {
            cy.checkStatus(response, 200);
            expect(response.body).to.be.empty;
        });
    });
})