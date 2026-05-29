import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import fim from "../assets/img/fim.jpg";

export default function AdoptionSuccess() {
  return (
    <>
      <Navbar />
      <header className="cabecalho-confirmacao">
        <h1>Pedido de Adoção Confirmado</h1>
      </header>

      <main className="conteudo">
        <img src={fim} alt="Adoção confirmada" className="imagem-confirmacao" />
        <h2>Seu pedido de adoção foi realizado com sucesso!</h2>
        <p>
          Ficamos felizes que você tenha decidido adotar um pet. Nossa equipe entrará em contato com você
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
