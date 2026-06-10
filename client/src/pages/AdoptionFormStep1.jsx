import Navbar from "../components/Navbar";
import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const formularioInicial = {
  nome: "",
  sobrenome: "",
  endereco: "",
  endereco2: "",
  cidade: "",
  estado: "",
  cep: ""
}

export default function AdoptionFormStep1() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(formularioInicial);
  const petID = useLocation().state;

  function validateForm(){
    if(!formulario.nome.trim()){
        return "Informe um nome válido"
    } else if(!formulario.sobrenome.trim()){
        return "Informe um sobrenome válido"
    } else if(!formulario.endereco.trim()){
        return "Informe um endereço válido"
    } else if(!formulario.cidade.trim()){
        return "Informe uma cidade válida"
    } else if(!formulario.estado.trim()){
        return "Informe um estado válido"
    } else if(!formulario.cep.trim()){
        return "Informe um CEP válido"
    }
    return "";

  }

  function handleChangeValues(value){
    setFormulario(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }));
  }

  function handleClickButton(event){
    event.preventDefault();
    const message = validateForm();

    if (message){
      alert(message);
      return;
    }

    navigate("/adocao/form2", { state: { solicitante: formulario, pet: petID } });
  }

  return (
    <>
      <Navbar />
      <main className="page-content form-page">
        <h2>Queremos saber mais sobre você</h2>

        <form id="formularioAdocao1" onSubmit={handleClickButton}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputNome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="inputNome"
                name="nome"
                value={formulario.nome}
                placeholder="Nome"
                onChange={handleChangeValues}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputSobrenome">Sobrenome</label>
              <input
                type="text"
                className="form-control"
                id="inputSobrenome"
                name="sobrenome"
                value={formulario.sobrenome}
                placeholder="Sobrenome"
                onChange={handleChangeValues}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Endereço</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              name="endereco"
              value={formulario.endereco}
              placeholder="Rua dos Bobos, nº 0"
              onChange={handleChangeValues}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress2">Endereço 2</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              name="endereco2"
              value={formulario.endereco2}
              placeholder="Apartamento, casa, etc."
              onChange={handleChangeValues}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                name="cidade"
                value={formulario.cidade}
                onChange={handleChangeValues}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputEstado">Estado</label>
              <select
                id="inputEstado"
                name="estado"
                className="form-control"
                value={formulario.estado}
                onChange={handleChangeValues}
                required
              >
                <option value="" disabled>Escolher...</option>
                <option>DF</option>
                <option>SP</option>
                <option>MG</option>
                <option>RJ</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputCEP">CEP</label>
              <input
                type="text"
                className="form-control"
                id="inputCEP"
                name="cep"
                value={formulario.cep}
                onChange={handleChangeValues}
                required
              />
            </div>
          </div>

          <button type="submit" className="but link-botao">
            Confirmar
          </button>
        </form>
      </main>
    </>
  );
}
