import { PalmMark } from "@/components/ui/PalmMark";
import styles from "./PalmDivider.module.css";

/* Pausa entre secciones: la palmera de la marca entre dos líneas finas */
export function PalmDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.line} />
      <PalmMark className={styles.palm} />
      <span className={styles.line} />
    </div>
  );
}
