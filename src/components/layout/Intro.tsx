"use client";

import { useEffect, useState } from "react";
import { PalmMark } from "@/components/ui/PalmMark";
import { site } from "@/content/site";
import styles from "./Intro.module.css";

/* Intro con el logo: se repite en cada carga de la página.
   - La animación es 100% CSS (si no hay JS, igual termina y se levanta sola).
   - El script inline de layout.tsx marca <html data-intro="seen"> antes de pintar
     si se pidió reducir el movimiento.
   Los tiempos tienen que coincidir con Intro.module.css. */
const LIFT_END_MS = 3000;     // la cortina terminó de subir
const ENTRANCE_END_MS = 4600; // terminó también la entrada del hero

const WORD = "CASA COSTA".split("");

export function Intro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === "reload";
    if (isReload) window.scrollTo(0, 0);
    if (root.dataset.intro === "seen") {
      setMounted(false);
      return;
    }

    root.style.overflow = "hidden";

    const unlock = window.setTimeout(() => {
      if (isReload) window.scrollTo(0, 0);
      root.style.removeProperty("overflow");
    }, 2300);
    const unmount = window.setTimeout(() => setMounted(false), LIFT_END_MS);
    // Recién al final se marca como vista: cambiarlo antes alteraría los delays del hero en curso.
    const settle = window.setTimeout(() => { root.dataset.intro = "seen"; }, ENTRANCE_END_MS);

    return () => {
      window.clearTimeout(unlock);
      window.clearTimeout(unmount);
      window.clearTimeout(settle);
      root.style.removeProperty("overflow");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.lockup}>
        <div className={styles.mark}>
          <span className={styles.est}>Est.</span>
          <PalmMark className={styles.palm} />
          <span className={styles.year}>2026</span>
        </div>
        <p className={styles.name}>
          {WORD.map((letter, index) => (
            <span key={index} style={{ "--i": index } as React.CSSProperties}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
        <p className={styles.tagline}>{site.tagline}</p>
      </div>
    </div>
  );
}
