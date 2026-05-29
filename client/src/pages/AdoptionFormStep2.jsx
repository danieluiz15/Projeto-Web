import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdoptionFormStep2() {
  return (
    <>
      <Navbar />
      <main className="page-content form-page">
        <h2 className="text">Explique por que você deseja adotar um animal:</h2>
        <textarea
          id="motivo-adocao"
          name="motivo-adocao"
          placeholder="Escreva aqui sua resposta..."
          rows="6"
        ></textarea>

        <Link to="/adocao/finalizado" className="but link-botao mt-3">
          Enviar
        </Link>
      </main>
    </>
  );
}
