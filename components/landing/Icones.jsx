// Ícones de traço usados na landing: a mesma grade 24×24 e os mesmos desenhos do app
// (mobile-app/src/componentes/Icones.jsx).
function Icone({ pequeno = false, children }) {
  return (
    <svg className={pequeno ? "ico ico-sm" : "ico"} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

const NUVEM = "M7 14.5a3.6 3.6 0 0 1 .4-7.18 5 5 0 0 1 9.5 1.2A3 3 0 0 1 16.6 14.5z";

export const IconeCheck = (p) => <Icone pequeno {...p}><path d="M5 12.5 9.8 17 19 7.5" /></Icone>;
export const IconeSeta = (p) => <Icone {...p}><path d="M9.5 5.5 16 12l-6.5 6.5" /></Icone>;
export const IconeSino = (p) => <Icone {...p}><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.6 2H4.4z" /><path d="M10 21h4" /></Icone>;
export const IconeFaisca = (p) => <Icone {...p}><path d="M11 4.5l1.6 4.4 4.4 1.6-4.4 1.6L11 16.5l-1.6-4.4L5 10.5l4.4-1.6z" /><path d="M18 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></Icone>;
export const IconeSensor = (p) => <Icone {...p}><rect x="7" y="4" width="10" height="8" rx="2" /><path d="M10 12v5M14 12v5" /><path d="M5 20c1.2-1 2.3-1 3.5 0s2.3 1 3.5 0 2.3-1 3.5 0 2.3 1 3.5 0" /></Icone>;
// Os quatro climas da demonstração.
export const IconeSol = (p) => <Icone {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.8 5.8l1.7 1.7M16.5 16.5l1.7 1.7M18.2 5.8l-1.7 1.7M7.5 16.5l-1.7 1.7" /></Icone>;
export const IconeChuvisco = (p) => <Icone {...p}><path d={NUVEM} /><path d="M9.5 17.6v.9M14 17.6v.9" /></Icone>;
export const IconeChuva = (p) => <Icone {...p}><path d={NUVEM} /><path d="M8.6 17.2l-.9 2.6M12.2 17.2l-.9 2.6M15.8 17.2l-.9 2.6" /></Icone>;
export const IconeTempestade = (p) => <Icone {...p}><path d={NUVEM} /><path d="M12.6 15.6 10.4 19h3l-1.6 3.2" /><path d="M7.6 17.4l-.8 2.2M17 17.4l-.8 2.2" /></Icone>;

/** Tampa de bueiro que "enche" conforme o nível (1 = baixo … 4 = crítico). A cor vem do tema da faixa. */
export function MarcaTampa({ nivel, tamanho = 18 }) {
  const y = (21.2 - 18.4 * ({ 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 }[nivel] ?? 0)).toFixed(1);
  const cor = `var(--r${nivel})`;
  return (
    <svg className="lidmark" width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.6" style={{ fill: "var(--lid-bg)", stroke: cor }} strokeWidth="2.2" />
      <rect x="0" y={y} width="24" height="24" style={{ fill: cor }} clipPath="url(#sima-lid-clip)" />
      <path d="M8.4 3.8v16.4M12 2.8v18.4M15.6 3.8v16.4" strokeWidth="1.5" fill="none" style={{ stroke: "var(--lid-bg)" }} />
    </svg>
  );
}

/** Define o recorte circular usado pelas marcas de tampa. Renderizar uma vez por página. */
export const DefinicoesSvg = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <clipPath id="sima-lid-clip" clipPathUnits="userSpaceOnUse"><circle cx="12" cy="12" r="9.2" /></clipPath>
    </defs>
  </svg>
);
