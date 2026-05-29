import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="page-content texto-centro">
        <h1>Página não encontrada</h1>
        <p>Verifique o endereço ou volte para a página inicial.</p>
        <Link className="btn btn-info" to="/">
          Voltar ao início
        </Link>
      </main>
    </>
  );
}
