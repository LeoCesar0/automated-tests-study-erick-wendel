import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { imageForm } from "./imageForm.cy";


Given("I am on the image registration page", () => {
    cy.visit('/')
})

When("I enter {string} in the title field", (text) => {
    imageForm.typeTitleInput(text);
})

Then("I enter {string} in the URL field", (text) => {
    imageForm.typeImageInput(text);
})

Then("I click the submit button", () => {
    imageForm.clickSubmit();
})

Then("I can hit enter to submit the form", () => {
    cy.focused().type('{enter}');
})

