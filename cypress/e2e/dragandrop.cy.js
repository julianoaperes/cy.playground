describe("Validation of Task Board menu", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
    cy.goToMenuOptions("/tasks", "Task Board");
  });

  it("it should move a task/card to the follow column", () => {
    const task = "Definir requisitos do projeto";

    const dataTransfer = new DataTransfer();

    cy.get('[data-cy="1002"]').trigger("dragstart", {
      dataTransfer,
    });

    cy.contains("h4", "Done").parent().trigger("drop", {
      dataTransfer,
    });
  });
});
