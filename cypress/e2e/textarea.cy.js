describe("Textare Menu Validation", () => {
  beforeEach(() => {
    cy.AccessingHomePage();
    cy.login("papito@cyskills.com.br", "showtime");
    cy.userLoginConfirmation();
  });

  it("Adding text into the text area", () => {
    cy.goToMenuOptions("/textarea", "Textarea");
    cy.get('textarea[name="message"]').type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    );
  });
});
