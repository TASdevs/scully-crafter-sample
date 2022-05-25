describe('Help page', () => {
  it('Renders hero', () => {
    cy.visit('/help')
    cy.contains('h1', 'help-page works!')
    cy.contains('h2', 'Please work')
    cy.contains('p', 'We might cry')
  })
})
