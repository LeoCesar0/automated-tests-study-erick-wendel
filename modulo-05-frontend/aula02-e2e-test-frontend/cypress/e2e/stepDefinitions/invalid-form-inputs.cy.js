import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { imageForm } from "../common/imageForm.cy";


Then("I should see {string} message above the title field", (text) => {
    imageForm.elements.titleFeedback().should('contain.text', text);
})

Then("I should see {string} message above the imageUrl field", (text) => {
    imageForm.elements.imageFeedback().should('contain.text', text);
})