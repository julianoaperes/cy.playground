describe("Radio Menu Validation", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/radio", "Radio Buttons");
  });

  it("Clicking on a single radio button", () => {
    cy.contains("label", "Cypress").click();
  });

  it("Clicking on all radio button", () => {
    const frameworks = ["cypress", "playwright", "selenium", "robot", "jest"];
    frameworks.forEach((framework) => {
      cy.get(`input[id="${framework}"]`).parent().click();
    });
  });
});
