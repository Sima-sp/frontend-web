// "O sensor": o protótipo de hardware, com o desenho do bueiro em corte (o mesmo do painel do
// sensor do app) e o que ele já faz e ainda não faz.
import { CONFIG } from "@/lib/config";
import { IconeSeta } from "./Icones";

/**
 * Bueiro em corte: a rua, a tampa, o sensor preso embaixo dela e a água. As três marcas na parede
 * são as distâncias em que o nível muda no painel do sensor (60, 45 e 30 cm; o sensor mede de
 * 20 cm a 2000 cm, e por isso o crítico começa acima de 20). O desenho é fixo, com a água em
 * 38 cm: nível alto.
 */
function BueiroEmCorte() {
  const SENSOR = 62;
  const FUNDO = 190;
  const yDe = (cm) => SENSOR + (Math.min(cm, 85) / 85) * (FUNDO - SENSOR);
  const agua = yDe(38);
  return (
    <svg className="ld-corte" viewBox="0 0 320 212" role="img"
      aria-label="Desenho de um bueiro em corte: o sensor fica embaixo da tampa e mede 38 centímetros até a água, o que corresponde ao nível alto">
      <rect x="0" y="50" width="92" height="162" className="ld-corte-terra" />
      <rect x="228" y="50" width="92" height="162" className="ld-corte-terra" />
      <rect x="92" y="196" width="136" height="16" className="ld-corte-terra" />
      <rect x="92" y="50" width="136" height="146" className="ld-corte-oco" />
      <rect x="92" y={agua} width="136" height={196 - agua} className="ld-corte-agua" />
      {[[4, 30, "crítico"], [3, 45, "alto"], [2, 60, "médio"]].map(([n, cm, nome]) => (
        <g key={n}>
          <path d={`M92 ${yDe(cm)}h18`} style={{ stroke: `var(--r${n})` }} className="ld-corte-marca" />
          <text x="84" y={yDe(cm) + 4} textAnchor="end" className="ld-corte-letra">{nome}</text>
        </g>
      ))}
      <rect x="0" y="40" width="320" height="10" className="ld-corte-rua" />
      <rect x="92" y="38" width="136" height="12" rx="2" className="ld-corte-tampa" />
      <path d="M104 40v8M118 40v8M132 40v8M146 40v8M160 40v8M174 40v8M188 40v8M202 40v8M216 40v8" className="ld-corte-frestas" />
      <path d="M174 56h36V30h42" className="ld-corte-fio" />
      <rect x="252" y="18" width="52" height="24" rx="5" className="ld-corte-placa" />
      <text x="278" y="34" textAnchor="middle" className="ld-corte-letra">ESP32</text>
      <rect x="146" y="50" width="28" height="12" rx="3" className="ld-corte-sensor" />
      <text x="20" y="33" className="ld-corte-letra">rua</text>
      <text x="84" y="60" textAnchor="end" className="ld-corte-letra">sensor</text>
      <path d={`M160 ${SENSOR}V${agua}M153 ${agua}h14`} className="ld-corte-regua" />
      <text x="238" y={(SENSOR + agua) / 2 + 5} className="ld-corte-letra ld-corte-medida">38 cm</text>
    </svg>
  );
}

export default function Sensor() {
  return (
    <section className="ld-faixa ld-ferro thm-dark" id="o-sensor">
      <div className="wrap ld-sensor">
        <div className="ld-sensor-desenho">
          <BueiroEmCorte />
        </div>
        <div>
          <h2 className="ld-h2">O sensor já mede. Falta ir para a rua.</h2>
          <p className="sub ld-abre-secao">
            O protótipo é um ESP32 com um sensor de distância apontado para baixo, como ficaria preso sob a tampa.
            Ele mede quantos centímetros faltam até a água e envia a leitura pelo Wi-Fi.
          </p>
          <dl className="ld-ficha">
            <div><dt>O que mede</dt><dd>A distância do sensor até a água, em centímetros. Só água: ele não mede lixo.</dd></div>
            <div><dt>Como vira nível</dt><dd>Quanto menor a distância, mais cheio o bueiro: médio a partir de 60 cm, alto a partir de 45 e crítico a partir de 30. O sensor mede de 20 cm a 20 m.</dd></div>
            <div><dt>O que falta</dt><dd>Ligar a leitura ao mapa. No app, por enquanto, as leituras dos bueiros são de demonstração.</dd></div>
          </dl>
          <a className="ld-seta" href={CONFIG.urlSensor}>Ver o painel do sensor<IconeSeta pequeno /></a>
        </div>
      </div>
    </section>
  );
}
