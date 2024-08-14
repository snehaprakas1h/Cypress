/// <reference types="cypress"/>

describe('Query params', () => {

    const baseUrl = `${Cypress.env('postUrl')}api/users`;
    const queryParam = { page: 2 }

    it.skip('pass query param', () => {

        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: queryParam //query parameter
        }).then((response) => {
            cy.checkStatus(response, 200);
            expect(response.body.page).to.eq(queryParam.page);
            expect(response.body.data).has.length(6);
            expect(response.body.data[0]).to.have.property('id', 7);
            expect(response.body.data[0]).has.property('first_name', 'Michael');
        })
    })

    // General request function with dynamic validation
    const makeRequestAndValidate = ({ queryParam = {}, validationConfig = {} } = {}) => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: queryParam,
        }).then((response) => {
            validateResponse(response, validationConfig);
        });
    };

    // Configurable response validation function
    const validateResponse = (response, {
        expectedStatus = 200,
        page,
        expectedDataLength,
        firstUser: { id, firstName } = {} // Default empty object for firstUser
    } = {}) => {
        cy.checkStatus(response, expectedStatus);

        if (page !== undefined) {
            expect(response.body.page).to.eq(page); // Correctly reference response.body
        }

        if (expectedDataLength !== undefined) {
            expect(response.body.data).to.have.length(expectedDataLength); // Correctly reference response.body.data
        }

        if (id !== undefined || firstName !== undefined) {
            const firstUserData = response.body.data[0];
            if (firstUserData) { // Ensure firstUserData exists
                if (id !== undefined) {
                    expect(firstUserData).to.have.property('id', id);
                }
                if (firstName !== undefined) {
                    expect(firstUserData).to.have.property('first_name', firstName);
                }
            }
        }
    };

    it('should validate user data on page 2', () => {
        makeRequestAndValidate({
            queryParam: { page: 2 },
            validationConfig: {
                page: 2,
                expectedDataLength: 6,
                firstUser: { id: 7, firstName: 'Michael' },
            },
        });
    });

    it('should validate user data on page 3', () => {
        makeRequestAndValidate({
            queryParam: { page: 1 },
            validationConfig: {
                page: 1,
                expectedDataLength: 6,
                firstUser: { id: 1, firstName: 'George' },
            },
        });
    });
})
