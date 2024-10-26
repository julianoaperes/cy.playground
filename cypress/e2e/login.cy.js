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
});
