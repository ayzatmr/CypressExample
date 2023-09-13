import {Utils} from "../support/utils";
import {Home} from "../pages/home";
import {Activity} from "../pages/activity";
import {PaymentForm} from "../pages/factory/payment_form";
import {Bookings} from "../pages/booking";
import {PaymentInfo} from "../pages/payment_info";

let home;
const utils = new Utils();
const activity = new Activity();
const paymentForm = new PaymentForm();
const paymentInfo = new PaymentInfo();
const booking = new Bookings();

describe('FareHarbor - Book Online | Adults', () => {
    // open home page before each test suite
    beforeEach(() => {
        home = new Home();
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
    })
    it('Open home page and check the data is loaded', () => {
        home.getCompanyInfo()
            .should((interception) => {
                expect(interception.response.body.company.name).to.eq("Big Apple Tours and Activities")
                expect(interception.response.statusCode).to.eq(200)
            })

        home.activityOverlay.should('be.visible');
    })

    it('Choose an activity and make a valid payment', () => {
        home.clickActivityByIndex(0);
        activity.calendar.should('be.visible');
        activity.selectCustomDay(5);
        activity.availableTimes.should('be.visible');
        activity.selectTime();
        booking.addPeople(1, 0);
        const card = utils.getCardData('valid');
        paymentForm.paymentFormData.should('be.visible');
        paymentForm.fillPaymentDataAndMakePayment(card)
        paymentInfo.paymentConfirmedHeader.should('be.visible');
        paymentInfo.bookingNumber.should('be.visible');
    })

    it('Choose the activity and fail payment', () => {
        home.clickActivityByIndex(0);
        activity.calendar.should('be.visible');
        activity.selectCustomDay(2);
        activity.availableTimes.should('be.visible');
        activity.selectTime();
        booking.addPeople(1, 0);
        const card = utils.getCardData('decline');
        paymentForm.paymentFormData.should('be.visible');
        paymentForm.fillPaymentDataAndMakePayment(card);
        paymentInfo.paymentFailedHeader.should('be.visible');
    })

    it(' Book Big Apple\'s Private Tour, with 4 people, filling up all the necessary fields', () => {
        home.clickActivityByIndex(2);
        activity.calendar.should('be.visible');
        activity.selectCustomDay(5);
        activity.availableTimes.should('be.visible');
        activity.selectTime();
        booking.addGroupOfPeople(1);
        booking.selectMeals(0, 'Vegan');
        booking.selectMeals(1, 'Vegan');
        booking.selectInfoSource('Yelp');
        booking.fillComments();
        booking.fillAllergyComment();
        const card = utils.getCardData('decline');
        paymentForm.paymentFormData.should('be.visible');
        paymentForm.fillPaymentDataAndMakePayment(card);
        paymentInfo.bookingNumber.should('be.visible');
    })

    it('Choose the activity 1 week later and proceed to the next page', () => {
        home.clickActivityByIndex(0);
        activity.calendar.should('be.visible');
        activity.calendarForm.should('be.visible')
        activity.selectCustomDay(7);
        activity.availableTimes.should('be.visible');
        activity.selectTime();
        booking.locationPath.should('include', 'availability')
    })


    it('Choose the activity 1 year later and get empty calendar', () => {
        home.clickActivityByIndex(0);
        activity.calendar.should('be.visible');
        activity.calendarForm.should('be.visible')
        activity.selectCustomYear(1);
        activity.calendarEmpty.should('be.visible');
    })

    it('Validate the total amount of the invoice', () => {
        home.clickActivityByIndex(0);
        activity.selectCustomDay(7);
        activity.selectTime();
        const adults = utils.randomNumber(1, 5)
        const children = utils.randomNumber(1, 2)
        booking.addPeople(adults, children);
        paymentInfo.countPayment(adults, children)
            .then((result) => {
                paymentInfo.totalPrice.invoke('text')
                    .should('contain', result.total.toString())
                paymentInfo.subTotalPrice.invoke('text')
                    .should('contain', result.subTotal.toString())
                paymentInfo.fees.invoke('text')
                    .should('contain', result.fees.toString())
                paymentInfo.taxes.invoke('text')
                    .should('contain', result.taxes.toString())
            })
    })
})