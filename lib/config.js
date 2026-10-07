// Links e textos que mudam de ambiente para ambiente.
// Defina no arquivo .env.local (veja .env.example). Tudo tem valor padrão: a página abre sem configuração.

/** Endereço do app publicado, sempre terminando em "/". */
const urlApp = (process.env.NEXT_PUBLIC_URL_APP || "https://sima-sp.github.io/mobile-app/").replace(/\/*$/, "/");

export const CONFIG = {
  /** O app (mapa de risco). É para onde vão os botões "Abrir o mapa" e o que aparece no telefone da página. */
  urlApp,
  /** O painel do sensor: página separada do app que mostra o protótipo funcionando. */
  urlSensor: `${urlApp}sensor.html`,
  instituicao: process.env.NEXT_PUBLIC_INSTITUICAO || "Etec Professor Horácio Augusto da Silveira",
  email: process.env.NEXT_PUBLIC_EMAIL || "guirosseto08@gmail.com",
  repositorio: process.env.NEXT_PUBLIC_REPOSITORIO || "https://github.com/Sima-sp",
  /** Subpasta em que a página é publicada (ex.: "/frontend-web" no GitHub Pages). Vazio = raiz. */
  caminhoBase: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

/** Endereço de uma tela do app. O app usa "#" nas rotas: telaDoApp("/ia") abre "Como a IA funciona". */
export const telaDoApp = (rota) => `${CONFIG.urlApp}#${rota}`;
