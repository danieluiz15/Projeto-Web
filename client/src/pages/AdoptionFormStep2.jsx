import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

export default function AdoptionFormStep2() {
  const dadosSolicitante = useLocation().state.solicitante;
  const petId = useLocation().state.pet;
  const [motivo, setMotivo] = useState("");
  const navigate = useNavigate();
  console.log(dadosSolicitante, petId, motivo, typeof(motivo));

  function handleChangeValues(event) {
    setMotivo(event.target.value);
  }

  function handleClickButton(event){
    event.preventDefault();
    const message = (!motivo.trim()) ? "Insira um motivo para a solicitação" : "";

    if (message){
      alert(message);
      return;
    }
    axios.post("http://localhost:3001/adocao", {
        nome: dadosSolicitante.nome.trim(),
        sobrenome: dadosSolicitante.sobrenome.trim(),
        endereco: dadosSolicitante.endereco.trim(),
        endereco2: dadosSolicitante.endereco2.trim() === '' ? null : dadosSolicitante.endereco2.trim(),
        cidade: dadosSolicitante.cidade.trim(),
        estado: dadosSolicitante.estado.trim(),
        cep: dadosSolicitante.cep.trim(),
        motivo: motivo.trim(),
        petID: Number(petId)
      }).then((response)=>{
        console.log(response);
        navigate("/adocao/finalizado");
      }).catch((error) => {
        console.error(error);
        alert("Erro ao enviar o formulário. Tente novamente.");
      });
  }


  return (
    <>
      <Navbar />
      <main className="page-content form-page">
        <form onSubmit={handleClickButton}>
          <h2 className="text">Explique por que você deseja adotar um animal:</h2>
          <textarea
            id="motivo"
            name="motivo"
            placeholder="Escreva aqui sua resposta..."
            rows="6"
            required
            onChange={handleChangeValues}
          ></textarea>

          <button type="submit" className="but link-botao mt-3">
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
