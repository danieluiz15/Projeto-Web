import Navbar from "../components/Navbar";

const perguntas = [
  {
    pergunta: "Como posso ajudar a ONG?",
    resposta:
      "Você pode ajudar fazendo doações, adotando um animal, sendo voluntário ou divulgando nosso trabalho."
  },
  {
    pergunta: "Quais são os requisitos para adotar um animal?",
    resposta:
      "Para adotar, é preciso ser maior de 18 anos, ter residência adequada e estar disposto a cuidar do animal com responsabilidade."
  },
  {
    pergunta: "Onde posso fazer uma doação?",
    resposta:
      "As doações podem ser combinadas diretamente com a equipe da ONG ou com os protetores parceiros."
  },
  {
    pergunta: "Posso ser voluntário?",
    resposta:
      "Sim. Basta preencher o formulário de voluntariado e aguardar o contato da equipe."
  }
];

export default function Faq() {
  return (
    <>
      <Navbar />
      <header className="faq-header">
        <h1>FAQ - Como ajudar?</h1>
      </header>

      <main className="faq">
        <h2>Perguntas Frequentes</h2>
        {perguntas.map((item) => (
          <section className="faq-item" key={item.pergunta}>
            <h3>{item.pergunta}</h3>
            <p>{item.resposta}</p>
          </section>
        ))}
      </main>
    </>
  );
}
