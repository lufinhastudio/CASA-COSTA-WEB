import { PalmMark } from "@/components/ui/PalmMark";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Mismo cierre que usan las historias de la marca: palmera, año y nombre */}
      <div className={styles.lockup}>
        <div className={styles.mark}>
          <span className={styles.est}>Est.</span>
          <PalmMark className={styles.palm} />
          <span className={styles.year}>2026</span>
        </div>
        <p className={styles.name}>Casa Costa</p>
        <p className={styles.tagline}>{site.tagline}</p>
      </div>

      <div className={styles.bottom}>
        <p>{site.address.street}, Concepción del Uruguay</p>
        <a className="text-link" href={site.instagram.url} target="_blank" rel="noreferrer">
          Instagram @{site.instagram.handle}
        </a>
        <p className={styles.credit}>Propuesta de sitio por Lufinha Studio</p>
      </div>
    </footer>
  );
}
