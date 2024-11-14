describe("Validation of IFrame Menu", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/iframe", "IFrame");
  });

  it("it should fill out the fields into the iframe form", () => {
    cy.get('[data-cy="iframe-inputs"]').then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("#fullname").type("Juliano Peres");
    });
  });
});
