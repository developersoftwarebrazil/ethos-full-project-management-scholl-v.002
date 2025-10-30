import "./home.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="content">
      <div className="welcome-box">
        <div className="welcome-box-content">
          <h3>👋 Bem-vindo à Plataforma</h3>
          <h2 className="title-home">ETHOS</h2>
          <p>
            Acesse o painel de administração e gerencie os cursos, alunos e
            conteúdos.
          </p>
          <Link href="/admin/" className="admin-btn">
            Ir para o Admin
          </Link>
        </div>
      </div>

      <div className="presentation">
        <h2>Ethos</h2>
        <p>cursos integrados</p>
        <h3>Apresenta</h3>

        <div className="cpac">
          <span>C</span>
          <span>P</span>
          <span>A</span>
          <span>C</span>
        </div>

        <p>CURSO DE PSICANÁLISE E ANÁLISES CLÍNICA</p>

        <div className="blockquote">
          <blockquote>
            <span>Velhos universos,</span>
            <span>novas dimensões</span>
          </blockquote>
        </div>

        <div className="overlay"></div>
      </div>

      <div className="presenterImage"></div>
      <div className="background-image"></div>
    </section>
  );
}
