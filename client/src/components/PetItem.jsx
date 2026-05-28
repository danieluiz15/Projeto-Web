export default function PetItem({ pet, onEditar, onExcluir }) {
  return (
    <tr>
      <td>{pet.nome}</td>
      <td>{pet.especie}</td>
      <td>{pet.raca}</td>
      <td>{pet.idade}</td>
      <td>
        <div className="botoes tabela-botoes">
          <button
            className="secundario"
            type="button"
            onClick={() => onEditar(pet)}
          >
            Editar
          </button>

          <button
            className="perigo"
            type="button"
            onClick={() => onExcluir(pet.id)}
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}