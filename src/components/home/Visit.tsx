import { site } from "@/content/site";
import styles from "./Visit.module.css";

export function Visit() {
  return (
    <section className={styles.section} id="visitanos" aria-labelledby="visit-title">
      <div className={styles.info}>
        <h2 className={styles.title} id="visit-title">Te esperamos en la esquina</h2>
        <address className={styles.address}>
          {site.address.street}
          <br />
          {site.address.city}
        </address>

        <div className={styles.actions}>
          <a className="btn" href={site.address.mapsUrl} target="_blank" rel="noreferrer">Abrir en Google Maps</a>
          <a className="btn btn--ghost" href={site.instagram.url} target="_blank" rel="noreferrer">
            @{site.instagram.handle}
          </a>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          title="Mapa de Casa Costa, 9 de Julio 500, Concepción del Uruguay"
          src={site.address.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
