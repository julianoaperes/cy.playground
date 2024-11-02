describe("Input Field Menu", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
  });

  it("Input Fields: They should be filled out as its attributes to complete successfully", () => {
    cy.get('nav a[href="/input-fields"]').click();
    cy.contains("h2", "Input Fields").should("be.visible");
    cy.get("#fullname").type("Juliano Peres");
    cy.get('input[type="email"]').type("juliano.a.peres@gmail.com");
    cy.get('input[type="number"]').type("1234567890");
    cy.get('input[type="date"]').type("1986-03-17");
  });
});
