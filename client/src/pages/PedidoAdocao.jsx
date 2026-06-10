import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const estados = [
  "DF",
  "MG",
  "RJ",
  "SP",
];

function PedidoAdocao() {
  // Retirar ao inplementar o back-end completo, junto as as partes que utilizam isso
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      nome: "Ana",
      sobrenome: "Galati",
      endereco: "Rua das Flores",
      enderecoAuxiliar: "Casa 2",
      cidade: "Brasília",
      estado: "DF",
      cep: "70000-000",
      especie: "Cachorro",
      pet: "Thor",
    },
    {
      id: 2,
      nome: "João",
      sobrenome: "Silva",
      endereco: "Avenida Central",
      enderecoAuxiliar: "Apartamento 304",
      cidade: "Goiânia",
      estado: "GO",
      cep: "74000-000",
      especie: "Gato",
      pet: "Mimi",
    },
  ]);
  // 

  const [pedidoEditando, setPedidoEditando] = useState(null);

  const [formEdicao, setFormEdicao] = useState({
    nome: "",
    sobrenome: "",
    endereco: "",
    enderecoAuxiliar: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function excluirPedido(id) {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  }

  function abrirModalEdicao(pedido) {
    setPedidoEditando(pedido);

    setFormEdicao({
      nome: pedido.nome,
      sobrenome: pedido.sobrenome,
      endereco: pedido.endereco,
      enderecoAuxiliar: pedido.enderecoAuxiliar,
      cidade: pedido.cidade,
      estado: pedido.estado,
      cep: pedido.cep,
    });
  }

  function fecharModalEdicao() {
    setPedidoEditando(null);
  }

  function atualizarCampo(campo, valor) {
    setFormEdicao({
      ...formEdicao,
      [campo]: valor,
    });
  }

  function salvarEdicao() {
    if (
      !formEdicao.nome ||
      !formEdicao.sobrenome ||
      !formEdicao.endereco ||
      !formEdicao.enderecoAuxiliar ||
      !formEdicao.cidade ||
      !formEdicao.estado ||
      !formEdicao.cep
    ) {
      alert("Todos os campos da pessoa solicitante precisam ser preenchidos.");
      return;
    }

    // Retirar ao inplementar o back-end completo

    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === pedidoEditando.id
          ? {
              ...pedido,
              nome: formEdicao.nome,
              sobrenome: formEdicao.sobrenome,
              endereco: formEdicao.endereco,
              enderecoAuxiliar: formEdicao.enderecoAuxiliar,
              cidade: formEdicao.cidade,
              estado: formEdicao.estado,
              cep: formEdicao.cep,
            }
          : pedido
      )
    );
    // 
    // Atualmente dá erro pela falta de exibição de dados que combinam com os presentes no banco de dados
    axios.put(`http://localhost:3001/adocao/${pedidoEditando.id}`,{
      nome: formEdicao.nome,
      sobrenome: formEdicao.sobrenome,
      endereco: formEdicao.endereco,
      endereco2: formEdicao.enderecoAuxiliar,
      cidade: formEdicao.cidade,
      estado: formEdicao.estado,
      cep: formEdicao.cep
    }).then((response) => {
      console.log(response);
      alert("Pedido de adoção editado com sucesso");
    })

    fecharModalEdicao();
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          maxWidth: "1100px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "25px",
          }}
        >
          Pedidos de Adoção
        </h2>

        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            style={{
              border: "1px solid #ccc",
              padding: "40px",
              marginBottom: "35px",
              borderRadius: "16px",
              width: "100%",
              minHeight: "420px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "25px",
              }}
            >
              Dados do Solicitante
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 35px",
                fontSize: "22px",
              }}
            >
              <p>
                <strong>Nome:</strong> {pedido.nome}
              </p>

              <p>
                <strong>Sobrenome:</strong> {pedido.sobrenome}
              </p>

              <p>
                <strong>Endereço:</strong> {pedido.endereco}
              </p>

              <p>
                <strong>Endereço auxiliar:</strong> {pedido.enderecoAuxiliar}
              </p>

              <p>
                <strong>Cidade:</strong> {pedido.cidade}
              </p>

              <p>
                <strong>Estado:</strong> {pedido.estado}
              </p>

              <p>
                <strong>CEP:</strong> {pedido.cep}
              </p>
            </div>

            <hr style={{ margin: "30px 0" }} />

            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              Dados do Pet
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 35px",
                fontSize: "22px",
              }}
            >
              <p>
                <strong>Espécie:</strong> {pedido.especie}
              </p>

              <p>
                <strong>Pet desejado:</strong> {pedido.pet}
              </p>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                onClick={() => abrirModalEdicao(pedido)}
                style={estiloBotao}
              >
                Editar solicitante
              </button>

              <button
                onClick={() => excluirPedido(pedido.id)}
                style={estiloBotaoExcluir}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        {pedidoEditando && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "28px",
                borderRadius: "14px",
                width: "720px",
                maxWidth: "90%",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "22px",
                  fontSize: "30px",
                }}
              >
                Editar Solicitante
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px 22px",
                }}
              >
                <label>
                  <strong>Nome:</strong>
                  <input
                    type="text"
                    value={formEdicao.nome}
                    onChange={(e) => atualizarCampo("nome", e.target.value)}
                    style={estiloInput}
                  />
                </label>

                <label>
                  <strong>Sobrenome:</strong>
                  <input
                    type="text"
                    value={formEdicao.sobrenome}
                    onChange={(e) =>
                      atualizarCampo("sobrenome", e.target.value)
                    }
                    style={estiloInput}
                  />
                </label>

                <label>
                  <strong>Endereço:</strong>
                  <input
                    type="text"
                    value={formEdicao.endereco}
                    onChange={(e) =>
                      atualizarCampo("endereco", e.target.value)
                    }
                    style={estiloInput}
                  />
                </label>

                <label>
                  <strong>Endereço auxiliar:</strong>
                  <input
                    type="text"
                    value={formEdicao.enderecoAuxiliar}
                    onChange={(e) =>
                      atualizarCampo("enderecoAuxiliar", e.target.value)
                    }
                    style={estiloInput}
                  />
                </label>

                <label>
                  <strong>Cidade:</strong>
                  <input
                    type="text"
                    value={formEdicao.cidade}
                    onChange={(e) => atualizarCampo("cidade", e.target.value)}
                    style={estiloInput}
                  />
                </label>

                <label>
                  <strong>Estado:</strong>
                  <select
                    value={formEdicao.estado}
                    onChange={(e) => atualizarCampo("estado", e.target.value)}
                    style={estiloInput}
                  >
                    <option value="">Selecione o estado</option>

                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <strong>CEP:</strong>
                  <input
                    type="text"
                    value={formEdicao.cep}
                    onChange={(e) => atualizarCampo("cep", e.target.value)}
                    style={estiloInput}
                  />
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  marginTop: "28px",
                }}
              >
                <button onClick={salvarEdicao} style={estiloBotaoSalvar}>
                  Salvar alterações
                </button>

                <button onClick={fecharModalEdicao} style={estiloBotaoCancelar}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const estiloInput = {
  width: "100%",
  padding: "9px",
  marginTop: "6px",
  borderRadius: "9px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
};

const estiloBotao = {
  padding: "14px 24px",
  borderRadius: "14px",
  border: "none",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#eeeeee",
};

const estiloBotaoExcluir = {
  padding: "14px 24px",
  borderRadius: "14px",
  border: "none",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#f8dada",
  color: "#d71919",
};

const estiloBotaoSalvar = {
  padding: "13px 30px",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#e8eef7",
};

const estiloBotaoCancelar = {
  padding: "13px 30px",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#f8dada",
  color: "#d71919",
};

export default PedidoAdocao;