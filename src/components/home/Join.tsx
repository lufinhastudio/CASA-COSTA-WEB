import Image from "next/image";
import { joinSteps, site } from "@/content/site";
import styles from "./Join.module.css";

export function Join() {
  return (
    <section className={styles.section} id="sumate" aria-labelledby="join-title">
      <div className={styles.engraving} aria-hidden="true">
        <Image src="/img/casa/grabado-parra.jpg" alt="" width={963} height={600} sizes="(max-width: 860px) 100vw, 40vw" data-drift />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title} id="join-title">¿Tenés una marca? Hay lugar en la casa</h2>
        <p className={styles.text}>
          Casa Costa funciona por consignación: no necesitás alquilar un local ni estar detrás del mostrador. Vos te
          ocupás de tus productos y la casa de venderlos.
        </p>

        <ol className={styles.steps}>
          {joinSteps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <a className="btn" href={site.instagram.dm} target="_blank" rel="noreferrer">
          Consultar por un espacio
        </a>
      </div>
    </section>
  );
}
