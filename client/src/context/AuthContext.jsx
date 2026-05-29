import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo =
      localStorage.getItem("sessao-web");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  function login(email, senha) {

    const EMAIL_DEMO = "aluno@web.com";
    const SENHA_DEMO = "123456";

    if (
      email === EMAIL_DEMO &&
      senha === SENHA_DEMO
    ) {

      const usuarioLogado = { email };

      setUsuario(usuarioLogado);

      localStorage.setItem(
        "sessao-web",
        JSON.stringify(usuarioLogado)
      );

      return true;
    }

    return false;
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("sessao-web");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;