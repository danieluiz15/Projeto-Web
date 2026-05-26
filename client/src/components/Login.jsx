import { useState, useContext } from "react";

import { AuthContext }
from "../context/AuthContext";

import { useNavigate }
from "react-router-dom";

export default function Login() {

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [erro, setErro] =
    useState("");

  function handleSubmit(e) {

    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    const sucesso =
      login(email, senha);

    if (!sucesso) {
      setErro("Credenciais inválidas");
      return;
    }

    navigate("/dashboard");
  }

  return (

    <main className="pagina">

      <div className="conteiner">

        <div className="cartao">

          <h1>Sistema Login</h1>

          {erro && (
            <div className="erro mensagem">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="campo">

              <label>E-mail</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="campo">

              <label>Senha</label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
              />

            </div>

            <button
              className="primario"
              type="submit"
            >
              Entrar
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}