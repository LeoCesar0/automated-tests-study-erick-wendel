import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { imageForm } from "../common/imageForm.cy";


Then("I should see {string} message above the title field", (text) => {
    imageForm.elements.titleFeedback().should('contain.text', text);
})

Then("I should see {string} message above the imageUrl field", (text) => {
    imageForm.elements.imageFeedback().should('contain.text', text);
})

Then("I should see an exclamation icon in the title and URL fields", () => {
    imageForm.elements.titleInput().then($input => {
        expect($input[0].validity.valid).to.be.false;
    })
    imageForm.elements.imageInput().then($input => {
        expect($input[0].validity.valid).to.be.false;
    })
})