// "Da chuva até o seu caminho": os três tempos do sistema, ligados por um cano (a água passa por
// todos). A ordem é a do dado: o sensor mede, a IA prevê, o app avisa.
import { IconeFaisca, IconeSensor, IconeSino } from "./Icones";

const PASSOS = [
  {
    icone: <IconeSensor />,
    titulo: "Medir",
    texto: "Um sensor preso embaixo da tampa mede a distância até a água: quanto menor, mais cheio está o bueiro. No protótipo, um ESP32 envia a medida pelo Wi-Fi a cada 2 segundos.",
  },
  {
    icone: <IconeFaisca />,
    titulo: "Prever",
    texto: "Uma IA treinada com 12.621 alagamentos registrados desde 2011 junta a chuva das últimas horas, o histórico do lugar e a água medida, e estima a chance de alagar nas próximas 3 horas.",
  },
  {
    icone: <IconeSino />,
    titulo: "Avisar",
    texto: "No mapa, a tampa de cada bueiro enche conforme o risco, as ruas em volta dos pontos em risco ficam pintadas, cada região ganha o seu aviso e a rota de carro desvia do que está cheio.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="ld-faixa ld-ferro thm-dark" id="como-funciona">
      <div className="wrap">
        <h2 className="ld-h2">Da chuva até o seu caminho</h2>
        <p className="sub ld-abre-secao">
          Cada bueiro monitorado tem um sensor que mede o que importa dentro dele. O resto é o sistema transformando
          essa medida em uma decisão: sair agora, esperar ou ir por outro caminho.
        </p>
        <ol className="ld-passos">
          {PASSOS.map((p) => (
            <li className="ld-passo" key={p.titulo}>
              <span className="ld-junta">{p.icone}</span>
              <h3>{p.titulo}</h3>
              <p className="sub">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
