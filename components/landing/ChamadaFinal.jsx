// Fecho da página: o convite para abrir o mapa e os telefones de emergência.
import { CONFIG } from "@/lib/config";

export default function ChamadaFinal() {
  return (
    <section className="ld-faixa ld-final tread thm-dark">
      <div className="wrap">
        <h2 className="ld-h2 ld-h2-grande">Na próxima chuva,<br />saia de casa sabendo.</h2>
        <div className="ld-cta">
          <a className="btn btn-bone" href={CONFIG.urlApp}>Abrir o mapa</a>
          <a className="btn btn-iron" href={CONFIG.urlSensor}>Ver o sensor ao vivo</a>
        </div>
        <p className="small ld-emergencia">
          Em situação de emergência, ligue <a href="tel:199"><b>199</b></a> (Defesa Civil) ou{" "}
          <a href="tel:193"><b>193</b></a> (Bombeiros).
        </p>
      </div>
    </section>
  );
}
