describe("Teste de sistema - Login e Cadastro de Pet", () => {
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

  function abrirAreaLogada() {
    cy.contains("Área logada", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Gerenciamento de Pets", { timeout: 10000 }).should(
      "be.visible"
    );
  }

  function preencherCamposPet(nome, especie, raca, idade) {
    cy.get("input:visible", { timeout: 10000 }).should("have.length.at.least", 4);

    cy.get("input:visible").eq(0).type(nome);
    cy.get("input:visible").eq(1).type(especie);
    cy.get("input:visible").eq(2).type(raca);
    cy.get("input:visible").eq(3).type(idade);
  }

  it("Deve realizar login com usuário demo", () => {
    fazerLogin();

    cy.contains("Olá, aluno@web.com").should("be.visible");
    cy.contains("Sair").should("be.visible");
  });

  it("Deve acessar a área logada com o CRUD de pets", () => {
    fazerLogin();
    abrirAreaLogada();

    cy.contains("Bem-vindo, aluno@web.com!").should("be.visible");
    cy.contains("Gerenciamento de Pets").should("be.visible");
    cy.contains("Cadastrar pet").should("be.visible");
  });

  it("Deve cadastrar um pet pela interface", () => {
    fazerLogin();
    abrirAreaLogada();

    preencherCamposPet("Bolinha", "Cachorro", "Vira-lata", "2");

    cy.contains("button", "Cadastrar pet")
      .should("be.visible")
      .click();

    cy.contains("Bolinha", { timeout: 10000 }).should("be.visible");
    cy.contains("Cachorro").should("be.visible");
    cy.contains("Vira-lata").should("be.visible");
    cy.contains("2").should("be.visible");
  });

  it("Deve exibir a listagem de pets cadastrados", () => {
    fazerLogin();
    abrirAreaLogada();

    cy.contains("Nome").should("be.visible");
    cy.contains("Espécie").should("be.visible");
    cy.contains("Raça").should("be.visible");
    cy.contains("Idade").should("be.visible");
    cy.contains("Ações").should("be.visible");

    cy.contains("Editar").should("be.visible");
    cy.contains("Excluir").should("be.visible");
  });

  it("Deve excluir um pet pela interface", () => {
    fazerLogin();
    abrirAreaLogada();

    cy.contains("tr", "Luna")
      .contains("Excluir")
      .click();

    cy.contains("Luna").should("not.exist");
  });
});