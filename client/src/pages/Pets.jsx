import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import alex from "../assets/img/alex.png";
import sicha from "../assets/img/sicha.png";
import mel from "../assets/img/Mel.png";
import rosa from "../assets/img/Rosa.png";
import bob from "../assets/img/bob.png";
import will from "../assets/img/Will.png";
import chavosa from "../assets/img/chavosa.png";
import leo from "../assets/img/Leo.png";
import joao from "../assets/img/Joao.png";
import marias from "../assets/img/marias.png";
import melo from "../assets/img/melo.png";
import letImg from "../assets/img/let.png";

const pets = [
  { nome: "Alex", idade: "6 meses", local: "Brasília - DF", imagem: alex },
  { nome: "Sicha", idade: "3 meses", local: "Brasília - DF", imagem: sicha },
  { nome: "Mel", idade: "8 meses", local: "Brasília - DF", imagem: mel },
  { nome: "Rosa", idade: "1 ano", local: "Brasília - DF", imagem: rosa },
  { nome: "Bob", idade: "10 meses", local: "Brasília - DF", imagem: bob },
  { nome: "Will", idade: "2 anos", local: "Brasília - DF", imagem: will },
  { nome: "Chavosa", idade: "3 anos", local: "Brasília - DF", imagem: chavosa },
  { nome: "Leo", idade: "6 meses", local: "Brasília - DF", imagem: leo },
  { nome: "João", idade: "10 meses", local: "Brasília - DF", imagem: joao },
  { nome: "Marias", idade: "1 ano", local: "Brasília - DF", imagem: marias },
  { nome: "Melo", idade: "3 anos", local: "Brasília - DF", imagem: melo },
  { nome: "Let", idade: "6 meses", local: "Brasília - DF", imagem: letImg }
];

export default function Pets() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <h1 className="h1c">Campanha de adoção</h1>
        <p className="texto-centro">
          Conheça alguns dos peludinhos disponíveis para adoção e escolha o novo membro da sua família.
        </p>

        <h3 className="titulo-lista">Pets disponíveis</h3>
        <section className="pet-grid">
          {pets.map((pet) => (
            <article className="pet-card" key={pet.nome}>
              <img className="card-img-top" src={pet.imagem} alt={`Foto do pet ${pet.nome}`} />
              <div className="card-body">
                <h5 className="card-title">{pet.nome}</h5>
                <p className="card-text">
                  {pet.idade}, {pet.local}
                </p>
                <Link to="/declaracao" className="btn btn-info">
                  Quero adotar
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
