import {BasePage} from "./base";
import {Utils} from "../support/utils";

const utils = new Utils();

export class PaymentInfo extends BasePage {
    get bookingNumber() {
        return cy.get('.receipt-ticket-pk');
    }

    get paymentConfirmedHeader() {
        return this.getByCustomId('booking-confirmation-header');
    }

    get paymentFailedHeader() {
        return this.getByCustomId('test-error-message-indicator');
    }

    get adultPrice() {
        return this.getByCustomId('customer-type-rate').first()
            .find('span[class="price-wrap ng-binding"]')
    }

    get childPrice() {
        return this.getByCustomId('customer-type-rate').last()
            .find('span[class="price-wrap ng-binding"]')
    }

    get totalPrice() {
        return cy.get('span[class="test-total-indicator notranslate ng-binding ng-scope final-total"]')
    }

    get subTotalPrice() {
        return cy.get('td[class="subtotal-value test-subtotal-indicator notranslate ng-binding"]')
    }

    get fees() {
        return cy.get('td[class="subtotal-value notranslate ng-binding"]')
    }

    get taxes() {
        return cy.get('td[class="subtotal-value test-taxes-and-fees-indicator notranslate ng-binding"]')
    }

    /**
     * returns paymentsInfo object counted using adultPrice, adultsAmount and childPrice, childrenAmount
     * @param {number} adults
     * @param {number} children
     */
    countPayment(adults, children) {
        return this.adultPrice
            .then(($span) => {
                const adultPrice = utils.trimAndReplace($span);
                this.childPrice.then(($span) => {
                    const childPrice = utils.trimAndReplace($span);
                    return cy.wrap(utils.countPayment(
                        adultPrice,
                        childPrice,
                        adults,
                        children
                    )).as('paymentsInfo')
                })
            })
    }
}