/** The base class should be extended by all other pages.
 * It contains common methods that can be used by all extended classes.*/
export class BasePage {

    get locationPath() {
        return cy.location('pathname');
    }

    /**
     * @param {string} value
     */
    getByCustomId(value) {
        return cy.get(`[${Cypress.env('data-test-id')}=${value}]`);
    }

    /**
     * @param {string} url
     */
    waitForDataLoading(url) {
        cy.intercept(url).as('data');
        cy.wait('@data', {timeout: 5000});
        return this
    }

}
