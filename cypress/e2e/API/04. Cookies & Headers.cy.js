///<reference types="cypress"/>

describe('API Endpoints with Authentication and Headers', () => {
    const baseUrl = Cypress.env('booksUrl');
    const booksUrl = `${baseUrl}api-clients/`;
    const orderUrl = `${baseUrl}orders/`;

    let email;
    let token;
    let orderId;

    // Generate a random email address before any tests run
    before(() => {
        email = `${Math.random().toString(36).substring(2, 12)}@gmail.com`;
    });

    // Obtain an access token by creating a client
    before('Obtain access token', () => {
        cy.request({
            method: 'POST',
            url: booksUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                clientName: 'Test',
                clientEmail: email
            }
        }).then((response) => {
            expect(response.status).to.eq(201); // Verify successful request
            token = response.body.accessToken;
            cy.log(`Access Token: ${token}`);
        });
    });

    // Create an order using the obtained token
    before('Create an order', () => {
        cy.request({
            method: 'POST',
            url: orderUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                bookId: 1,
                customerName: 'test43'
            }
        }).then((response) => {
            cy.checkStatus(response, 201); // Verify order creation
            orderId = response.body.orderId;
            cy.log(`Order ID: ${orderId}`);
            expect(response.body.created).to.be.true; // Ensure order is marked as created
        });
    });

    // Fetch all orders and validate the response
    it('Retrieve all orders', () => {
        cy.request({
            method: 'GET',
            url: orderUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cookies: {
                'cookieName': 'mycookie'
            }
        }).then((response) => {
            cy.checkStatus(response, 200); // Verify successful retrieval
            expect(response.body).to.have.lengthOf(1); // Validate the number of orders
        });
    });
});
