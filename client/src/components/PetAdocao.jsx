import { Link } from "react-router-dom";

export default function PetAdocao ({pet, onEdit, onDelete}){
    return(
        <article className="pet-card" key={pet.id}>
            <div className="card-body">
            <h5 className="card-title">{pet.nome}</h5>
            <p className="card-text">
                Idade: {pet.idade}, Especie: {pet.tipo}
            </p>
            <p>
                Mais sobre mim: {pet.descricao}
            </p>
            <Link to="/declaracao" className="btn btn-info" state={pet.id}>
                Quero adotar
            </Link>
            <div class="d-flex justify-content-center" style={{marginTop: 1 + 'vh', columnGap: 2 + '%'}}> 
                <button className="btn btn-outline-secondary" type="button" onClick={()=>onEdit(pet)}>
                    Editar pet
                </button>
                <button className="btn btn-outline-danger" type="button" onClick={()=>onDelete(pet.id)}>
                    Excluir pet
                </button>
            </div>
            </div>
        </article>
    );
}

