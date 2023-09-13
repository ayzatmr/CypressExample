import {Bookings} from "./booking";
import {BasePage} from "./base";

require('datejs');

export class Activity extends BasePage {
    get calendar() {
        return cy.get('.test-calendar-indicator')
    }

    get calendarEmpty() {
        return cy.get('.calendar-empty')
    }

    get nextMonth() {
        return cy.get('.cal-nav-buttons');
    }

    get calendarForm() {
        return this.getByCustomId('test-mainfest-availability-indicator');
    }

    get nextYear() {
        return cy.get('.cal-nav-select--year select');
    }

    get availableTimes() {
        return this.getByCustomId("availabilities")
    }

    /**
     * @param {number} days
     */
    getCustomDate(days) {
        let date = Date.today().addDays(days).toString("MMMM");
        let today = Date.today().toString("MMMM");
        if (date !== today) {
            this.clickNextMonth()
        }
        date = Date.today().addDays(days).toString("dddd, MMMM dS yyyy");
        return cy.get(`[title="${date}"]`)
    }

    /**
     * @param {number} years
     */
    selectCustomYear(years) {
        let date = Date.today().addYears(years).toString("yyyy");
        this.nextYear.select(date)
    }

    /**
     * @param {number} days
     */
    selectCustomDay(days) {
        this.getCustomDate(days).click()
    }

    selectTime() {
        //pick first available time
        this.availableTimes.first().click()
        return new Bookings();
    }

    clickNextMonth() {
        this.nextMonth.click();
    }
}