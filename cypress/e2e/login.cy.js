describe("Login validation", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
  });

  it("It should login successfully", () => {
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
  });

  it("It should not login when not valid password", () => {
    cy.login("papito@cyskills.com.br", "1234showtime");
    cy.noticeHaveText(
      "E-mail ou senha incorretos. Por favor, tente novamente!"
    );
  });

  it("It should not login when not valid e-mail", () => {
    cy.login("papitocyskills@com.br", "showtime");
    cy.noticeHaveText(
      "E-mail ou senha incorretos. Por favor, tente novamente!"
    );
  });

  it("It should not login when empty e-mail and password", () => {
    cy.get('[data-cy="login-button"]').click();
    cy.noticeHaveText("Parece que você esqueceu de informar seu e-mail.");
  });

  it("It should not login when wrong e-mail format", () => {
    cy.login("www.papitocyskills.com.br", "showtime");
    cy.noticeHaveText(
      "O formato do e-mail está incorreto. Por favor, verifique e tente novamente!"
    );
  });
});
