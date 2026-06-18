import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children
}) {

  const { usuario } = useContext(AuthContext);
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname, petID: location.state?.petID }}
        replace
      />
    );
  }

  return children;
}