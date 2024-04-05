import { imageForm } from "../common/imageForm.cy";


Then("I have entered {string} in the title field", (text) => {
    imageForm.elements.titleInput().type(text);
})