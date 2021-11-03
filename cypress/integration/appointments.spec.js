describe("Appointments", () => {
  // Reset DB before testing
  beforeEach(() => {
  cy.request("GET", "/api/debug/reset");
  // Visits the root of our web server
  cy.visit("/");
  // Select the day
  cy.contains("Monday");
  });
  // Steps for Booking:
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // Enters their student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  // Steps for Editing:
  it("should edit an interview", () => {
    // Clicks the edit button for the appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller");
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  // //Steps for Canceling:
  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").first().click({ force: true });
    // Clicks the confirm button
    cy.contains("Confirm").click();
    // Sees that the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});