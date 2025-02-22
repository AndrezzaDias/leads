import { faker } from '@faker-js/faker';

describe('Teste de conversão de lead', () => {
    beforeEach(function (){
        cy.visit('/');
    });

    it('Acessar um veículo e enviar um lead', () => {
        // Gerar dados aleatórios para o lead
        const nomeAleatorio = faker.person.firstName();
        const fakeEmail = faker.internet.email();
        const randomNumber = String(Math.floor(Math.random() * 1000000000)).padStart(11, '0');
        
        function gerarCPF() {
            const randomNum = () => Math.floor(Math.random() * 10);
            return `${randomNum()}${randomNum()}${randomNum()}.${randomNum()}${randomNum()}${randomNum()}.${randomNum()}${randomNum()}${randomNum()}-${randomNum()}${randomNum()}`
        }
        
        const cpfAleatorio = gerarCPF()
        
        // Interceptar a requisição antes de enviá-la
        cy.intercept('POST', 'https://api.autoboxoffice.app/v1/').as('leadRequest');
        
        // Navegar para a página do veículo
        cy.get('a[href="/dealer-bmw-desafio/novos/z4-2022"]').first().click();
        cy.url().should('include', '/novos/z4-2022');
        cy.wait(1000)
        cy.get('h1').should('be.visible')
        cy.get('form').should('be.visible')

        // Tentativa de pegar o elemento random
        cy.get(':nth-child(1) > :nth-child(1) > .choices > .choices__inner > .choices__list')
        .should('be.visible')  // Verifica se a lista está visível
        .click();  // Clica na lista para abrir as opções

        // Dentro da lista, encontra todos os itens e escolhe um aleatoriamente
        cy.get(':nth-child(1) > :nth-child(1) > .choices > .choices__inner > .choices__list')
        .find('.choices__item')  // Encontra todos os itens na lista
        .each(($item, index, $list) => {
            cy.log(`Item ${index + 1}: ${$item.text()}`);  // Log para visualizar o conteúdo dos itens
        })
        .then(($opcoes) => {
            // Gera um índice aleatório entre os itens
            const randomIndex = Math.floor(Math.random() * $opcoes.length);
            cy.wrap($opcoes[randomIndex]).click();  // Clica no item aleatório
        })
        // finaliza


        cy.get('input[placeholder="Nome"]').type(nomeAleatorio);
        cy.get('input[placeholder="E-mail"]').type(fakeEmail);
        cy.get('input[placeholder="Telefone/Whatsapp"]').type(randomNumber);
        //cy.get('input[name="cpf"]').first().type(cpfAleatorio);
        
        
        cy.get(':nth-child(6) > :nth-child(2) > .choices > .choices__inner > .choices__list').click();
        cy.get('div[data-value="escritorio-autoforce-natal"]').first().click();
        cy.wait(1000);
        cy.get('input[type="checkbox"]').check({ force: true }); 
        

        // Enviar o formulário
        cy.get('.form-conversion__body > .btn').click();

        


        cy.wait(1000)
        cy.wait(1000)


        // Aguardar a requisição e validar o status
        cy.wait('@leadRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200) // Verifica se a resposta foi bem-sucedida (status 200)
            cy.log('Lead enviado com sucesso!') // Log para confirmar o sucesso
        })
        
       
        
    })
})