describe("Login", () => {
  it("It should login successfully", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");

    cy.contains("h2", "Faça login").should("have.text", "Faça login");

    cy.get('[data-cy="email"]').type("papito@cyskills.com.br");
    cy.get('[data-cy="password"]').type("showtime");
    cy.get('[data-cy="login-button"]').click();

    cy.get('[data-cy="welcome-title"]')
      .should("be.visible")
      .should("have.text", "Boas vindas ao Cypress Playground");
  });

  it("It should not login when not valid password", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");

    cy.contains("h2", "Faça login").should("have.text", "Faça login");

    cy.get('[data-cy="email"]').type("papito@cyskills.com.br");
    cy.get('[data-cy="password"]').type("123showtime");
    cy.get('[data-cy="login-button"]').click();

    cy.get(":nth-child(2) > .text-sm")
      .should("be.visible")
      .should(
        "have.text",
        "E-mail ou senha incorretos. Por favor, tente novamente!"
      );
  });

  it("It should not login when not valid e-mail", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");

    cy.contains("h2", "Faça login").should("have.text", "Faça login");

    cy.get('[data-cy="email"]').type("abcpapito@cyskills.com.br");
    cy.get('[data-cy="password"]').type("showtime");
    cy.get('[data-cy="login-button"]').click();

    cy.get(".notice p")
      .should("be.visible")
      .should(
        "have.text",
        "E-mail ou senha incorretos. Por favor, tente novamente!"
      );
  });

  it("It should not login when empty e-mail and password", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");

    cy.contains("h2", "Faça login").should("have.text", "Faça login");

    cy.get('[data-cy="login-button"]').click();

    cy.get(".notice p")
      .should("be.visible")
      .should("have.text", "Parece que você esqueceu de informar seu e-mail.");
  });

  it("It should not login when wrong e-mail format", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://playground.cyskills.com.br/login");

    cy.contains("h2", "Faça login").should("have.text", "Faça login");

    cy.get('[data-cy="email"]').type("www.cyskills.com.br");
    cy.get('[data-cy="password"]').type("showtime");
    cy.get('[data-cy="login-button"]').click();

    cy.get(".notice p")
      .should("be.visible")
      .should(
        "have.text",
        "O formato do e-mail está incorreto. Por favor, verifique e tente novamente!"
      );
  });
});
