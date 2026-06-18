import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import slide1 from "../assets/img/1.png";
import slide2 from "../assets/img/2.png";
import slide3 from "../assets/img/3.png";
import banner from "../assets/img/banner-promocao.png";
import adotar from "../assets/img/adotar1.png";
import adocao from "../assets/img/adocao.png";
import formulario from "../assets/img/formularioa2.png";

export default function Home() {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      {usuario && (
        <section className="faixa-logado">
          <div>
            <strong>Você está logado como {usuario.email}.</strong>
            <p>Agora as funções protegidas estão liberadas no menu.</p>
          </div>

          <div className="faixa-acoes">
            <Link className="btn btn-light" to="/dashboard">
              Abrir área logada
            </Link>

            <Link className="btn btn-light" to="/pedidos-adocao">
              Pedidos de Adoção
            </Link>

            <Link className="btn btn-light" to="/relatorio">
              Relatório
            </Link>

            <Link className="btn btn-outline-light" to="/add-pet">
              Adicionar pet
            </Link>
          </div>
        </section>
      )}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 hero-img"
              src={slide1}
              alt="Primeiro slide"
            />
          </div>

          <div className="carousel-item">
            <img
              className="d-block w-100 hero-img"
              src={slide2}
              alt="Segundo slide"
            />
          </div>

          <div className="carousel-item">
            <img
              className="d-block w-100 hero-img"
              src={slide3}
              alt="Terceiro slide"
            />
          </div>

          <div className="carousel-item">
            <img
              className="d-block w-100 hero-img"
              src={banner}
              alt="Banner promocional"
            />
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Anterior</span>
        </a>

        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Próximo</span>
        </a>
      </div>

      <section className="t1">
        <h3>Conheça o Cafofo dos Peludos</h3>
        <p>
          A ONG de adoção de animais tem como principal objetivo resgatar, cuidar
          e promover a adoção responsável de animais abandonados ou em situação
          de risco. Seu trabalho envolve tratamento veterinário, alimentação,
          abrigo, amor e campanhas de conscientização sobre adoção responsável.
        </p>
      </section>

      <section className="card-group cards-home">
        <div className="card2">
          <img
            className="card-img-to"
            src={adotar}
            alt="Pessoa adotando animal"
          />

          <div className="card-body">
            <h5 className="card-title">Ache seu novo amiguinho</h5>
            <p className="card-tex">
              Adotar um animalzinho é um gesto de carinho e responsabilidade.
              Procure abrigos ou ONGs, conheça os animais disponíveis e escolha
              com atenção.
            </p>
          </div>

          <div className="card-footer">
            <small className="text-muted">
              Confira a lista de animais <Link to="/pets">aqui</Link>.
            </small>
          </div>
        </div>

        <div className="card2">
          <img
            className="card-img-to"
            src={adocao}
            alt="Formulário de adoção"
          />

          <div className="card-body">
            <h5 className="card-title">Formulário de interesse</h5>
            <p className="card-tex">
              O formulário ajuda a ONG a entender seu perfil e garantir que você
              está pronto para cuidar de um animal com responsabilidade.
            </p>
          </div>

          <div className="card-footer">
            <small className="text-muted">
              Confira o formulário <Link to="/declaracao">aqui</Link>.
            </small>
          </div>
        </div>

        <div className="card2">
          <img
            className="card-img-to"
            src={formulario}
            alt="Adoção finalizada"
          />

          <div className="card-body">
            <h5 className="card-title">Adoção finalizada</h5>
            <p className="card-tex">
              Depois da aprovação, você começa uma jornada de momentos especiais
              com seu novo companheiro. Seu gesto faz toda a diferença.
            </p>
          </div>

          <div className="card-footer">
            <small className="text-muted">Parabéns por escolher adotar!</small>
          </div>
        </div>
      </section>

      <p className="p2">
        Algumas ONGs e protetores parceiros podem solicitar uma taxa no momento
        da adoção para auxílio de custos. Essa cobrança é realizada diretamente
        entre adotante e ONG/protetor parceiro.
      </p>

      <section className="alert alert-primary bloco-video" role="alert">
        <h1 className="h1video">Por que adotar?</h1>
      </section>

      <section className="pqadotar">
        <ol>
          <li>
            Salva vidas: ao adotar, você dá uma nova chance de vida a um animal.
          </li>
          <li>Combate o abandono e reduz animais em situação de rua.</li>
          <li>Animais adotados oferecem companheirismo e amor.</li>
          <li>A adoção costuma ter custo menor que a compra de animais.</li>
          <li>Ajuda a controlar a superpopulação de animais.</li>
          <li>
            Incentiva adoção consciente e combate criadores irresponsáveis.
          </li>
          <li>Ter um pet pode ajudar a diminuir estresse e ansiedade.</li>
        </ol>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4FlvZPHrFlc?si=iDHIaN7p9NS2ScVm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
}