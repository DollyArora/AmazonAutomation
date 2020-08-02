/// <reference types='Cypress' />

const faker = require('faker')


describe('Check your gift card balance is 0.00', function() {

	const password = faker.internet.password()
	
    it('Register to Amazon account', function() {
		
		cy.visit('')
		cy.get('#nav-link-accountList').trigger('mouseover')
		cy.get('#nav-flyout-ya-newCust a').click()
		cy.url().should('include', '/ap/register')

        cy.get('input[type="text"]').type('Jane Joe')
        cy.get('input[type="email"]').type(Cypress.env('email'))
		cy.get('#ap_password').type(password)
		cy.get('#ap_password_check').type(password)
		cy.get('input[type="submit"]').click()
	

	}) 

	it('Extract OTP from email and verify the account', function() {
		// wait for an email in the inbox
		cy.mailosaurGetMessage(Cypress.env('serverId'), {
					sentTo: Cypress.env('email')
				}).then(email => {
					expect(email.subject).to.equal('Verify your new Amazon account')
					email = new DOMParser().parseFromString(email.html.body, 'text/html')
					cy.get('input[type="text"]').type(email.getElementsByClassName('otp')[0].innerText)
								
					cy.get('#a-autoid-0 input[type="submit"]').click()
		
				})
	})

	it('checks the gift card balance', function() {
        cy.get('#nav-link-accountList').trigger('mouseover')
        cy.get('.nav-link.nav-item').contains('Your Account').click()
        cy.url().should('include', 'gp/css/homepage')
        cy.get('.ya-card__whole-card-link').contains('Gift').click()
       
        cy.url().then(($el) => {
            if($el.includes('signin')){
                cy.get('input[name="email"]').each(($el) => {
                if($el[0].value != Cypress.env('email')){
                cy.get('input[type="email"]').type(Cypress.env('email'))
                }
            })
               
                cy.get('#ap_password').type(password)
                cy.get('input[type="submit"]').click()
            }
        })
       
       cy.url().then(($el)=> {
            if ($el.includes('signin')){
                cy.get('#ap-account-fixup-phone-skip-link').click()
            }
        })
       
        cy.get('#gc-ui-balance-gc-balance-value').should('contain', '0.00')
    })
})