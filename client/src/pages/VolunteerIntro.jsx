import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VolunteerIntro() {
  return (
    <>
      <Navbar />
      <main className="page-content voluntario-intro">
        <h1>Quer ser nosso parceiro?</h1>
        <p className="p1">
          O Cafofo dos Peludos depende da ajuda de voluntários e parceiros para resgatar, cuidar e divulgar
          animais que precisam de um lar. Você pode contribuir com tempo, divulgação, transporte, lar
          temporário ou doações.
        </p>
        <p>Agora preencha nosso formulário para fazer parte dessa rede de apoio.</p>
        <Link className="btn btn-info" to="/voluntario">
          Vem ser nosso voluntário
        </Link>
      </main>
    </>
  );
}
