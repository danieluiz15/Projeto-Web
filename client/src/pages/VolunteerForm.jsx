import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VolunteerForm() {
  return (
    <>
      <Navbar />
      <main className="page-content form-page">
        <h1 className="h1qf">Seja nosso voluntário!</h1>

        <form className="formq">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="nomeVoluntario">Nome</label>
              <input type="text" className="form-control" id="nomeVoluntario" placeholder="Nome" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="telefoneVoluntario">Telefone</label>
              <input type="text" className="form-control" id="telefoneVoluntario" placeholder="Telefone" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emailVoluntario">E-mail</label>
            <input type="email" className="form-control" id="emailVoluntario" placeholder="nome@exemplo.com" />
          </div>

          <div className="form-group">
            <label htmlFor="areaVoluntario">Como deseja ajudar?</label>
            <select className="form-control" id="areaVoluntario" defaultValue="">
              <option value="" disabled>Escolha...</option>
              <option>Lar temporário</option>
              <option>Transporte</option>
              <option>Divulgação</option>
              <option>Eventos</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="enderecoVoluntario">Endereço</label>
            <input type="text" className="form-control" id="enderecoVoluntario" placeholder="Rua dos Bobos, nº 0" />
          </div>

          <Link to="/voluntario/finalizado" className="btn btn-primary my-1" id="butaof">
            Enviar
          </Link>
        </form>
      </main>
    </>
  );
}
