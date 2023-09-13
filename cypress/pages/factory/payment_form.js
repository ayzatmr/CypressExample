import {BasePage} from "../base";
import {UserInfo} from "./user_info";

const user = new UserInfo();

export class PaymentForm extends BasePage {
    get cardNumber() {
        return cy.get('#id_card_number')
    }

    get expireMonth() {
        return cy.get('#id_card_expiry_month');
    }

    get expireYear() {
        return cy.get('#id_card_expiry_year');
    }

    get cardHolderName() {
        return cy.get('#id_cardholders_name');
    }

    get cvc() {
        return cy.get('#id_card_cvc');
    }

    get countryCode() {
        return cy.get('#id_country_code');
    }

    // Payment form
    get payButton() {
        return cy.get('button[ng-mx-click="click-new-booking-complete-booking-button"]');
    }

    get paymentFormData() {
        return this.getByCustomId('payment-details');
    }

    /**
     * @param {{country: number, zipCode: string, cvv: string, phone: string, countryCode: string,
     * expire: {month: string, year: string}, name: string, cardNumber: *, email: string}} cardData
     */
    fillPaymentCC(cardData) {
        this.cardNumber.type(cardData.cardNumber);
        this.expireMonth.select(cardData.expire.month);
        this.expireYear.select(cardData.expire.year);
        this.cardHolderName.type(cardData.name);
        this.cvc.type(cardData.cvv);
        this.countryCode.select(cardData.country);
    }

    makePayment() {
        this.payButton.click();
    }

    fillPaymentDataAndMakePayment(cardData) {
        this.fillPaymentCC(cardData);
        user.fillContactInformation(cardData);
        this.makePayment();
    }
}