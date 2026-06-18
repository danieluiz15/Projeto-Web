import { useEffect, useState } from "react";
import PetItem from "../components/PetItem";

const CHAVE_PETS = "crud-pets";

const petsIniciais = [
  {
    id: 1,
    nome: "Luna",
    especie: "Cachorro",
    raca: "Vira-lata",
    idade: 3,
  },
  {
    id: 2,
    nome: "Mingau",
    especie: "Gato",
    raca: "Siamês",
    idade: 2,
  },
];

const formularioInicial = {
  nome: "",
  especie: "",
  raca: "",
  idade: "",
};

function carregarPets() {
  const petsSalvos = localStorage.getItem(CHAVE_PETS);
  return petsSalvos ? JSON.parse(petsSalvos) : petsIniciais;
}

export default function PetsCrud() {
  const [pets, setPets] = useState(() => carregarPets());
  const [formulario, setFormulario] = useState(formularioInicial);
  const [petEditandoId, setPetEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    localStorage.setItem(CHAVE_PETS, JSON.stringify(pets));
  }, [pets]);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((formularioAtual) => ({
      ...formularioAtual,
      [name]: value,
    }));
  }

  function validarFormulario() {
    if (!formulario.nome.trim()) {
      return "Informe o nome do pet.";
    }

    if (!formulario.especie.trim()) {
      return "Informe a espécie do pet.";
    }

    if (!formulario.raca.trim()) {
      return "Informe a raça do pet.";
    }

    if (!formulario.idade || Number(formulario.idade) < 0) {
      return "Informe uma idade válida.";
    }

    return "";
  }

  function limparFormulario() {
    setFormulario(formularioInicial);
    setPetEditandoId(null);
    setErro("");
  }

  function salvarPet(event) {
    event.preventDefault();

    const mensagemValidacao = validarFormulario();

    if (mensagemValidacao) {
      setErro(mensagemValidacao);
      return;
    }

    const dadosPet = {
      nome: formulario.nome.trim(),
      especie: formulario.especie.trim(),
      raca: formulario.raca.trim(),
      idade: Number(formulario.idade),
    };

    if (petEditandoId) {
      setPets((listaAtual) =>
        listaAtual.map((pet) =>
          pet.id === petEditandoId ? { ...pet, ...dadosPet } : pet
        )
      );
    } else {
      const novoPet = {
        id: Date.now(),
        ...dadosPet,
      };

      setPets((listaAtual) => [...listaAtual, novoPet]);
    }

    limparFormulario();
  }

  function editarPet(pet) {
    setPetEditandoId(pet.id);

    setFormulario({
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      idade: pet.idade,
    });

    setErro("");
  }

  function excluirPet(id) {
    const confirmou = window.confirm("Deseja excluir este pet?");

    if (!confirmou) {
      return;
    }

    setPets((listaAtual) => listaAtual.filter((pet) => pet.id !== id));

    if (petEditandoId === id) {
      limparFormulario();
    }
  }

  return (
    <section className="cartao crud-card">

      {erro ? <div className="mensagem erro mensagem-visivel">{erro}</div> : null}

      <form className="formulario-crud" onSubmit={salvarPet}>
        <div className="campo">
          <label htmlFor="nome">Nome do pet</label>
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Ex.: Thor"
            value={formulario.nome}
            onChange={alterarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="especie">Espécie</label>
          <input
            id="especie"
            name="especie"
            type="text"
            placeholder="Ex.: Cachorro"
            value={formulario.especie}
            onChange={alterarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="raca">Raça</label>
          <input
            id="raca"
            name="raca"
            type="text"
            placeholder="Ex.: Labrador"
            value={formulario.raca}
            onChange={alterarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="idade">Idade</label>
          <input
            id="idade"
            name="idade"
            type="number"
            min="0"
            placeholder="Ex.: 4"
            value={formulario.idade}
            onChange={alterarCampo}
          />
        </div>

        <div className="botoes crud-acoes">
          <button className="primario" type="submit">
            {petEditandoId ? "Salvar edição" : "Cadastrar pet"}
          </button>

          {petEditandoId ? (
            <button
              className="secundario"
              type="button"
              onClick={limparFormulario}
            >
              Cancelar edição
            </button>
          ) : null}
        </div>
      </form>

      <div className="tabela-responsiva">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Raça</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <PetItem
                  key={pet.id}
                  pet={pet}
                  onEditar={editarPet}
                  onExcluir={excluirPet}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="vazio-tabela">
                  Nenhum pet cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}