describe("Checkbox Menu Validation", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/checkbox", "Checkbox");
  });

  it("Clicking on the checkboxes", () => {
    cy.get('label[for="javascript"]').click();
    cy.get('input[value="2"]').click({ force: true });
    cy.get('label[for="rust"]').parent().click();
    cy.get('label[for="go"]').click();
    cy.get('label[for="typescript"]').click();
  });

  it("Clicking on all checkboxes by array", () => {
    const langs = ["javascript", "python", "rust", "go", "typescript"];
    langs.forEach((lang) => {
      cy.get(`label[for="${lang}"]`).click();
    });
  });
});
