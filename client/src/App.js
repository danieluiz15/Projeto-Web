import { useEffect, useState } from "react";
import "./App.css";
import "./style.css";
import PetsCrud from "./pages/PetsCrud";

const CHAVE_AUTENTICACAO = "sessao-web";
const EMAIL_DEMO = "aluno@web.com";
const SENHA_DEMO = "123456";

function carregarSessao() {
  const armazenado = localStorage.getItem(CHAVE_AUTENTICACAO);
  return armazenado ? JSON.parse(armazenado) : null;
}

function App() {
  const [usuarioAtual, setUsuarioAtual] = useState(() => carregarSessao());
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemInfo, setMensagemInfo] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    if (usuarioAtual) {
      localStorage.setItem(
        CHAVE_AUTENTICACAO,
        JSON.stringify(usuarioAtual)
      );
      return;
    }

    localStorage.removeItem(CHAVE_AUTENTICACAO);
  }, [usuarioAtual]);

  function limparMensagens() {
    setMensagemInfo("");
    setMensagemErro("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    limparMensagens();

    const emailLimpo = email.trim();
    const senhaLimpa = senha.trim();

    if (!emailLimpo || !senhaLimpa) {
      setMensagemErro("Preencha o e-mail e a senha.");
      return;
    }

    if (!emailLimpo.includes("@")) {
      setMensagemErro("Informe um e-mail válido.");
      return;
    }

    if (emailLimpo !== EMAIL_DEMO || senhaLimpa !== SENHA_DEMO) {
      setMensagemErro("Credenciais inválidas.");
      return;
    }

    setUsuarioAtual({ email: emailLimpo });
    setMensagemInfo("Login realizado com sucesso.");
    setEmail("");
    setSenha("");
  }

  function handleLogout() {
    setUsuarioAtual(null);
    limparMensagens();
  }

  const estaLogado = Boolean(usuarioAtual);

  return (
    <main className="pagina">
      <div className="conteiner">
        <header className="titulo">
          <h1>Sistema de Login</h1>
        </header>

        <section id="visaoLogin" className={`grade ${estaLogado ? "oculto" : ""}`}>
          <div className="cartao">
            <div className="titulo-secao">
              <h2>Entrar</h2>
              <span className="etiqueta">Tela de login</span>
            </div>

            {mensagemInfo ? (
              <div id="infoLogin" className="mensagem informacao" style={{ display: "block" }}>
                {mensagemInfo}
              </div>
            ) : null}

            {mensagemErro ? (
              <div id="erroLogin" className="mensagem erro" style={{ display: "block" }}>
                {mensagemErro}
              </div>
            ) : null}

            <form id="formLogin" noValidate onSubmit={handleSubmit}>
              <div className="campo">
                <label htmlFor="entradaEmail">E-mail</label>
                <input
                  id="entradaEmail"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="campo">
                <label htmlFor="entradaSenha">Senha</label>
                <input
                  id="entradaSenha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>

              <div className="botoes">
                <button className="primario" type="submit">
                  Entrar
                </button>
              </div>
            </form>
          </div>

          <div className="cartao">
            <div className="titulo-secao">
              <h2>Acesso demo</h2>
              <span className="etiqueta">Teste</span>
            </div>
            <div className="vazio">
              E-mail: aluno@web.com
              <br />
              <br />
              Senha: 123456
              <br />
              <br />
            </div>
          </div>
        </section>

        <section id="visaoApp" className={`cartao ${estaLogado ? "" : "oculto"}`}>
          <div className="barra-topo">
            <div>
              <h2 id="textoBemVindo">
                {usuarioAtual ? `Bem-vindo, ${usuarioAtual.email}` : "Área protegida"}
              </h2>
              <p id="textoSessao" className="subtitulo">
                Sessão ativa.
              </p>
            </div>
            <div className="botoes">
              <button className="perigo" type="button" id="botaoSair" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
            <PetsCrud />
        </section>
      </div>
    </main>
  );
}

export default App;
