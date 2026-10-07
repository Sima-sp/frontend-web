# SIMA · Página do projeto

A página de apresentação do **SIMA-SP** (Sistema Inteligente de Monitoramento de Alagamentos em
São Paulo), feita em **Next.js** e publicada como site estático.

Ela conta o projeto em sete partes: o topo, com uma tampa de bueiro que enche conforme o clima
escolhido; como funciona (medir, prever, avisar); **o app de verdade rodando num telefone**; o
quanto a IA acerta; o protótipo do sensor; o que é de verdade e o que é simulado; e o convite
para abrir o mapa.

O app em si é outro projeto: [`Sima-sp/mobile-app`](https://github.com/Sima-sp/mobile-app),
publicado em `https://sima-sp.github.io/mobile-app/`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/
npm start        # serve a pasta out/ localmente
```

Requer Node 20 ou mais novo. As fontes são auto-hospedadas (`@fontsource`): o build funciona sem
internet. Para ver o telefone da seção "O app, por dentro" é preciso internet (ele abre o app
publicado) ou o app rodando na máquina (ver "Configuração").

## Publicar

A cada envio para a branch `main`, o GitHub Actions gera o site e publica no GitHub Pages
(`.github/workflows/publicar.yml`). O endereço fica em
`https://sima-sp.github.io/frontend-web/`.

Para isso o repositório precisa ser **público** (no plano gratuito, o Pages só publica
repositório público) e estar com o Pages ligado em **Settings → Pages → Source: GitHub Actions**.

A página vive numa subpasta (`/frontend-web`). O fluxo de publicação descobre a subpasta sozinho
e a passa em `NEXT_PUBLIC_BASE_PATH`; o `next.config.mjs` usa esse valor como `basePath`. Fora do
GitHub Pages, `npm run build` gera `out/` para a raiz de qualquer hospedagem estática.

## Configuração

Tudo é opcional e tem valor padrão (`lib/config.js`). Para mudar, copie `.env.example` para
`.env.local`:

| Variável | Para quê | Padrão |
|---|---|---|
| `NEXT_PUBLIC_URL_APP` | Endereço do app: destino dos botões e o que aparece no telefone | `https://sima-sp.github.io/mobile-app/` |
| `NEXT_PUBLIC_BASE_PATH` | Subpasta em que a página é publicada | vazio (raiz) |
| `NEXT_PUBLIC_INSTITUICAO` | Nome da escola no texto do projeto e no rodapé | Etec Professor Horácio Augusto da Silveira |
| `NEXT_PUBLIC_EMAIL` | Contato do rodapé | o e-mail do grupo em `lib/config.js` |
| `NEXT_PUBLIC_REPOSITORIO` | Link para o código | `https://github.com/Sima-sp` |

Para ver a página com o app da sua máquina no telefone: rode o app (`npm run demo` na pasta
dele) e use `NEXT_PUBLIC_URL_APP=http://localhost:5173/`.

## Estrutura

```
app/
  layout.jsx            fontes, <head> e metadados
  page.jsx              monta as seções na ordem
  globals.css           importa os dois arquivos de styles/
components/landing/     uma seção por arquivo
  Cabecalho.jsx         a marca, os atalhos e o botão "Abrir o mapa"
  Hero.jsx              o topo: a frase e a tampa que enche conforme o clima escolhido
  ComoFunciona.jsx      medir, prever, avisar, ligados por um cano
  AppPorDentro.jsx      o app de verdade num telefone (iframe) e a lista de telas
  Ia.jsx                o quanto a IA acerta, com os números dos testes
  Sensor.jsx            o protótipo do sensor e o desenho do bueiro em corte
  Projeto.jsx           o que é de verdade e o que é simulado na demonstração
  ChamadaFinal.jsx      o convite final e os telefones de emergência
  Rodape.jsx
  Icones.jsx            ícones e a marca da "tampa que enche"
lib/
  config.js             endereços e textos que mudam por ambiente
  demonstracao.js       o bueiro do topo (MO-06) e os números dele em cada clima
styles/
  base.css              tokens dos dois temas (os mesmos do app) e componentes compartilhados
  landing.css           estilos da página (prefixo ld-)
public/logo-bone.png    a marca
.github/workflows/      publicação no GitHub Pages
```

## O app dentro da página

A seção "O app, por dentro" não tem telas de imitação: o telefone é um `<iframe>` com o app
publicado.

- **Ele passeia sozinho.** O app é aberto com `?vitrine=1`, que liga o *modo vitrine* dele só
  para aquela visita: troca o clima, mostra a cidade, aproxima de um bueiro em risco. Para no
  primeiro toque. (No app: `src/telas/useVitrine.js`.)
- **A lista troca a tela de verdade.** Cada item muda só o `#...` do endereço do iframe (o app
  usa rotas com `#`, então troca de tela sem recarregar) e manda `postMessage("sima:usar")`, que
  o app entende como um toque: o passeio para.
- **Carrega só quando chega perto.** O app é um mapa e pesa; ele só é pedido quando a seção se
  aproxima da tela. Com economia de dados ligada no aparelho, a página pergunta antes.
- **No celular é vitrine.** Em tela estreita o telefone não recebe toque (o mapa prenderia a
  rolagem da página): ele só mostra o passeio, e um toque abre o app inteiro.
- **Menos movimento.** Quem pediu isso ao aparelho recebe o app parado, sem o passeio, e a tampa
  do topo muda sem animação.

## Conteúdo: o que a página afirma

A página e o app precisam dizer a mesma coisa. Onde cada afirmação vive:

- **Os números do topo** (`lib/demonstracao.js`): são os que o app mostra para o bueiro MO-06 em
  cada clima da demonstração. Se a regra da demonstração do app mudar, atualize o arquivo.
- **O quanto a IA acerta** (`Ia.jsx`): os mesmos textos da tela "Como a IA funciona" do app
  (31 de cada 100 alagamentos avisados, em média 2,4 horas antes; por região acerta 5 vezes mais).
- **O sensor** (`Sensor.jsx`): o protótipo mede a distância até a água (só água, não mede lixo);
  os limites de 45, 30 e 20 cm são os do servidor do sensor.
- **O que é de verdade** (`Projeto.jsx`): os lugares, a IA, as ruas e as rotas e o protótipo são
  reais; as leituras dos bueiros e o clima são simulados. Num sistema de risco, dizer o que é
  inventado importa tanto quanto mostrar o que funciona.
- **Janela de previsão = 3 horas** em todo lugar: é o horizonte do modelo de IA.

## Cores e desenho

- **Regra de cor do projeto: cinza é a rua, azul é a água e a ação.** As superfícies são neutras
  (concreto nas faixas claras, ferro nas escuras); o azul aparece só nos botões, nos links e na
  água; as quatro cores de risco aparecem só onde há risco.
- Os tokens de `styles/base.css` são os mesmos do app. As faixas trocam de tema com as classes
  `.thm-light` (concreto) e `.thm-dark` (ferro).
- Títulos no carimbo (Big Shoulders, caixa alta); texto em Atkinson Hyperlegible Next.
- O movimento da página é um só: a água subindo na tampa do topo.
- Contraste de texto conferido (WCAG AA) em todas as seções, em computador e celular.

## Histórico

- **21/09/2026:** primeira versão, portada do canvas "SIMA · app e site", com telas de imitação
  do app e uma seção de bairros com números de demonstração.
- **06/10/2026:** refeita para acompanhar o projeto. Saíram o lixo (o sensor mede só água), as
  telas de imitação (entrou o app de verdade), a seção de bairros com números inventados e a
  paleta azulada (entrou a paleta neutra do app). Entraram a tampa que reage ao clima, as
  seções da IA, do sensor e do que é de verdade, os links reais e a publicação no GitHub Pages.
