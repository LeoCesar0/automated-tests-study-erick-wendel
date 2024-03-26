import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { imageForm } from "../common/imageForm.cy";


Then("The inputs should be cleared", () => {
    imageForm.elements.titleInput().should('have.value', '');
    imageForm.elements.imageInput().should('have.value', '');
})