import { site } from "@/content/site";
import { OpenStatus } from "@/components/ui/OpenStatus";
import styles from "./Visit.module.css";

const entrances = [
  { name: "Principal", where: "en la esquina de Erausquin y 9 de Julio" },
  { name: "Con rampa", where: "por calle Erausquin" },
  { name: "Por el patiecito", where: "sobre 9 de Julio, entre verdes" },
];

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

        <dl className={styles.data}>
          <div>
            <dt>Horario</dt>
            <dd>
              {site.hours.label}
              <br />
              {site.hours.cafe}
              <OpenStatus className={styles.status} />
            </dd>
          </div>
          <div>
            <dt>Entradas</dt>
            <dd>
              <ul>
                {entrances.map((entrance) => (
                  <li key={entrance.name}>
                    <strong>{entrance.name}</strong>, {entrance.where}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

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
