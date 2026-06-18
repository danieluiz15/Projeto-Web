import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Relatorio() {
  const [pets, setPets] = useState([]);
  const [adocoes, setAdocoes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pet_adocao")
      .then((response) => {
        setPets(response.data);
      });

    axios.get("http://localhost:3001/adocao")
      .then((response) => {
        setAdocoes(response.data.result);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="page-content dashboard-page">
        <h1>Relatório de Adoções</h1>

        <table border="1">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Tipo</th>
              <th>Adotante</th>
              <th>Cidade</th>
            </tr>
          </thead>

          <tbody>
            {adocoes.map((adocao) => {
              const pet = pets.find(
                (p) => p.id === adocao.petID
              );

              return (
                <tr key={adocao.id}>
                  <td>{pet?.nome}</td>
                  <td>{pet?.tipo}</td>
                  <td>
                    {adocao.nome} {adocao.sobrenome}
                  </td>
                  <td>{adocao.cidade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Relatorio;