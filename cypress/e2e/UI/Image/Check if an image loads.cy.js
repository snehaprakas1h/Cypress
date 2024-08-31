///<reference types="cypress"/>

describe('Broken Images Test', () => {
    it('should verify that images are loaded successfully using network interception', () => {
        cy.visit('https://the-internet.herokuapp.com/broken_images')

        // Intercept all image requests
        cy.intercept('GET', '**/*.jpg').as('imageLoad')

        // Wait for each image request to complete and then check the status
        cy.get('img').each(($img) => {
            cy.wrap($img).then(($el) => {
                // Get the src attribute of the image
                const imgSrc = $el.attr('src')
                cy.intercept(imgSrc).as('imgRequest')

                // Wait for the image request to finish
                cy.wait('@imgRequest').then((interception) => {
                    expect(interception.response.statusCode).to.equal(200) // Assert that the response status is 200
                })
            })
        })
    });

    it('should identify broken images on the page using natural width', () => {
        cy.visit('https://the-internet.herokuapp.com/broken_images') // Visit the target page

        cy.get('.example img').each(($img) => { // Select all images within the .example class
            cy.wrap($img).should('be.visible') // Ensure the image is visible
                .and(($el) => {
                    // Check if the image has loaded properly by verifying its naturalWidth
                    if ($el[0].naturalWidth === 0) {
                        cy.log(`${$el[0].src} is broken`)
                    } else {
                        cy.log(`${$el[0].src} loaded successfully`)
                    }
                })
        })
    })

    it.only('should find the non-broken image using http request', () => {
        cy.visit('https://the-internet.herokuapp.com/broken_images');

        // Select all images within the .example container
        cy.get('.example img').each(($img) => {
            // Get the src attribute of each image
            const src = $img.attr('src');
            cy.log(`url is ${src}`);

            // Make a request to the image URL
            cy.request({
                url: src,
                failOnStatusCode: false // Do not fail the test if the status code is not 2xx
            }).then((response) => {
                // Check if the status code is 200
                if (response.status === 200) {
                    // Log the non-broken image URL
                    cy.log(response);
                    cy.log(`Non-broken image found: ${src}`); //url used is "https://the-internet.herokuapp.com/img/avatar-blank.jpg"
                    // Optionally, you could perform additional actions here if needed
                } else {
                    // Log the broken image URL (optional)
                    cy.log(`Broken image found: ${src}`);
                }
            });
        });
    });
})



