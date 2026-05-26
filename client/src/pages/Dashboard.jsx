import { useContext }
from "react";

import { AuthContext }
from "../context/AuthContext";

export default function Dashboard() {

  const {
    usuario,
    logout
  } = useContext(AuthContext);

  return (

    <div className="cartao">

      <h1>
        Bem-vindo,
        {usuario.email}
      </h1>

      <button
        className="perigo"
        onClick={logout}
      >
        Sair
      </button>

    </div>
  );
}