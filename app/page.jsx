// A página: as seções, na ordem em que a história é contada.
import Cabecalho from "@/components/landing/Cabecalho";
import Hero from "@/components/landing/Hero";
import ComoFunciona from "@/components/landing/ComoFunciona";
import AppPorDentro from "@/components/landing/AppPorDentro";
import Ia from "@/components/landing/Ia";
import Sensor from "@/components/landing/Sensor";
import Projeto from "@/components/landing/Projeto";
import ChamadaFinal from "@/components/landing/ChamadaFinal";
import Rodape from "@/components/landing/Rodape";
import { DefinicoesSvg } from "@/components/landing/Icones";

export default function Pagina() {
  return (
    <div className="ld">
      <DefinicoesSvg />
      <Cabecalho />
      <main>
        <Hero />
        <ComoFunciona />
        <AppPorDentro />
        <Ia />
        <Sensor />
        <Projeto />
        <ChamadaFinal />
      </main>
      <Rodape />
    </div>
  );
}
