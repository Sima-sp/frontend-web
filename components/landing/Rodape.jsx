// Rodapé: a marca, os atalhos e o contato.
import Image from "next/image";
import { CONFIG, telaDoApp } from "@/lib/config";

export default function Rodape() {
  return (
    <footer className="ld-foot thm-dark">
      <div className="wrap">
        <div className="ld-cols">
          <div>
            <Image src={`${CONFIG.caminhoBase}/logo-bone.png`} alt="SIMA" width={68} height={40} />
            <p className="small ld-foot-sobre">
              Sistema Inteligente de Monitoramento de Alagamentos em São Paulo. Trabalho de Conclusão de Curso,{" "}
              {CONFIG.instituicao}, 2026.
            </p>
          </div>
          <nav aria-label="O app">
            <h2>O app</h2>
            <ul>
              <li><a href={CONFIG.urlApp}>Mapa de risco</a></li>
              <li><a href={telaDoApp("/rotas")}>Rotas que desviam</a></li>
              <li><a href={telaDoApp("/alertas")}>Avisos por região</a></li>
              <li><a href={telaDoApp("/ia")}>Como a IA funciona</a></li>
            </ul>
          </nav>
          <nav aria-label="O projeto">
            <h2>O projeto</h2>
            <ul>
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#a-ia">O quanto a IA acerta</a></li>
              <li><a href={CONFIG.urlSensor}>Painel do sensor</a></li>
              <li><a href="#projeto">O que é de verdade</a></li>
            </ul>
          </nav>
          <div>
            <h2>Contato</h2>
            <ul>
              {CONFIG.email ? <li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li> : null}
              {CONFIG.repositorio ? <li><a href={CONFIG.repositorio}>Repositórios no GitHub</a></li> : null}
            </ul>
          </div>
        </div>
        <div className="ld-legal">
          <span className="micro">© 2026 SIMA-SP</span>
          <span className="micro">Demonstração: leituras e clima simulados. Mapa e rotas: © OpenStreetMap.</span>
        </div>
      </div>
    </footer>
  );
}
