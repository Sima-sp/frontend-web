// Cabeçalho: a marca, os atalhos para as seções e o botão que abre o app.
import Image from "next/image";
import { CONFIG } from "@/lib/config";

const LINKS = [
  { href: "#como-funciona", texto: "Como funciona" },
  { href: "#o-app", texto: "O app" },
  { href: "#a-ia", texto: "A IA" },
  { href: "#o-sensor", texto: "O sensor" },
  { href: "#projeto", texto: "O projeto" },
];

export default function Cabecalho() {
  return (
    <header className="tread thm-dark">
      <div className="wrap ld-nav">
        <a href="#topo" aria-label="SIMA, início da página" className="ld-logo">
          <Image src={`${CONFIG.caminhoBase}/logo-bone.png`} alt="SIMA" width={64} height={38} priority />
        </a>
        <nav className="ld-links" aria-label="Seções da página">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.texto}</a>
          ))}
        </nav>
        <a className="btn btn-bone ld-nav-cta" href={CONFIG.urlApp}>Abrir o mapa</a>
      </div>
    </header>
  );
}
