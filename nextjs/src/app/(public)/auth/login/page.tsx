import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="relative flex min-h-screen ethos-bg overflow-hidden">
      {/* LADO ESQUERDO: LOGIN */}
      <div className="welcome-box flex justify-center items-center w-[30%] p-1">
        <div className="welcome-box-content flex flex-col items-center justify-center w-full max-w-[100%] h-[100%] py-10 px-10 text-center">
          <h1 className="text-2xl font-inter mb-2">Login</h1>
          <h2 className="font-chathura text-[6rem] leading-[6rem] tracking-[0.2rem] my-4 text-[#fcffff]">
            ETHOS
          </h2>

          <form className="w-full flex flex-col items-center">
            <div className="w-full mb-4 text-left">
              <label
                htmlFor="username"
                className="text-sm text-[#fcffff] font-medium"
              >
                Usuário
              </label>
              <input
                id="username"
                type="text"
                className="w-full mt-1 px-3 py-2 border border-[#fb1] rounded-md text-[#003366] focus:outline-none"
              />
            </div>

            <div className="w-full mb-4 text-left">
              <label
                htmlFor="password"
                className="text-sm text-[#fcffff] font-medium"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-3 py-2 border border-[#fb1] rounded-md text-[#003366] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#fb1] text-[#000003] font-bold py-2 px-6 rounded-md hover:bg-[#e0a800] hover:text-[#fcffff] transition-all"
            >
              Entrar
            </button>
          </form>

          <div className="mt-4 text-sm">
            <a href="#" className="text-[#fb1] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <p className="mt-6 text-sm text-[#fcffff]">
            <strong>Cadastre-se</strong>
            <br />
            Ainda não possui uma conta? <br />
            <span className="text-[#fb1] font-semibold">
              <a href="/register/" className="hover:underline">
                CADASTRE-SE NO SITE
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* LADO DIREITO: APRESENTAÇÃO */}
      <div className="flex-1 flex flex-col justify-center items-center text-[#003366] bg-white/80 backdrop-blur-sm relative">
        <div className="text-center px-8 z-10">
          <h2 className="font-chathura text-[5rem] tracking-[2rem] uppercase text-[#000003] mb-10">
            ETHOS
          </h2>
          <p className="text-lg font-semibold uppercase text-[#000003]">
            Cursos Integrados
          </p>
          <h3 className="text-2xl font-bold mt-2">Apresenta</h3>

          <div className="flex gap-4 justify-center my-6">
            {["C", "P", "A", "C"].map((letra) => (
              <span
                key={letra}
                className="cpac-circle flex items-center justify-center w-20 h-20 rounded-full text-5xl font-chathura"
              >
                {letra}
              </span>
            ))}
          </div>

          <p className="uppercase text-[#003366] font-semibold text-base mb-10">
            CURSO DE PSICANÁLISE E ANÁLISES CLÍNICA
          </p>

          <blockquote className="relative flex flex-col items-center justify-center text-[#011f53] font-semibold text-3xl italic leading-tight text-center mt-6 mb-4 space-y-2">
            <div className="relative flex items-center justify-center">
              {/* Aspa esquerda */}
              <Image
                src="/svgs/aspas-left.svg"
                alt="Aspa esquerda"
                width={40}
                height={40}
                className="absolute left-[-3rem] top-2 -translate-y-1/2 "
              />
              <p>Velhos universos,</p>
            </div>

            <div className="relative flex items-center justify-center">
              <p>novas dimensões</p>
              {/* Aspa direita */}
              <Image
                src="/svgs/aspas-right.svg"
                alt="Aspa direita"
                width={40}
                height={40}
                className="absolute right-[-3rem] top-3/4 -translate-y-3"
              />
            </div>
          </blockquote>
        </div>

        <div
          className="absolute bottom-0 right-0 w-[60%] h-[100%] ethos-presenter opacity-60"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
