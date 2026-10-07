// "É chance, não certeza": o quanto a IA acerta, dito com os números dos testes do modelo.
// Os textos são os da tela "Como a IA funciona" do app, para a página e o app dizerem o mesmo.
import { telaDoApp } from "@/lib/config";
import { IconeSeta } from "./Icones";

const FATOS = [
  {
    titulo: "31 de cada 100",
    destaque: true,
    texto: "alagamentos registrados foram avisados com nível alto, em média 2,4 horas antes. A conta foi feita em anos que a IA não tinha visto no treino.",
  },
  {
    titulo: "Ela erra para o lado da cautela",
    texto: "A maioria dos avisos de nível alto não é seguida de alagamento registrado. Leia o nível como “risco acima do normal”, não como certeza.",
  },
  {
    titulo: "Por região ela acerta mais",
    texto: "Juntando os bueiros de uma região, o aviso de risco alto acerta 5 vezes mais do que o de um ponto sozinho. Por isso o app tem os avisos por região.",
  },
  {
    titulo: "O peso do sensor ainda é uma regra",
    texto: "O peso da chuva e do lugar a IA aprendeu com os registros. O da água medida foi definido pelo grupo: faltam leituras de verdade para ela aprender sozinha.",
  },
  {
    titulo: "O que ela não vê",
    texto: "A chuva chega a ela como estimativa para áreas de alguns quilômetros: uma pancada muito localizada pode passar sem aviso. E os registros de alagamento cobrem melhor as avenidas do que as ruas de bairro.",
  },
];

export default function Ia() {
  return (
    <section className="ld-faixa ld-concreto thm-light" id="a-ia">
      <div className="wrap ld-ia">
        <div className="ld-ia-frase">
          <h2 className="ld-h2">É chance, não certeza.</h2>
          <p className="sub ld-abre-secao">
            Nenhuma previsão de alagamento acerta sempre. O SIMA mostra a chance como ela é e diz, com os números
            dos testes, o quanto dá para confiar nela.
          </p>
          <a className="ld-seta" href={telaDoApp("/ia")}>Mexer no simulador da IA<IconeSeta pequeno /></a>
        </div>
        <ul className="ld-ia-fatos">
          {FATOS.map((f) => (
            <li key={f.titulo}>
              <h3 className={f.destaque ? "ld-ia-numero" : undefined}>{f.titulo}</h3>
              <p>{f.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
