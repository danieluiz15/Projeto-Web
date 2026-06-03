import Navbar from "../components/Navbar";
import React, {useState} from 'react';
import Axios from "axios";

const formularioInicial = {
  nome: "",
  tipo: "",
  idade: "",
  descricao: ""
};

export default function AddPet() {
  const [formulario, setFormulario] = useState(formularioInicial);

  function validateForm(){
    if(!formulario.nome.trim()){
      return "Informe o nome do pet"
    }else if(!formulario.tipo.trim()){
      return "Informe a especie do pet"
    }else if(!Number(formulario.idade) || Number(formulario.idade)<0){
      return "Informe uma idade valida para o pet"
    }else if(!formulario.descricao){
      return "Informe uma descrição para o pet"
    }
    return ""
  }

  const handleChangeValues = (value) =>{
    setFormulario(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }));
  }

  const handleClickButton = (event) => {
    event.preventDefault()
    const errorMessage = validateForm();

    if(errorMessage){
     alert(errorMessage);
     return
    }

    Axios.post("http://localhost:3001/pet_adocao",{
      nome: formulario.nome.trim(),
      tipo: formulario.tipo.trim(),
      idade: Number(formulario.idade),
      descricao: formulario.descricao.trim()
    }).then((response) => {
      console.log(response);
      setFormulario(formularioInicial);
      document.getElementById('addPetAdocao').reset();
      alert("Pet cadastrado com sucesso!");
    })
  }


  return (
    <>
      <Navbar />
      <header className="cabecalho-confirmacao">
        <h1>Adicione um Pet para Adoção</h1>
      </header>

      <main className="form-container">
        <h2>Preencha os detalhes abaixo para adicionar um pet à lista de adoção.</h2>
        <form className="pet-form" id="addPetAdocao" onSubmit={handleClickButton}>
          <label htmlFor="nome">Nome do pet</label>
          <input 
          type="text" 
          id="nome" 
          name="nome" 
          placeholder="Nome do pet" 
          required 
          onChange={handleChangeValues}/>

          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" required defaultValue="" onChange={handleChangeValues}>
            <option value="" disabled>Escolha...</option>
            <option>Cachorro</option>
            <option>Gato</option>
            <option>Outro</option>
          </select>

          <label htmlFor="idade">Idade</label>
          <input 
          type="text" 
          id="idade" 
          name="idade" 
          placeholder="Idade do pet" 
          required 
          onChange={handleChangeValues}/>

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Descreva as características do pet"
            rows="4"
            required
            onChange={handleChangeValues}
          ></textarea>

          <button type="submit">Adicionar Pet</button>
        </form>

        <p className="mt-4">
          Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a>
        </p>
      </main>
    </>
  );
}
