import {BasePage} from "./base";
import {faker} from "@faker-js/faker";

export class Bookings extends BasePage {

    // Booking form
    get adults() {
        return this.getByCustomId("user-type-adult")
    }

    get child() {
        return this.getByCustomId("user-type-child")
    }

    get group() {
        return this.getByCustomId('user-type-two-to-three-people')
    }

    get extendedOptions() {
        return this.getByCustomId('extended-options-select-action').find('select');
    }

    get comments() {
        return cy.get('.test-custom-field-comments');
    }

    get allergyCheckBox() {
        return this.getByCustomId('custom-field-allergies-checkbox');
    }

    get allergyComment() {
        return cy.get('.test-custom-field-detailed-allergies');
    }

    // Booking form actions
    /**
     * @param {number} adultsAmount
     * @param {number} childrenAmount
     */
    addPeople(adultsAmount, childrenAmount) {
        this.adults.select(adultsAmount);
        if (childrenAmount > 0) {
            this.child.select(childrenAmount);
        }
    }

    /**
     * @param {number} group
     */
    addGroupOfPeople(group) {
        this.group.select(group);
    }

    /**
     * @param {number} person
     * @param {string} meal
     */
    selectMeals(person, meal) {
        this.extendedOptions.eq(person).select(meal, {force: true});
    }

    /**
     * @param {string} source
     */
    selectInfoSource(source) {
        this.extendedOptions.eq(2).select(source, {force: true});
    }

    selectAllergy() {
        this.allergyCheckBox.click({force: true})
    }

    fillAllergyComment() {
        this.selectAllergy()
        this.allergyComment.type(faker.lorem.sentence());
    }

    fillComments() {
        this.comments.type(faker.lorem.sentence())
    }

}

