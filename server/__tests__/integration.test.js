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
    "INSERT INTO adocao (nome, sobrenome, endereco, endereco_aux, cidade, estado, cep, petID, motivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      overrides.nome ?? "Ana",
      overrides.sobrenome ?? "Silva",
      overrides.endereco ?? "Rua A, 10",
      overrides.endereco_aux ?? "Casa",
      overrides.cidade ?? "Brasília",
      overrides.estado ?? "DF",
      overrides.cep ?? "70000-000",
      petId,
      overrides.motivo ?? "Quero adotar um pet de teste",
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
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Pet editado com sucesso" });

    const rows = await query("SELECT * FROM pet_adocao WHERE id = ?", [seed.id]);
    expect(rows[0].nome).toBe("Mimi Atualizada");
    expect(rows[0].idade).toBe(2);
  });
});