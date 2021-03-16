describe('app', () => {
  it('works', () => {
    cy.visit('/').get('a').should('exist');
    cy.findAllByText(/about/i).should('have.length', 1);
    cy.findByText(/worldbooks/i).click();
  });
});
