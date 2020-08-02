describe('Check the selected currency displayed for the product price', function () {
	
	it('Check the selected currency', function () {
		cy.visit('')
		
		cy.get('#icp-nav-flyout').trigger('mouseover')
		cy.get('.icp-flyout-change').eq(0).click()
		cy.get('span[data-action="a-dropdown-button"]').click()
		cy.get('.a-popover-inner.a-lgtbox-vertical-scroll').contains('AED').click()
		cy.get('.a-button.a-spacing-top-mini.a-button-primary').click()
		
		cy.url().should('include', 'currency=AED')
		
		cy.get('#twotabsearchtextbox').type('shoes{enter}')
		cy.get('.a-offscreen').eq(0).should('contain', 'AED')
	})
})