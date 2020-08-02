describe('Check the total displayed number of results for category Smart Home | Televisions', function() {

    it('Visit Smart Home | Televisions category', function() {
    
        cy.visit('')
        cy.wait(2000)
        cy.get('#nav-hamburger-menu').click()
        cy.wait(2000)
        cy.get('#hmenu-content > ul > li').contains('Smart Home').click()
        cy.get('.hmenu.hmenu-visible.hmenu-translateX > li').contains('Televisions').click()

    })

    it('Match total number of displayed products', function() {
        
        cy.get('#pagnNextLink').click({ force: true })
        cy.get('.a-pagination > li.a-selected').nextAll().each(() => {
            cy.get('.a-pagination > li.a-last').click()
        })
        cy.get('.sg-col-inner span[dir="auto"]').then(($val) => {
        
            const countTxt = $val.text()
            
            const count = countTxt.substr(countTxt.indexOf('of') + 3, countTxt.indexOf('results') - 9).trim()
        
            cy.wrap($val).should('contain', count + ' of ' + count)
        })
    })
})