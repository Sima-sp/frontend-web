// O bueiro que ilustra o topo da página, em cada clima da demonstração.
//
// O LUGAR É REAL: MO-06, na Av. Alcântara Machado (Mooca), é um dos 136 pontos de alagamento
// recorrente que o modelo de IA do projeto conhece.
// AS LEITURAS E A CHUVA SÃO SIMULADAS: são exatamente os números que o app mostra para este
// bueiro em cada clima da demonstração (mobile-app/src/dados/demo.js). Copiados em 06/10/2026;
// se a regra da demonstração do app mudar, atualize aqui para a página e o app dizerem o mesmo.

export const BUEIRO = { codigo: "MO-06", endereco: "Av. Alcântara Machado", bairro: "Mooca", id: "24" };

/** Nome de cada nível de risco (1 a 4), igual ao do app. */
export const NIVEIS = { 1: "Baixo", 2: "Médio", 3: "Alto", 4: "Crítico" };

/**
 * agua     quanto do bueiro está cheio, em % (no sistema completo, medido pelo sensor)
 * chance   chance de alagar nas próximas 3 horas, como o app escreve (prevista pela IA)
 * nivel    1 a 4
 * chuva    chuva das últimas 3 horas no lugar
 */
export const CLIMAS = [
  { id: "sol", rotulo: "Sol", agua: 12, chance: "< 0,1%", nivel: 1, chuva: "sem chuva" },
  { id: "chuvisco", rotulo: "Chuvisco", agua: 22, chance: "0,2%", nivel: 1, chuva: "3 mm em 3 h" },
  { id: "chuva-forte", rotulo: "Chuva forte", agua: 59, chance: "1,5%", nivel: 3, chuva: "38 mm em 3 h" },
  { id: "chuva-extrema", rotulo: "Chuva extrema", agua: 91, chance: "61%", nivel: 4, chuva: "89 mm em 3 h" },
];
