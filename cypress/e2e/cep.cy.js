describe("Validation of CEP menu", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/cep", "CEP (API dos Correios)");
  });

  it("It should fill out the information automatically by consuming the post office API ", () => {
    cy.get('input[name="cep"]').type("04534011");
    cy.get('button[type="submit"]').click();
    cy.get('input[name="logradouro"]', { timeout: 7000 }).should(
      "have.value",
      "Rua Joaquim Floriano"
    );
  });
});
