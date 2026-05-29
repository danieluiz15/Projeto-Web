import Navbar from "../components/Navbar";

export default function AddPet() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Pet cadastrado de forma simulada. Essa tela está protegida pelo login.");
  }

  return (
    <>
      <Navbar />
      <header className="cabecalho-confirmacao">
        <h1>Adicione um Pet para Adoção</h1>
      </header>

      <main className="form-container">
        <h2>Preencha os detalhes abaixo para adicionar um pet à lista de adoção.</h2>
        <form className="pet-form" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome do pet</label>
          <input type="text" id="nome" name="nome" placeholder="Nome do pet" required />

          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" required defaultValue="">
            <option value="" disabled>Escolha...</option>
            <option>Cachorro</option>
            <option>Gato</option>
            <option>Outro</option>
          </select>

          <label htmlFor="idade">Idade</label>
          <input type="text" id="idade" name="idade" placeholder="Idade do pet" required />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Descreva as características do pet"
            rows="4"
            required
          ></textarea>

          <label htmlFor="foto">Foto do pet</label>
          <input type="file" className="form-control-file" id="foto" />

          <button type="submit">Adicionar Pet</button>
        </form>

        <p className="mt-4">
          Entre em contato: <a href="mailto:CafofoDosPeludos@gmail.com">CafofoDosPeludos@gmail.com</a>
        </p>
      </main>
    </>
  );
}
