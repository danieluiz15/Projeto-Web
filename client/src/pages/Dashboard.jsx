import { useContext } from "react";
import Navbar from "../components/Navbar";
import PetsCrud from "./PetsCrud";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main className="page-content dashboard-page">
        <h1>Bem-vindo, {usuario.email}!</h1>
        <p>Gerenciamento de Pets</p>

        <PetsCrud />
      </main>
    </>
  );
}