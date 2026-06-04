import PetAdocao from "../components/PetAdocao";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Pets() {
  const [dados, setDados] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/pet_adocao')
      .then((response)=> response.json())
      .then((data)=>{
        setDados(data);
      })
      .catch((error)=> console.log("Erro ao buscar dados: ", error));
  }, []);
  console.log(`Dados: ${dados}`);

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
          {dados.length > 0 ?(
            dados.map((pet) => (
              <PetAdocao
                key={pet.id}
                pet={pet}
              />
            ))
          ) : (
            <p>Nenhum pet cadastrado</p>
          )}
        </section>
      </main>
    </>
  );
}
