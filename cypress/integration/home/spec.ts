describe('Home page', () => {
  it('Renders expected contents', () => {
    cy.visit('/')
    cy.contains('CMS data:')
    cy.contains('TEST! OMG WOWZERS!')
    cy.get('img').should('have.attr', 'src', '/static-assets/images/FakeId.PNG');
  })
})
