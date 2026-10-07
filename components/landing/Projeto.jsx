// "O projeto": o que nesta demonstração é de verdade e o que é simulado, e de onde o SIMA vem.
// Num sistema de risco, dizer o que é inventado importa tanto quanto mostrar o que funciona.
import { CONFIG } from "@/lib/config";

const DE_VERDADE = [
  ["Os lugares", "Os 136 pontos do mapa são locais de alagamento recorrente da capital, com o histórico de cada um."],
  ["A IA", "Foi treinada com 12.621 alagamentos registrados em São Paulo desde 2011 e testada em anos que não tinha visto."],
  ["As ruas e as rotas", "O mapa é o do OpenStreetMap, e o caminho que desvia dos bueiros em risco é traçado de verdade."],
  ["O sensor", "O protótipo mede a distância até a água e envia a leitura, na bancada."],
];
const SIMULADO = [
  ["As leituras dos bueiros", "Ainda não há sensores na rua: a água de cada bueiro do mapa é gerada pela demonstração."],
  ["O clima", "Sol, chuvisco, chuva forte e chuva extrema são escolhidos na tela, para mostrar como o sistema reage."],
];

function Lista({ itens }) {
  return (
    <dl className="ld-lista">
      {itens.map(([termo, texto]) => (
        <div key={termo}><dt>{termo}</dt><dd>{texto}</dd></div>
      ))}
    </dl>
  );
}

export default function Projeto() {
  return (
    <section className="ld-faixa ld-concreto thm-light" id="projeto">
      <div className="wrap">
        <h2 className="ld-h2">O que aqui é de verdade</h2>
        <p className="sub ld-abre-secao">
          O SIMA é o Trabalho de Conclusão de Curso de um grupo da {CONFIG.instituicao}, em 2026. O app que você
          abre nesta página é uma demonstração, e ela separa o que já existe do que ainda é ensaio.
        </p>
        <div className="ld-verdade">
          <div>
            <h3>De verdade</h3>
            <Lista itens={DE_VERDADE} />
          </div>
          <div>
            <h3>Simulado, por enquanto</h3>
            <Lista itens={SIMULADO} />
            <p className="ld-codigo">
              O código do app e o do servidor são abertos: <a href={CONFIG.repositorio}>github.com/Sima-sp</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
