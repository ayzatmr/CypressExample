import {BasePage} from "../base";

export class UserInfo extends BasePage {
    get name() {
        return cy.get('#id_name');
    }

    get email() {
        return cy.get('#id_email');
    }

    get phone() {
        return cy.get('#id_phone');
    }

    get countryList() {
        return cy.get('.country-list');
    }

    get flag() {
        return cy.get('.flag-container');
    }

    /**
     * @param {{country: number, zipCode: string, cvv: string, phone: string, countryCode: string,
     * expire: {month: string, year: string}, name: string, cardNumber: *, email: string}} cardData
     */
    fillContactInformation(cardData) {
        this.name.type(cardData.name);
        this.phone.type(cardData.phone);
        this.email.type(cardData.email);
        this.flag.click();
        this.countryList.contains(cardData.countryCode).click();
    }
}