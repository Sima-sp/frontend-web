"use client";
// Topo da página: a frase do projeto e a tampa de bueiro que enche conforme o clima escolhido.
//
// A tampa é a mesma ideia do app: o risco aparece na FORMA (quanto a tampa está cheia), não só na
// cor. Aqui a pessoa troca o clima da demonstração e vê um bueiro de verdade (lib/demonstracao.js)
// reagir: a água sobe, o nível muda e os dois números do cartão do app acompanham.
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { BUEIRO, CLIMAS, NIVEIS } from "@/lib/demonstracao";
import { IconeCheck, IconeChuva, IconeChuvisco, IconeSol, IconeTempestade, MarcaTampa } from "./Icones";

const ICONE_DO_CLIMA = { sol: IconeSol, chuvisco: IconeChuvisco, "chuva-forte": IconeChuva, "chuva-extrema": IconeTempestade };

/** Tampa de ferro fundido. A água sobe dentro dela conforme `agua` (0 a 100) e ganha a cor do nível. */
function TampaMonitorada({ agua, nivel }) {
  // O disco de dentro vai de y = 40 (cheio) a y = 200 (vazio).
  const topoDaAgua = 200 - 1.6 * agua;
  return (
    <svg className="ld-lid" viewBox="0 0 240 240" role="img" style={{ "--nivel": `var(--r${nivel})` }}
      aria-label={`Tampa do bueiro ${BUEIRO.codigo}, com a água em ${agua} por cento: nível ${NIVEIS[nivel].toLowerCase()}`}>
      <defs>
        <clipPath id="ld-disc"><circle cx="120" cy="120" r="80" /></clipPath>
        <path id="ld-rim" d="M120,120 m-99,0 a99,99 0 1,1 198,0 a99,99 0 1,1 -198,0" />
      </defs>
      <circle cx="120" cy="120" r="116" fill="#17181a" />
      <circle cx="120" cy="120" r="112" fill="#202225" stroke="#45484c" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="88" fill="#1b1d1f" stroke="#2e3134" strokeWidth="10" />
      <g fill="#45484c">
        <circle cx="120" cy="22" r="4.5" /><circle cx="218" cy="120" r="4.5" />
        <circle cx="120" cy="218" r="4.5" /><circle cx="22" cy="120" r="4.5" />
      </g>
      <text fontFamily="Big Shoulders Display, Arial Narrow, sans-serif" fontWeight="700" fontSize="13" letterSpacing="3.4" fill="#a4a7ab">
        <textPath href="#ld-rim" startOffset="2%">SIMA · SÃO PAULO · BUEIRO {BUEIRO.codigo} · {BUEIRO.bairro.toUpperCase()} · MONITORADO ·</textPath>
      </text>
      <circle cx="120" cy="120" r="80" fill="#0d0e11" />
      <g clipPath="url(#ld-disc)">
        <rect className="ld-water" x="20" y="0" width="200" height="240" style={{ transform: `translateY(${topoDaAgua}px)` }} />
        <g stroke="#0d0e11" strokeWidth="9" strokeLinecap="round">
          <path d="M80 46v148" /><path d="M100 42v156" /><path d="M120 40v160" /><path d="M140 42v156" /><path d="M160 46v148" />
        </g>
      </g>
      <circle className="ld-aro" cx="120" cy="120" r="80" fill="none" strokeWidth="3" />
    </svg>
  );
}

export default function Hero() {
  const [climaId, setClimaId] = useState("sol");
  const mexeu = useRef(false);
  const clima = CLIMAS.find((c) => c.id === climaId);

  // Ao abrir, a chuva forte chega sozinha: a página mostra de saída a tampa enchendo. Quem já
  // escolheu um clima não é atropelado; quem pediu menos movimento vê o resultado sem a subida
  // (o CSS já tira a animação).
  useEffect(() => {
    const relogio = setTimeout(() => { if (!mexeu.current) setClimaId("chuva-forte"); }, 900);
    return () => clearTimeout(relogio);
  }, []);
  const escolher = (id) => { mexeu.current = true; setClimaId(id); };

  return (
    <section className="ld-concreto thm-light" id="topo">
      <div className="wrap ld-hero">
        <div>
          <h1 className="ld-h1">O bueiro avisa antes que a rua alague.</h1>
          <p className="ld-lead">
            O SIMA mede a água dentro dos bueiros de São Paulo, estima a chance de alagar nas próximas 3 horas e
            mostra, no mapa, o caminho de carro que desvia dos pontos em risco.
          </p>
          <div className="ld-cta">
            <a className="btn btn-bone" href={CONFIG.urlApp}>Abrir o mapa</a>
            <a className="btn btn-iron" href="#como-funciona">Ver como funciona</a>
          </div>
          <ul className="ld-checks">
            <li><IconeCheck />Aberto, sem cadastro</li>
            <li><IconeCheck />Funciona no navegador do celular</li>
          </ul>
        </div>

        <div className="ld-lidwrap">
          <div className="seg ld-clima" role="group" aria-label="Clima da demonstração">
            {CLIMAS.map((c) => {
              const Icone = ICONE_DO_CLIMA[c.id];
              return (
                <button key={c.id} type="button" aria-pressed={c.id === climaId} aria-label={c.rotulo} title={c.rotulo} onClick={() => escolher(c.id)}>
                  <Icone pequeno /><span>{c.rotulo}</span>
                </button>
              );
            })}
          </div>

          <div className="ld-palco thm-dark">
            <TampaMonitorada agua={clima.agua} nivel={clima.nivel} />
            <div className="ld-leitura" aria-live="polite">
              <div className="ld-leitura-topo">
                <span className="stamp">{BUEIRO.codigo}</span>
                <span className={`rb rb-${clima.nivel}`}><MarcaTampa nivel={clima.nivel} />{NIVEIS[clima.nivel]}</span>
              </div>
              <p className="small">{BUEIRO.endereco} · {BUEIRO.bairro}</p>
              <dl className="ld-fatos">
                <div>
                  <dt>Água no bueiro</dt>
                  <dd className="ld-num">{clima.agua}%</dd>
                  <dd className="micro">medida pelo sensor</dd>
                </div>
                <div>
                  <dt>Chance em 3 h</dt>
                  <dd className="ld-num">{clima.chance}</dd>
                  <dd className="micro">prevista pela IA</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="ld-nota">
            {clima.rotulo}, {clima.chuva}. O lugar é real; a leitura e a chuva são de demonstração.
          </p>
        </div>
      </div>
    </section>
  );
}
