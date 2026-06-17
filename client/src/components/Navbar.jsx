import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/img/logo1.png";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light app-navbar">
      <Link className="navbar-brand" to="/">
        <img src={logo} className="logo" alt="Logo Cafofo dos Peludos" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#conteudoNavbarSuportado"
        aria-controls="conteudoNavbarSuportado"
        aria-expanded="false"
        aria-label="Alterna navegação"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
        <ul className="navbar-nav mr-auto">
          {usuario && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#institucional"
                id="navbarDropdownInstitucional"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Institucional
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownInstitucional"
              >
                <NavLink className="dropdown-item" to="/add-pet">
                  Adicionar pet
                </NavLink>

                <NavLink className="dropdown-item" to="/pedidos-adocao">
                  Pedidos de Adoção
                </NavLink>

                <a
                  className="dropdown-item"
                  href="https://observatorio3setor.org.br/lista-conheca-7-ongs-brasileiras-que-atuam-na-protecao-de-animais/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Projetos sociais
                </a>
              </div>
            </li>
          )}

          <li className="nav-item">
            <a
              className="nav-link"
              href="https://love.doghero.com.br/dicas/ong-de-animais/"
              target="_blank"
              rel="noreferrer"
            >
              ONGs parceiras
            </a>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/faq">
              FAQ
            </NavLink>
          </li>

          {usuario && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Área logada
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          {usuario && (
            <NavLink className="btn btn-outline-info" to="/pets">
              Quero adotar
            </NavLink>
          )}

          {!usuario ? (
            <NavLink
              className="btn btn-login"
              to="/login"
              title="Entrar no sistema"
            >
              🔐 Login
            </NavLink>
          ) : (
            <>
              <span className="usuario-logado">Olá, {usuario.email}</span>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}