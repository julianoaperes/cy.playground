describe("Menu Select Validation", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/select", "Select");
  });

  it("Validation of 'Selecione um Framework de Testes' field", () => {
    cy.contains("label", "Selecione um Framework de Testes")
      .parent()
      .find("select")
      .select("Cypress");
  });

  it("Selecting all options one by one", () => {
    const langs = [
      "Jest",
      "Mocha",
      "Cypress",
      "Playwright",
      "Robot Framework",
      "Jasmine",
      "TestCafe",
      "Puppeteer",
      "Nightwatch",
    ];

    langs.forEach((lang) => {
      cy.contains("label", "Selecione um Framework de Testes")
        .parent()
        .find("select")
        .select(`${lang}`);
      cy.wait(500);
    });
  });

  it("Validation of 'Caixa de múltipla escolha' field", () => {
    cy.get('input[placeholder^="Linguagens de programação"]').click();
    cy.contains(".option-item", "JavaScript").click();
  });

  it("Selecting and  unselecting  all options", () => {
    const langs = [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "Java",
      "C#",
      "Ruby",
      "PHP",
      "Go",
      "Rust",
    ];

    cy.get('input[placeholder^="Linguagens de programação"]').click().parent();

    langs.forEach((lang) => {
      for (let i = 0; i < 3; i++)
        cy.contains(".option-item", `${lang}`).click();
      cy.wait(500);
    });
  });

  it.only("Avoinding false positive between 'Java' and 'JavaScript'", () => {
    /*  it.only("Validation of 'Caixa de múltipla escolha' field", () => {
      cy.get('input[placeholder^="Linguagens de programação"]').click();
      cy.contains(".option-item", "Java").click();
      The result of this code is "JavaScript"
    }); */

    const langs = ["TypeScript", "Java", "C#"];

    cy.get('input[placeholder^="Linguagens de programação"]').click().parent();

    langs.forEach((lang) => {
      cy.contains(".option-item", new RegExp("^" + lang + "$")).click();
    });
  });
});
