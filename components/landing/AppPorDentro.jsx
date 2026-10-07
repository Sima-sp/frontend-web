"use client";
// "O app, por dentro": o app DE VERDADE rodando num telefone, dentro da página.
//
// Não há telas de imitação: o telefone é um <iframe> com o app publicado (CONFIG.urlApp).
// - O app é aberto com `?vitrine=1`: ele passeia sozinho (troca o clima, aproxima de um bueiro)
//   até a pessoa tocar. É o "modo vitrine" do app (mobile-app/src/telas/useVitrine.js).
// - A lista ao lado troca a tela do telefone mudando só o "#..." do endereço do iframe (o app usa
//   rotas com "#", então ele troca de tela sem recarregar) e avisa o app para parar o passeio.
// - O app só é carregado quando a seção chega perto da tela: ele é pesado (mapa) e não deve
//   atrasar a abertura da página. Quem pediu economia de dados decide quando abrir.
// - Em tela estreita o telefone não recebe toque (senão o mapa prenderia a rolagem da página):
//   ele vira uma vitrine, e um toque abre o app inteiro.
// - Quem pediu menos movimento ao aparelho recebe o app parado, sem o passeio.
import { useEffect, useRef, useState } from "react";
import { CONFIG, telaDoApp } from "@/lib/config";
import { BUEIRO } from "@/lib/demonstracao";
import { IconeSeta, MarcaTampa } from "./Icones";

const TELAS = [
  { id: "mapa", nome: "Mapa", rota: "/", desc: "A tampa de cada bueiro enche conforme o risco. Troque o clima da demonstração, no alto, e veja a chuva atravessar a cidade." },
  { id: "bueiro", nome: "Bueiro", rota: `/bueiro/${BUEIRO.id}`, desc: "O ponto por dentro: a água medida, a chuva das últimas horas e a chance de alagar em 3 horas, com o quanto o sensor pesou na conta." },
  { id: "rotas", nome: "Rotas", rota: "/rotas", desc: "Escolha um destino: o app traça o caminho de carro que desvia dos bueiros em risco e mostra quanto ele demora a mais." },
  { id: "avisos", nome: "Avisos por região", rota: "/alertas", desc: "Os bueiros de cada região lidos em conjunto. É o aviso em que a IA mais acerta." },
  { id: "bairros", nome: "Bairros", rota: "/bairros", desc: "A rede de cada bairro em uma barra: quantos pontos estão em cada nível agora." },
  { id: "ia", nome: "Como a IA funciona", rota: "/ia", desc: "Um simulador: mexa na chuva, no lugar e na água do bueiro e veja a resposta da IA mudar na hora." },
];
const LARGURA_TELA = 390;
const ALTURA_TELA = 844;
const MOLDURA = 24; // a borda do telefone, somando os dois lados

/** Escala o telefone para caber na coluna e na altura da janela (ele precisa aparecer inteiro para ser usado). */
function useEscala(ref) {
  const [escala, setEscala] = useState(1);
  useEffect(() => {
    if (!ref.current) return undefined;
    const medir = () => {
      const largura = ref.current.clientWidth;
      const porLargura = largura / (LARGURA_TELA + MOLDURA);
      const porAltura = (window.innerHeight - 120) / (ALTURA_TELA + MOLDURA);
      setEscala(Math.min(1, porLargura, Math.max(0.62, porAltura)));
    };
    const observador = new ResizeObserver(medir);
    observador.observe(ref.current);
    window.addEventListener("resize", medir);
    return () => { observador.disconnect(); window.removeEventListener("resize", medir); };
  }, [ref]);
  return escala;
}

export default function AppPorDentro() {
  const [tela, setTela] = useState("mapa");
  const [origem, setOrigem] = useState(null); // o endereço com que o app foi aberto (null = ainda não abriu)
  const [aberto, setAberto] = useState(false); // o app terminou de carregar dentro do telefone
  const [economia, setEconomia] = useState(false); // a pessoa pediu economia de dados: não abre sozinho
  const caixa = useRef(null);
  const quadro = useRef(null);
  const escala = useEscala(caixa);

  const abrirApp = () => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOrigem((atual) => atual ?? `${CONFIG.urlApp}${semMovimento ? "" : "?vitrine=1"}`);
  };

  // Abre o app quando a seção chega perto da tela.
  useEffect(() => {
    if (navigator.connection?.saveData) {
      setEconomia(true);
      return undefined;
    }
    const observador = new IntersectionObserver((entradas) => {
      if (entradas.some((e) => e.isIntersecting)) {
        abrirApp();
        observador.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    if (caixa.current) observador.observe(caixa.current);
    return () => observador.disconnect();
  }, []);

  const escolher = (id) => {
    setTela(id);
    const escolhida = TELAS.find((t) => t.id === id);
    if (!origem || !quadro.current) return;
    // Para o passeio do app (vale como um toque) e troca só o "#..." do endereço: não recarrega.
    quadro.current.contentWindow?.postMessage("sima:usar", "*");
    quadro.current.src = `${origem}#${escolhida.rota}`;
  };

  const atual = TELAS.find((t) => t.id === tela);

  return (
    <section className="ld-faixa ld-ferro-fundo thm-dark" id="o-app">
      <div className="wrap">
        <h2 className="ld-h2">O app, por dentro</h2>
        <p className="sub ld-abre-secao">
          Este é o app de verdade, funcionando aqui na página. Ele passeia sozinho pela demonstração até alguém
          tocar: escolha uma tela na lista ou mexa direto no telefone.
        </p>
        <div className="ld-app">
          <div role="tablist" aria-label="Telas do app" aria-orientation="vertical" className="ld-telas">
            {TELAS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={t.id === tela} aria-controls="ld-telefone"
                className={t.id === tela ? "ld-pick ld-pick-on" : "ld-pick"} onClick={() => escolher(t.id)}>
                <b>{t.nome}</b>
                <span>{t.desc}</span>
              </button>
            ))}
          </div>
          {/* Em tela estreita a lista vira uma fileira de nomes; a explicação da tela escolhida vem aqui. */}
          <p className="ld-desc-atual">{atual.desc}</p>

          <div className="ld-phone-col" ref={caixa}>
            <div className="ld-phone-box" style={{ height: (ALTURA_TELA + MOLDURA) * escala, width: (LARGURA_TELA + MOLDURA) * escala }}>
              <div className="ld-phone" id="ld-telefone" role="tabpanel" aria-label={`O app do SIMA na tela ${atual.nome}`} style={{ transform: `scale(${escala})` }}>
                <div className="ld-screen">
                  {origem ? (
                    <iframe ref={quadro} className="ld-quadro" src={`${origem}#/`} title="App do SIMA: mapa de risco de alagamento"
                      allow="geolocation" onLoad={() => setAberto(true)} />
                  ) : null}
                  {/* Capa: aparece enquanto o app não abriu (ou quando a pessoa precisa pedir para abrir). */}
                  <div className={aberto ? "ld-capa ld-capa-some" : "ld-capa"} aria-hidden={aberto}>
                    <MarcaTampa nivel={3} tamanho={72} />
                    {economia && !origem ? (
                      <>
                        <p className="small">O app é um mapa: abrir aqui gasta alguns megabytes de dados.</p>
                        <button type="button" className="btn btn-bone" onClick={abrirApp}>Abrir aqui</button>
                      </>
                    ) : (
                      <p className="small">Abrindo o app…</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Em tela estreita o telefone é só vitrine: o toque abre o app inteiro. */}
              <a className="ld-toque" href={telaDoApp(atual.rota)} aria-label={`Abrir o app do SIMA na tela ${atual.nome}`} />
            </div>
            <a className="ld-seta" href={telaDoApp(atual.rota)}>Abrir o app em tela cheia<IconeSeta pequeno /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
