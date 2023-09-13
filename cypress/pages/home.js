import {BasePage} from "./base";
import {Activity} from "./activity";

export class Home extends BasePage {
    constructor() {
        super();
        // catch request from backend. The response data can be used later to fill some fields on a page
        cy.intercept(`${Cypress.env("apiHost")}/api/v1/companies/bigappletours/`)
            .as('data')
    }

    get activityOverlay() {
        return cy.get('[ng-app="embeds.book"]');
    }

    get activities() {
        return this.getByCustomId("items")
    }


    /**
     * @param {number} index
     */
    clickActivityByIndex(index) {
        this.activities.eq(index).click()
        return new Activity();
    }

    /**
     * takes intercepted request to backend and returns response object
     */
    getCompanyInfo() {
        return cy
            .get('@data')
            .wait('@data', {timeout: 8000})
            .then((response) => {
                return response
            })
    }
}


