import Image from "next/image";
import { site } from "@/content/site";
import styles from "./Cafe.module.css";

export function Cafe() {
  return (
    <section className={styles.section} aria-labelledby="cafe-title">
      <div className={styles.inner}>
        <div className={styles.photo}>
          <Image
            src="/img/casa/cafe.jpg"
            alt="Alguien sirve café de una prensa francesa en una taza blanca"
            width={720}
            height={720}
            sizes="(max-width: 860px) 100vw, 40vw"
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="cafe-title">Venís por un café y te quedás un rato más</h2>
          <p className={styles.text}>
            En el medio de la casa está el cafecito: café, chipá, brownies y muffins para frenar entre sala y sala, o
            para juntarte con alguien sin mirar el reloj.
          </p>
          <p className={styles.hours}>{site.hours.cafe}, todos los días</p>

          <div className={styles.gift}>
            <div className={styles.giftPhoto}>
              <Image
                src="/img/casa/giftcard.jpg"
                alt="Gift card de Casa Costa con una postal a rayas"
                width={640}
                height={806}
                sizes="8rem"
              />
            </div>
            <div>
              <h3 className={styles.giftTitle}>¿Para regalar?</h3>
              <p className={styles.giftText}>
                La gift card de Casa Costa sirve en cualquier marca de la casa. Que elija ella, o él, lo que más le guste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
