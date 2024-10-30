describe("Login", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");
    cy.contains("h2", "Faça login").should("have.text", "Faça login");
  });

  it("It should login successfully", () => {
    cy.login("papito@cyskills.com.br", "showtime");
    cy.get('[data-cy="welcome-title"]')
      .should("be.visible")
      .and("have.text", "Boas vindas ao Cypress Playground");
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

Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="login-button"]').click();
});

Cypress.Commands.add("noticeHaveText", (text) => {
  cy.get(".notice p").should("be.visible").and("have.text", text);
});
