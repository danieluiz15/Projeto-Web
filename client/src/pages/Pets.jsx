import PetAdocao from "../components/PetAdocao";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Axios from "axios";

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

  function editarPet(pet){
    document.getElementById('editId').value = pet.id;
    document.getElementById('editNome').value = pet.nome;
    document.getElementById('editTipo').value = pet.tipo;
    document.getElementById('editIdade').value = pet.idade;
    document.getElementById('editDescricao').value = pet.descricao;

    document.getElementById("modalEdicao").style.display = "block";

  };

  function atualizarPet(){
    const id = document.getElementById('editId').value;
    let nome, tipo, idade, descricao;

    nome = document.getElementById('editNome').value;
    tipo = document.getElementById('editTipo').value;
    idade = document.getElementById('editIdade').value;
    descricao = document.getElementById('editDescricao').value;

    Axios.put(`http://localhost:3001/pet_adocao/${id}`,{
      nome: nome.trim(),
      tipo: tipo.trim(),
      idade: Number(idade),
      descricao: descricao.trim()
    }).then((response) => {
      console.log(response);
      alert("Pet atualizado com sucesso!");
      window.location.reload();
    });
  }

  function deletarPet(id){
      if(window.confirm("Deseja realmente excluir o pet da lista de adoção?")){
        Axios.delete(`http://localhost:3001/pet_adocao/${id}`);
        window.location.reload();
      }else{
        return "Operação cancelada"
      }
  }

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
                onEdit={editarPet}
                onDelete={deletarPet}
              />
            ))
          ) : (
            <p>Nenhum pet cadastrado</p>
          )}
        </section>
        <section>
          <div id="modalEdicao" className="modal">
            <div className="modal-conteudo">
              <h2>Editar Pet</h2>

              <input type="hidden" id="editId"/>

              <div className="form-group-modal">
                <label htmlFor="editNome">Nome:</label>
                <input type="text" id="editNome"/>
              </div>

              <div className="form-group-modal">
                <label htmlFor="editIdade">Idade: </label>
                <input type="text" id="editIdade"/>
              </div>

              <div className="form-group-modal">
                <label htmlFor="editTipo">Tipo: </label>
                <select id="editTipo" name="tipo">
                  <option value="" disabled>Escolha...</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group-modal">
                <label htmlFor="editDescricao">Descrição:</label>
                <textarea name="editDescricao" id="editDescricao"></textarea>
              </div>

              <br/>
              <div className="botoes-modal">
                <button onClick={atualizarPet} class="secundario">Salvar</button>
                <button
                onClick={()=> document.getElementById('modalEdicao').style.display = 'none'}
                className="perigo"
                >Cancelar</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
