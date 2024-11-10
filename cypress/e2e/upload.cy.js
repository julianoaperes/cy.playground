describe("Validation of Upload menu", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/upload", "Upload");
  });

  it("It should attach a doc", () => {
    cy.get('input[name="doc"]')
      .selectFile("cypress/fixtures/doc.pdf")
      .then((element) => {
        expect(element[0].files[0].name).to.equal("doc.pdf");
      });
  });

  it("It should attach a image", () => {
    cy.get('input[name="photo"]')
      .selectFile("cypress/fixtures/liga.jpg")
      .then((element) => {
        expect(element[0].files[0].name).to.equal("liga.jpg");
      });

    cy.get("#image-upload")
      .find("img")
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "blob");
  });
});
