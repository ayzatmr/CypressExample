import {faker} from "@faker-js/faker";
import {TAXES} from "../constants/tax";
import {CARD_DATA, CARD_NUMBER} from "../constants/card_data";

const ROUND = 2;

export class Utils {
    /**
     * Function returns data to fill payment requisites. Can return valid and invalid data
     * @param {string} card_type
     */
    getCardData(card_type) {
        let cardNumber;
        switch (card_type) {
            case 'valid':
                cardNumber = CARD_NUMBER.VALID;
                break;
            case 'decline':
                cardNumber = CARD_NUMBER.DECLINE;
                break;
            case 'insufficientFunds':
                cardNumber = CARD_NUMBER.INSUFFICIENT_FUNDS;
                break;
            case 'expired':
                cardNumber = CARD_NUMBER.EXPIRED;
                break;
            default:
                cardNumber = CARD_NUMBER.VALID;
        }

        return {
            "cardNumber": cardNumber,
            "expire": {
                "month": CARD_DATA.MONTH,
                "year": faker.date.future().getFullYear().toString()
            },
            "name": faker.name.fullName(),
            "cvv": faker.finance.creditCardCVV(),
            "email": faker.internet.exampleEmail(),
            "phone": faker.phone.number(CARD_DATA.PHONE_FORMAT),
            "countryCode": CARD_DATA.COUNTRY_CODE, //faker.address.country(),
            "country": Math.floor(Math.random() * 150),
            "zipCode": CARD_DATA.ZIP_CODE
        }
    }

    /**
     * @param {number} min
     * @param {number} max
     */
    randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * get the dirty text data from the price field, trim it, delete the currency symbol and return value
     * @param {JQuery<HTMLElement>} price
     */
    trimAndReplace(price) {
        return price.text().trim().replace('$', '')
    }

    /**
     * Inner calculator to check the price, calculated by the backend on the payment page
     * @param {number} adultAmount
     * @param {number} childAmount
     * @param {string} adultPrice
     * @param {string} childPrice
     */
    countPayment(adultPrice, childPrice, adultAmount, childAmount) {

        const subTotal = parseFloat((adultPrice * adultAmount + childPrice * childAmount).toFixed(ROUND));
        const taxes = parseFloat((subTotal * TAXES.TAX_PERCENT).toFixed(ROUND));
        const fees = parseFloat((adultAmount * TAXES.ADULT_FEE + childAmount * TAXES.CHILD_FEE).toFixed(ROUND));
        const total = parseFloat((subTotal + taxes + fees).toFixed(ROUND));

        return {
            total: total,
            taxes: taxes,
            fees: fees,
            subTotal: subTotal
        }
    }
}



