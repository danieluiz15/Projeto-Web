import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdoptionFormStep1() {
  return (
    <>
      <Navbar />
      <main className="page-content form-page">
        <h2>Queremos saber mais sobre você</h2>

        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputNome">Nome</label>
              <input type="text" className="form-control" id="inputNome" placeholder="Nome" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputSobrenome">Sobrenome</label>
              <input type="text" className="form-control" id="inputSobrenome" placeholder="Sobrenome" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Endereço</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0" />
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress2">Endereço 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartamento, casa, etc." />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Cidade</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputEstado">Estado</label>
              <select id="inputEstado" className="form-control" defaultValue="">
                <option value="" disabled>Escolher...</option>
                <option>DF</option>
                <option>SP</option>
                <option>MG</option>
                <option>RJ</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputCEP">CEP</label>
              <input type="text" className="form-control" id="inputCEP" />
            </div>
          </div>

          <Link to="/adocao/form2" className="but link-botao">
            Confirmar
          </Link>
        </form>
      </main>
    </>
  );
}
