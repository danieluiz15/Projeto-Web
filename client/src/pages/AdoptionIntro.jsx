import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function AdoptionIntro() {
  const petID = useLocation().state;
  return (
    <>
      <Navbar />
      <main className="interesse">
        <h2>Interessado em adotar um Peludo?</h2>
        <p>
          Que alegria receber o seu interesse em adotar um dos nossos adoráveis peludinhos! Cada um deles
          espera por um novo lar, e ficamos felizes em saber que você quer proporcionar um futuro melhor
          para um animalzinho carente.
        </p>
        <p>
          Para conhecermos melhor suas intenções e garantir que a adoção seja responsável, preencha as
          informações solicitadas. Após o envio, nossa equipe entrará em contato para dar continuidade ao
          processo.
        </p>

        <div className="termo-adocao">
          <h5>Termo de Declaração para Adoção de Animais</h5>
          <p>
            Declaro assumir responsabilidade pelo bem-estar do animal, garantindo lar adequado, alimentação,
            carinho, segurança e cuidados veterinários. A adoção envolve compromisso de longo prazo.
          </p>
        </div>

        <Link className="but link-botao" to="/adocao/form1" state={petID}>
          Confirmar e preencher formulário
        </Link>
      </main>
    </>
  );
}
