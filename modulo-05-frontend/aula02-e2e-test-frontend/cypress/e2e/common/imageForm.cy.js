class ImageForm {
  elements = {
    titleInput: () => cy.get("#title"),
    imageInput: () => cy.get("#imageUrl"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageFeedback: () => cy.get("#urlFeedback"),
    submitButton: () => cy.get("#btnSubmit"),
  };

  typeTitleInput(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeImageInput(text) {
    if (!text) return;
    this.elements.imageInput().type(text);
  }
  clickSubmit(){
    this.elements.submitButton().click();
  }
}

export const imageForm = new ImageForm();
