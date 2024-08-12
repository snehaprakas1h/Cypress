///<reference types="cypress"/>
import { personDetails } from "../../fixtures/personDetails";

describe('Different ways of using request body for a test', () => {

    const url = 'https://reqres.in/'
    it('Approach 1 - Hard coaded json object', () => {
        const requestBody = {
            "name": "amedua",
            "job": "lead"
        };

        cy.request({
            method: 'POST',
            url: `${url}api/users`,
            body: requestBody
        }).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body.name).to.eq("amedua");
            expect(response.body.job).to.eq("lead");
        })

    });

    it('Approach 2 - Using dynamically generated data', () => {
        const requestBody =
        {
            "name": Math.random().toString(36).substring(2, 12),
            "job": Math.random().toString(36).substring(2, 13)
        }

        cy.request({
            method: 'POST',
            url: `${url}api/users`,
            body: requestBody
        }).then((response) => {
            cy.checkStatus(response, 201);
            expect(response.body.name).to.eq(requestBody.name);
            expect(response.body.job).to.eq(requestBody.job);
        })

    })

    it('Approach 3 - Using fixtures', () => {
        cy.fixture("personDetails").then((data) => {
            const requestBody = data;
            cy.request({
                method: 'POST',
                url: `${url}api/users`,
                body: requestBody
            }).then((response) => {
                cy.checkStatus(response, 201);
                expect(response.body.name).to.eq(requestBody.name);
                expect(response.body.job).to.eq(requestBody.job);
            })
        })
    })

    it('Approach 4 - Using imports', () => {
            cy.request({
                method: 'POST',
                url: `${url}api/users`,
                body: personDetails
            }).then((response) => {
                cy.checkStatus(response, 201);
                expect(response.body.name).to.eq(personDetails.name);
                expect(response.body.job).to.eq(personDetails.job);
            })
    })
})