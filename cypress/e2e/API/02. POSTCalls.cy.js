///<reference types="cypress"/>
import { personDetails } from "../../fixtures/personDetails";

describe('API Testing with Different Request Body Approaches', () => {
    const baseUrl = Cypress.env('postUrl');

    it('Hardcoded JSON Object', () => {
        const requestBody = {
            name: "amedua",
            job: "lead"
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}api/users`,
            body: requestBody
        }).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body.name).to.eq(requestBody.name);
            expect(response.body.job).to.eq(requestBody.job);
        });
    });

    it('Dynamically Generated Data', () => {
        const requestBody = {
            name: Math.random().toString(36).substring(2, 12),
            job: Math.random().toString(36).substring(2, 13)
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}api/users`,
            body: requestBody
        }).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body.name).to.eq(requestBody.name);
            expect(response.body.job).to.eq(requestBody.job);
        });
    });

    it('Using Fixture Data', () => {
        cy.fixture("personDetails").then((requestBody) => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}api/users`,
                body: requestBody
            }).then((response) => {
                cy.checkStatus(response, 201);
                expect(response.body.name).to.eq(requestBody.name);
                expect(response.body.job).to.eq(requestBody.job);
            });
        });
    });

    it('Using Imported Data', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}api/users`,
            body: personDetails
        }).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body.name).to.eq(personDetails.name);
            expect(response.body.job).to.eq(personDetails.job);
        });
    });
});
