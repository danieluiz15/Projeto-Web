process.env.NODE_ENV = "test";
process.env.DB_ADAPTER = process.env.DB_ADAPTER || "memory";
process.env.DB_NAME = process.env.DB_NAME || "pet_test";

const request = require("supertest");
const app = require("../index");
const db = require("../database");

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

async function resetTables() {
  await query("SET FOREIGN_KEY_CHECKS = 0");
  await query("TRUNCATE TABLE adocao");
  await query("TRUNCATE TABLE pet_adocao");
  await query("SET FOREIGN_KEY_CHECKS = 1");
}

async function seedPet(overrides = {}) {
  const result = await query(
    "INSERT INTO pet_adocao (nome, tipo, idade, descricao) VALUES (?, ?, ?, ?)",
    [
      overrides.nome ?? "Rex",
      overrides.tipo ?? "Cachorro",
      overrides.idade ?? 3.5,
      overrides.descricao ?? "Pet de teste para integração",
    ]
  );

  const rows = await query(
    "SELECT * FROM pet_adocao WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
}

async function seedAdocao(petId, overrides = {}) {
  const result = await query(
    "INSERT INTO adocao (nome, sobrenome, endereco, endereco_aux, cidade, estado, cep, motivo, petID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [
    overrides.nome ?? "Ana",
    overrides.sobrenome ?? "Silva",
    overrides.endereco ?? "Rua A, 10",
    overrides.endereco_aux ?? "Casa",
    overrides.cidade ?? "Brasília",
    overrides.estado ?? "DF",
    overrides.cep ?? "70000-000",
    overrides.motivo ?? "Quero adotar um pet de teste",
    petId,
  ]

  );

  const rows = await query(
    "SELECT * FROM adocao WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
}

describe("Integração da API com MySQL", () => {
  beforeAll(async () => {
    await resetTables();
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      db.end((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  });

  test("GET /pet_adocao retorna lista vazia quando não há pets", async () => {
    await resetTables();

    const response = await request(app).get("/pet_adocao");

    expect(response.status).toBe(201);
    expect(response.body).toEqual([]);
  });

  test("POST /pet_adocao cria um pet e persiste no banco", async () => {
    await resetTables();

    const payload = {
      nome: "Luna",
      tipo: "Gato",
      idade: 2,
      descricao: "Gata tranquila e sociável",
      imagem: "Will.png",
    };

    const response = await request(app)
      .post("/pet_adocao")
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Pet adicionado com sucesso" });

    const rows = await query("SELECT * FROM pet_adocao WHERE nome = ?", [payload.nome]);
    expect(rows).toHaveLength(1);
    expect(rows[0].tipo).toBe(payload.tipo);
  });

  test("PUT /pet_adocao/:id atualiza um pet existente", async () => {
    await resetTables();
    const seed = await seedPet({ nome: "Mimi", tipo: "Gato", idade: 1 });

    const response = await request(app)
      .put(`/pet_adocao/${seed.id}`)
      .send({
        nome: "Mimi Atualizada",
        tipo: "Gato",
        idade: 2,
        descricao: "Descrição atualizada",
        imagem: "Mel.png",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Pet editado com sucesso" });

    const rows = await query("SELECT * FROM pet_adocao WHERE id = ?", [seed.id]);
    expect(rows[0].nome).toBe("Mimi Atualizada");
    expect(rows[0].idade).toBe(2);
  });
  test("GET /pet_adocao retorna pets cadastrados no banco", async () => {
  await resetTables();
  const pet = await seedPet({
    nome: "Bolinha",
    tipo: "Cachorro",
    idade: 4,
    descricao: "Pet cadastrado para teste de busca",
  });

  const response = await request(app).get("/pet_adocao");

  expect([200, 201]).toContain(response.status);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: pet.id,
        nome: "Bolinha",
        tipo: "Cachorro",
      }),
    ])
  );
});

test("GET /adocao retorna pedidos de adoção cadastrados", async () => {
  await resetTables();

  const pet = await seedPet({
    nome: "Nina",
    tipo: "Gato",
    idade: 2,
    descricao: "Pet para teste de pedido de adoção",
  });

  await request(app)
    .post("/adocao")
    .send({
      nome: "Carlos",
      sobrenome: "Oliveira",
      endereco: "Rua das Flores, 123",
      endereco2: "Apartamento 12",
      cidade: "Brasília",
      estado: "DF",
      cep: "70000-001",
      motivo: "Tenho espaço e tempo para cuidar do animal",
      petID: pet.id,
    });

  const response = await request(app).get("/adocao");

  expect([200, 201]).toContain(response.status);
  expect(Array.isArray(response.body.result)).toBe(true);
  expect(response.body.result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        nome: "Carlos",
        sobrenome: "Oliveira",
        cidade: "Brasília",
        petID: pet.id,
      }),
    ])
  );
});

test("POST /adocao cria um pedido de adoção vinculado a um pet", async () => {
  await resetTables();
  const pet = await seedPet({ nome: "Nina", tipo: "Gato" });

  const payload = {
    nome: "Carlos",
    sobrenome: "Oliveira",
    endereco: "Rua das Flores, 123",
    endereco2: "Apartamento 12",
    cidade: "Brasília",
    estado: "DF",
    cep: "70000-001",
    motivo: "Tenho espaço e tempo para cuidar do animal",
    petID: pet.id,
  };

  const response = await request(app)
    .post("/adocao")
    .send(payload);

  expect([200, 201]).toContain(response.status);

  const rows = await query("SELECT * FROM adocao WHERE petID = ?", [pet.id]);
  expect(rows).toHaveLength(1);
  expect(rows[0].nome).toBe(payload.nome);
  expect(rows[0].sobrenome).toBe(payload.sobrenome);
  expect(rows[0].cidade).toBe(payload.cidade);
  expect(rows[0].motivo).toBe(payload.motivo);
});

test("PUT /adocao/:id atualiza os dados de um pedido de adoção", async () => {
  await resetTables();

  const pet = await seedPet({
    nome: "Thor",
    tipo: "Cachorro",
    idade: 3,
    descricao: "Pet para teste de edição de adoção",
  });

  await request(app)
    .post("/adocao")
    .send({
      nome: "Mariana",
      sobrenome: "Silva",
      endereco: "Rua A, 10",
      endereco2: "Casa",
      cidade: "Brasília",
      estado: "DF",
      cep: "70000-000",
      motivo: "Quero adotar com responsabilidade",
      petID: pet.id,
    });

  const pedidos = await query("SELECT * FROM adocao WHERE petID = ?", [pet.id]);
  const pedido = pedidos[0];

  const response = await request(app)
    .put(`/adocao/${pedido.id}`)
    .send({
      nome: "Mariana Atualizada",
      sobrenome: "Souza",
      endereco: "Rua B, 20",
      endereco2: "Casa 2",
      cidade: "Taguatinga",
      estado: "DF",
      cep: "72100-000",
    });

  expect([200, 201]).toContain(response.status);

  const rows = await query("SELECT * FROM adocao WHERE id = ?", [pedido.id]);

  expect(rows[0].nome).toBe("Mariana Atualizada");
  expect(rows[0].sobrenome).toBe("Souza");
  expect(rows[0].cidade).toBe("Taguatinga");
  expect(rows[0].cep).toBe("72100-000");
});
test("DELETE /pet_adocao/:id remove um pet do banco", async () => {
  await resetTables();
  const pet = await seedPet({ nome: "Toby", tipo: "Cachorro" });

  const response = await request(app).delete(`/pet_adocao/${pet.id}`);

  expect([200, 201]).toContain(response.status);
  expect(response.body).toEqual({ message: "Pet excluído com sucesso" });

  const rows = await query("SELECT * FROM pet_adocao WHERE id = ?", [pet.id]);
  expect(rows).toHaveLength(0);
});

test("DELETE /adocao/:id remove um pedido de adoção", async () => {
  await resetTables();
  const pet = await seedPet({ nome: "Lola", tipo: "Gato" });

  const adocao = await seedAdocao(pet.id, {
  nome: "João",
  sobrenome: "Pereira",
  endereco: "Rua das Palmeiras, 45",
  endereco_aux: "Casa",
  cidade: "Brasília",
  estado: "DF",
  cep: "70000-002",
  motivo: "Quero cuidar bem do animal",
});

  const response = await request(app).delete(`/adocao/${adocao.id}`);

  expect([200, 201]).toContain(response.status);
  expect(response.body).toEqual({ message: "Adoção deletada com sucesso" });


  const rows = await query("SELECT * FROM adocao WHERE id = ?", [adocao.id]);
  expect(rows).toHaveLength(0);
});

});
