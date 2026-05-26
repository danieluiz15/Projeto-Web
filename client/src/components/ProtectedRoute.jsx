import { Navigate }
from "react-router-dom";

import { useContext }
from "react";

import { AuthContext }
from "../context/AuthContext";

export default function ProtectedRoute({
  children
}) {

  const { usuario } =
    useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/" />;
  }

  return children;
}