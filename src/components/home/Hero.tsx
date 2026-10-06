import Image from "next/image";
import { site } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.place} data-hero-step="0">
          9 de Julio y Erausquin, Concepción del Uruguay
        </p>
        <h1 className={styles.title} id="hero-title" data-hero-step="1">
          Una nueva manera de vivir la ciudad
        </h1>
        <p className={styles.lead} data-hero-step="2">
          Un espacio donde conviven diseño, gastronomía, cultura y comunidad. Pensado para descubrir, compartir y
          vivir la ciudad de una manera diferente.
        </p>
        <div className={styles.actions} data-hero-step="3">
          <a className="btn" href="#la-casa">Recorré la casa</a>
          <a className="btn btn--ghost" href={site.address.mapsUrl} target="_blank" rel="noreferrer">
            Cómo llegar
          </a>
        </div>
      </div>

      <figure className={styles.media}>
        <div className={styles.photo}>
          <Image
            src="/img/casa/bolsas.jpg"
            alt="Bolsas de papel kraft con la palmera de Casa Costa, sobre una mesa de madera"
            width={1151}
            height={1600}
            priority
            sizes="(max-width: 860px) 100vw, 45vw"
          />
        </div>
      </figure>

      <ul className={styles.facts} data-hero-step="4">
        <li>Abierto todos los días, de {site.hours.open} a {site.hours.close} hs</li>
        <li>Unas 30 marcas locales bajo un mismo techo</li>
        <li>Cafetería con cosas ricas, de 8 a 20 hs</li>
        <li>Talleres y clases todas las semanas</li>
      </ul>
    </section>
  );
}
