/// <reference types="cypress" />

describe('Validação da Página Inicial', () => {
  beforeEach( function (){
    cy.visit('/')
  })

  it ('Verificar titulo do site', () =>{
    cy.title().should('be.equal', 'BMW é na Dealer BMW (Desafio QA)')
  })
  
  it('Garantir que todos os elementos estão visiveis', () =>{
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
    cy.get('.slide__image').should('be.visible'); 
    cy.get('.section-component').should('be.visible'); 
    cy.get('a[href="/dealer-bmw-desafio/novos/z4-2022"]').should('have.length.greaterThan', 0);
  })




})