import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { imageForm } from "../common/imageForm.cy";


Then("I should see a check icon in the title field", () => {
    imageForm.elements.titleInput().then($input => {
        expect($input[0].validity.valid).to.be.true;
    })
})

Then("I should see a check icon in the imageUrl field", () => {
    imageForm.elements.imageInput().then($input => {
        expect($input[0].validity.valid).to.be.true;
    })
})

Then("The inputs should be cleared", () => {
    imageForm.elements.titleInput().should('have.value', '');
    imageForm.elements.imageInput().should('have.value', '');
})

