require('dotenv').config();
const mysql = require('mysql2');

const {
    DB_HOST = "127.0.0.1",
    DB_USER = "root",
    DB_PORT = 3306,
    DB_PASSWORD = process.env.SENHA_DB,
    DB_NAME = "pet"
} = process.env;

function createMemoryDatabase() {
    const state = {
        verificacaoChaveEstrangeira: true,
        pet_adocao: [],
        adocao: [],
        sequencias: {
            pet_adocao: 1,
            adocao: 1,
        },
    };

    function clonarLinhas(linhas) {
        return linhas.map((linha) => ({ ...linha }));
    }

    function montarResultado(resultado) {
        return resultado;
    }

    function nomeDaTabelaDaConsulta(sql) {
        if (sql.includes("pet_adocao")) {
            return "pet_adocao";
        }

        if (sql.includes("adocao")) {
            return "adocao";
        }

        return null;
    }

    return {
        query(sql, parametros, callback) {
            const sqlNormalizado = String(sql).trim().toLowerCase();
            const funcaoRetorno = typeof parametros === "function" ? parametros : callback;
            const parametrosConsulta = Array.isArray(parametros) ? parametros : [];

            try {
                if (sqlNormalizado.startsWith("set foreign_key_checks = 0")) {
                    state.verificacaoChaveEstrangeira = false;
                    funcaoRetorno(null, { affectedRows: 0 });
                    return;
                }

                if (sqlNormalizado.startsWith("set foreign_key_checks = 1")) {
                    state.verificacaoChaveEstrangeira = true;
                    funcaoRetorno(null, { affectedRows: 0 });
                    return;
                }

                if (sqlNormalizado.startsWith("truncate table")) {
                    const tabela = nomeDaTabelaDaConsulta(sqlNormalizado);
                    if (!tabela) {
                        throw new Error(`Unsupported query: ${sql}`);
                    }

                    state[tabela] = [];
                    state.sequencias[tabela] = 1;
                    funcaoRetorno(null, { affectedRows: 0 });
                    return;
                }

                if (sqlNormalizado.startsWith("select * from pet_adocao where id = ?")) {
                    const [id] = parametrosConsulta;
                    const linhas = state.pet_adocao.filter((linha) => linha.id === Number(id));
                    funcaoRetorno(null, clonarLinhas(linhas));
                    return;
                }

                if (sqlNormalizado.startsWith("select * from pet_adocao where nome = ?")) {
                    const [nome] = parametrosConsulta;
                    const linhas = state.pet_adocao.filter((linha) => linha.nome === nome);
                    funcaoRetorno(null, clonarLinhas(linhas));
                    return;
                }

                if (sqlNormalizado.startsWith("select * from pet_adocao")) {
                    funcaoRetorno(null, clonarLinhas(state.pet_adocao));
                    return;
                }

                if (sqlNormalizado.startsWith("insert into pet_adocao")) {
                    const [nome, tipo, idade, descricao, imagem] = parametrosConsulta;
                    const linha = {
                        id: state.sequencias.pet_adocao++,
                        nome,
                        tipo,
                        idade,
                        descricao,
                        imagem,
                    };

                    state.pet_adocao.push(linha);
                    funcaoRetorno(null, montarResultado({ insertId: linha.id, affectedRows: 1 }));
                    return;
                }

                if (sqlNormalizado.startsWith("update pet_adocao")) {
                    const [nome, tipo, idade, descricao, imagem, id] = parametrosConsulta;
                    const linha = state.pet_adocao.find((item) => item.id === Number(id));

                    if (!linha) {
                        funcaoRetorno(null, { affectedRows: 0 });
                        return;
                    }

                    linha.nome = nome;
                    linha.tipo = tipo;
                    linha.idade = idade;
                    linha.descricao = descricao;
                    linha.imagem = imagem;
                    funcaoRetorno(null, { affectedRows: 1 });
                    return;
                }

                if (sqlNormalizado.startsWith("delete from pet_adocao")) {
                    const [id] = parametrosConsulta;
                    const indice = state.pet_adocao.findIndex((item) => item.id === Number(id));

                    if (indice === -1) {
                        funcaoRetorno(null, { affectedRows: 0 });
                        return;
                    }

                    state.pet_adocao.splice(indice, 1);
                    funcaoRetorno(null, { affectedRows: 1 });
                    return;
                }

                if (sqlNormalizado.startsWith("select * from adocao where id = ?")) {
                    const [id] = parametrosConsulta;
                    const linhas = state.adocao.filter((linha) => linha.id === Number(id));
                    funcaoRetorno(null, clonarLinhas(linhas));
                    return;
                }

                if (sqlNormalizado.startsWith("select * from adocao where nome = ?")) {
                    const [nome] = parametrosConsulta;
                    const linhas = state.adocao.filter((linha) => linha.nome === nome);
                    funcaoRetorno(null, clonarLinhas(linhas));
                    return;
                }

                if (sqlNormalizado.startsWith("select * from adocao")) {
                    funcaoRetorno(null, clonarLinhas(state.adocao));
                    return;
                }

                if (sqlNormalizado.startsWith("insert into adocao")) {
                    const [nome, sobrenome, endereco, enderecoAux, cidade, estado, cep, motivo, petID] = parametrosConsulta;

                    if (state.verificacaoChaveEstrangeira && !state.pet_adocao.some((pet) => pet.id === Number(petID))) {
                        throw new Error("Cannot add or update a child row: a foreign key constraint fails");
                    }

                    const linha = {
                        id: state.sequencias.adocao++,
                        nome,
                        sobrenome,
                        endereco,
                        endereco_aux: enderecoAux,
                        cidade,
                        estado,
                        cep,
                        motivo,
                        petID: Number(petID),
                    };

                    state.adocao.push(linha);
                    funcaoRetorno(null, montarResultado({ insertId: linha.id, affectedRows: 1 }));
                    return;
                }

                if (sqlNormalizado.startsWith("update adocao")) {
                    const [nome, sobrenome, endereco, enderecoAux, cidade, estado, cep, id] = parametrosConsulta;
                    const linha = state.adocao.find((item) => item.id === Number(id));

                    if (!linha) {
                        funcaoRetorno(null, { affectedRows: 0 });
                        return;
                    }

                    linha.nome = nome;
                    linha.sobrenome = sobrenome;
                    linha.endereco = endereco;
                    linha.endereco_aux = enderecoAux;
                    linha.cidade = cidade;
                    linha.estado = estado;
                    linha.cep = cep;
                    funcaoRetorno(null, { affectedRows: 1 });
                    return;
                }

                if (sqlNormalizado.startsWith("delete from adocao")) {
                    const [id] = parametrosConsulta;
                    const indice = state.adocao.findIndex((item) => item.id === Number(id));

                    if (indice === -1) {
                        funcaoRetorno(null, { affectedRows: 0 });
                        return;
                    }

                    state.adocao.splice(indice, 1);
                    funcaoRetorno(null, { affectedRows: 1 });
                    return;
                }

                if (sqlNormalizado.startsWith("select count(*) as count from adocao where petid = ?")) {
                    const [petID] = parametrosConsulta;
                    const linhas = state.adocao.filter((linha) => linha.petID === Number(petID));
                    funcaoRetorno(null, [{ count: linhas.length }]);
                    return;
                }

                throw new Error(`Unsupported query: ${sql}`);
            } catch (error) {
                funcaoRetorno(error);
            }
        },
        end(funcao) {
            if (funcao) {
                funcao(null);
            }
        },
    };
}

const db = process.env.DB_ADAPTER === "memory"
    ? createMemoryDatabase()
    : mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        port: Number(DB_PORT),
        password: DB_PASSWORD,
        database: DB_NAME
    });

module.exports = db;
