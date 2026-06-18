function fazerLogin() {
  cy.visit("http://localhost:3000/login");

  cy.get('input[type="email"]', { timeout: 10000 })
    .should("be.visible")
    .type("aluno@web.com");

  cy.get('input[type="password"]', { timeout: 10000 })
    .should("be.visible")
    .type("123456");

  cy.contains("button", "Entrar").click();

  cy.contains("Olá, aluno@web.com", { timeout: 10000 }).should("be.visible");
}

// describe("Teste de sistema - Login", () => {
//   it("Deve realizar login com usuário demo", () => {
//     cy.visit("http://localhost:3000/login");

//     cy.get('input[type="email"]', { timeout: 10000 })
//       .should("be.visible")
//       .type("aluno@web.com");

//     cy.get('input[type="password"]', { timeout: 10000 })
//       .should("be.visible")
//       .type("123456");

//     cy.contains("button", "Entrar").click();

//     cy.contains("Olá, aluno@web.com", { timeout: 10000 }).should("be.visible");
//     cy.contains("Sair").should("be.visible");
//   });
// });

// describe("Teste de sistema - Cadastro de Pet", () => {
//   function abrirAreaLogada() {
//     cy.contains("Área logada", { timeout: 10000 })
//       .should("be.visible")
//       .click();

//     cy.contains("Gerenciamento de Pets", { timeout: 10000 }).should(
//       "be.visible"
//     );
//   }

//   function preencherCamposPet(nome, especie, raca, idade) {
//     cy.get("input:visible", { timeout: 10000 }).should(
//       "have.length.at.least",
//       4
//     );

//     cy.get("input:visible").eq(0).type(nome);
//     cy.get("input:visible").eq(1).type(especie);
//     cy.get("input:visible").eq(2).type(raca);
//     cy.get("input:visible").eq(3).type(idade);
//   }

//   it("Deve acessar a área logada com o CRUD de pets", () => {
//     fazerLogin();
//     abrirAreaLogada();

//     cy.contains("Bem-vindo, aluno@web.com!").should("be.visible");
//     cy.contains("Gerenciamento de Pets").should("be.visible");
//     cy.contains("Cadastrar pet").should("be.visible");
//   });

//   it("Deve cadastrar um pet pela interface", () => {
//     fazerLogin();
//     abrirAreaLogada();

//     preencherCamposPet("Bolinha", "Cachorro", "Vira-lata", "2");

//     cy.contains("button", "Cadastrar pet").should("be.visible").click();

//     cy.contains("Bolinha", { timeout: 10000 }).should("be.visible");
//     cy.contains("Cachorro").should("be.visible");
//     cy.contains("Vira-lata").should("be.visible");
//     cy.contains("2").should("be.visible");
//   });

//   it("Deve exibir a listagem de pets cadastrados", () => {
//     fazerLogin();
//     abrirAreaLogada();

//     cy.contains("Nome").should("be.visible");
//     cy.contains("Espécie").should("be.visible");
//     cy.contains("Raça").should("be.visible");
//     cy.contains("Idade").should("be.visible");
//     cy.contains("Ações").should("be.visible");

//     cy.contains("Editar").should("be.visible");
//     cy.contains("Excluir").should("be.visible");
//   });

//   it("Deve excluir um pet pela interface", () => {
//     fazerLogin();
//     abrirAreaLogada();

//     cy.contains("tr", "Luna").contains("Excluir").click();

//     cy.contains("Luna").should("not.exist");
//   });
// });

describe("Teste de sistema - CRUD de pet para adoção", () => {
  function abrirAreaPetAdocao(){
    cy.contains("Institucional", {})
      .should("be.visible")
      .click();
    
      cy.contains("Adicionar pet", {})
        .should("be.visible")
        .click();

    cy.contains("Adicione um Pet para Adoção", {})
      .should("be.visible");
  }

  beforeEach(() => {
    fazerLogin();
    abrirAreaPetAdocao();
  });

  it('Deve cadastrar um pet pela interface', () => {
    cy.get('#nome').type('Bella');
    cy.get('#tipo').select("Gato");
    cy.get('#idade').type("4.00");
    cy.get('#descricao').type("Gata independente, gosta de ficar em lugares altos e observar o ambiente.");
    cy.get('#imagem').select("Will.png");

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Pet cadastrado com sucesso!')
    });

    cy.contains("button", "Adicionar Pet")
      .should("be.visible")
      .click();

    cy.intercept("POST", "/pet_adocao").as("addPet");
    cy.contains("button", "Adicionar Pet").click();
    cy.wait("@addPet").its("response.statusCode").should("eq", 201);

    cy.visit("http://localhost:3000/pets");
    cy.contains("Bella").should("be.visible");
  });

  it('Não deve cadastrar um pet sem informações', ()=>{
    cy.contains("button", "Adicionar Pet")
      .should("be.visible")
      .click().then(()=>{
        cy.on('window:alert', (alertText) =>{
          expect(alertText).to.contains('Informe o nome do pet');
        });
      });
  });

  it('Não deve aceitar dados inválidos', () => {
    cy.get('#nome').type('Bella');
    cy.get('#tipo').select("Gato");
    cy.get('#idade').type("vinte");
    cy.get('#descricao').type("Gata independente, gosta de ficar em lugares altos e observar o ambiente.");
    cy.get('#imagem').select("Will.png");

    cy.contains("button", "Adicionar Pet")
      .should("be.visible")
      .click().then(()=>{
        cy.on('window:alert', (alertText) =>{
          expect(alertText).to.contains('Informe uma idade valida para o pet');
        });
      });
    });
  

  it('Deve exibir os pets cadastrados', () => {
    cy.contains("Quero adotar")
      .should("be.visible")
      .click();
    
    cy.contains('Bella');
  });

  it('Deve preparar para a edição de um pet', ()=>{
    cy.contains("Quero adotar")
      .should("be.visible")
      .click();
    
    cy.contains("Bella")
      .parent()
      .contains("Editar pet")
      .click();

    cy.get('#editNome')
      .should('have.value', 'Bella');

    cy.get("#editIdade")
      .should('have.value', "4.00");

    cy.get("#editTipo")
      .should('have.value', "Gato");

    cy.get("#editDescricao")
      .should('have.value', "Gata independente, gosta de ficar em lugares altos e observar o ambiente.");

    cy.contains("Salvar");
  });

  it("Deve atualizar um pet pela interface", () => {
    cy.contains("Quero adotar")
      .should("be.visible")
      .click();
    
    cy.contains("Bella")
      .parent()
      .contains("Editar pet")
      .click();

    cy.get("#editIdade").clear().type("3.50");
    cy.get("#editDescricao").clear().type("Gata carinhosa, adaptada a ambientes internos e acostumada com crianças.");

    cy.contains("Salvar")
      .should("be.visible")
      .click();
      
    cy.on('window.alert', (alertText)=>{
      expect.alertText.to.contains('Pet atualizado com sucesso!');
    })

    cy.get("section")
      .should('contain', "3.50")
      .and('contain', 'Gata carinhosa, adaptada a ambientes internos e acostumada com crianças.')
  });

  it("Deve excluir um pet pela interface", ()=>{
    cy.contains("Quero adotar")
    .should("be.visible")
    .click();
    
    cy.on("window:confirm", ()=>true);
    cy.contains('Bella')
      .parent()
      .contains('Excluir pet')
      .click();

    cy.on('window.alert', (alertText)=>{
      expect.alertText.to.contains('Pet excluido com sucesso');
    });

    cy.get("section")
      .should('not.contain', "Bella");
  });
});

describe("Teste de sistema - CRUD de pedidos de adoção", ()=>{
  function AbrirPedidoAdocao(){
    cy.contains("Quero adotar", {})
      .should("be.visible")
      .click();

    cy.contains("Rex")
      .parent()
      .contains("Quero adotar")
      .click();

    cy.contains("Confirmar e preencher formulário")
      .should('be.visible')
      .click();
  }

  beforeEach(()=>{
    fazerLogin();
  });

  it("Deve cadastrar um pedido pela interface", ()=>{
    AbrirPedidoAdocao();

    cy.get("#inputNome").type("Lucas");
    cy.get("#inputSobrenome").type("Almeida");
    cy.get("#inputAddress").type("Rua Azul, 321");
    cy.get("#inputAddress2").type("Apto 202");
    cy.get("#inputCity").type("Brasília");
    cy.get("#inputEstado").select("DF");
    cy.get("#inputCEP").type("72000-000");

    cy.contains("Confirmar")
      .should('be.visible')
      .click();

    cy.get("#motivo").type("Quero um animal para companhia no dia a dia.");

    cy.contains("Enviar")
      .should('be.visible')
      .click();

    cy.contains("h2", "Seu pedido de adoção foi realizado com sucesso!");
  });

  it("Não deve cadastrar um pedido sem dados pela interface", ()=>{
    AbrirPedidoAdocao();
    cy.contains("Confirmar")
      .should('be.visible')
      .click();

    cy.on('window.alert', (alertText)=>{
      expect.alertText.to.contains('Informe um nome válido');
    });
  });

  it("Deve Listar os pedidos de adoção", ()=>{
    cy.contains("Institucional")
      .should("be.visible")
      .click();
    
    cy.contains("Pedidos de Adoção")
      .should("be.visible")
      .click();

    cy.contains("h2", "Pedidos de Adoção")
      .should("be.visible");
    
    cy.contains("Lucas");
  })

  it("Deve preparar para a edição de um pedido", ()=>{
    cy.contains("Institucional")
      .should("be.visible")
      .click();
    
    cy.contains("Pedidos de Adoção")
      .should("be.visible")
      .click();

    cy.contains("Lucas")
      .parent()
      .parent()
      .contains("Editar solicitante")
      .click();

    cy.get('#editNomeP')
    .should("have.value", "Lucas");

    cy.get('#editSobrenomeP')
    .should("have.value", "Almeida");

    cy.get('#editEnderecoP')
    .should("have.value", "Rua Azul, 321");

    cy.get('#editEndereco2P')
    .should("have.value", "Apto 202");

    cy.get('#editCidadeP')
      .should("have.value", "Brasília");

    cy.get('#editEstadoP')
      .should("have.value", "DF");

    cy.get('#editCepP')
      .should("have.value", "72000-000");

    cy.contains("Salvar alterações")
      .should("be.visible");
  });

  it("Deve atualizar um pedido pela interface", ()=>{
    cy.contains("Institucional")
      .should("be.visible")
      .click();
    
    cy.contains("Pedidos de Adoção")
      .should("be.visible")
      .click();

    cy.contains("Lucas")
      .parent()
      .parent()
      .contains("Editar solicitante")
      .click();

    cy.get("#editEnderecoP").clear().type("Rua Nova Esperança, 987");
    cy.get("#editEndereco2P").clear().type("Casa");

    cy.contains("Salvar alterações")
      .should("be.visible")
      .click();
    
    cy.on('window.alert', (alertText)=>{
      expect.alertText.to.contains('Pedido de adoção editado com sucesso');
    });
  });

  it("Deve excluir um pedido de adoção pela interface", ()=>{
    cy.contains("Institucional")
      .should("be.visible")
      .click();
    
    cy.contains("Pedidos de Adoção")
      .should("be.visible")
      .click();

    cy.on("window:confirm", ()=> true);
    cy.contains("Lucas")
      .parent()
      .parent()
      .contains("Excluir")
      .click();

    cy.on('window.alert', (alertText)=>{
      expect.alertText.to.contains('Pedido excluido com sucesso');
    }).then(()=>{
      cy.contains("Lucas").should('not.exist');
    });
  });
});
