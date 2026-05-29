import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import joia from "../assets/img/joia2.jpg";

export default function VolunteerSuccess() {
  return (
    <>
      <Navbar />
      <header className="cabecalho-confirmacao">
        <h1>Inscrição Confirmada</h1>
      </header>

      <main className="conteudo">
        <img src={joia} alt="Inscrição confirmada" className="imagem-confirmacao" />
        <h2>Sua inscrição foi realizada com sucesso!</h2>
        <p>
          Ficamos felizes que você tenha decidido ser voluntário. Nossa equipe entrará em contato com você
          em breve para os próximos passos.
        </p>
        <p>Enquanto isso, se tiver dúvidas ou precisar de mais informações, não hesite em nos contatar.</p>
        <Link to="/" className="btn btn-info">
          Voltar para início
        </Link>
      </main>
    </>
  );
}
