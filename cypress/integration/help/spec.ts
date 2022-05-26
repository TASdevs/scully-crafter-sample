describe('Help page', () => {
  it('Renders hero', () => {
    cy.visit('/help')
    cy.contains('h1', 'help-page works!')
    cy.contains('h2', 'Getting Started With Tests')
    cy.contains('p', 'How are you?')
    cy.contains('p', 'Just runnin\' some tests')
    cy.contains('p', 'Are you having fun?')
    cy.contains('p', 'No')
  })
})
