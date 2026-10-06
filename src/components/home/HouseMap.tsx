"use client";

import { useState } from "react";
import Image from "next/image";
import { spaces } from "@/content/site";
import styles from "./HouseMap.module.css";

export function HouseMap() {
  const [activeId, setActiveId] = useState(spaces[0].id);
  const active = spaces.find((space) => space.id === activeId) ?? spaces[0];

  return (
    <section className={styles.section} id="la-casa" aria-labelledby="map-title">
      <header className={styles.head}>
        <h2 className={styles.title} id="map-title">Recorré la casa</h2>
        <p className={styles.intro}>
          La casa ocupa la esquina de 9 de Julio y Erausquin. Tocá un punto del plano para ver qué hay en cada lugar.
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.mapFrame}>
          <div className={styles.map}>
            <Image
              src="/img/casa/mapa.jpg"
              alt="Ilustración de Casa Costa vista desde arriba, en la esquina de 9 de Julio y Erausquin, con sus entradas, el patio y El Laboratorio"
              width={1400}
              height={788}
              sizes="(max-width: 960px) 100vw, 62vw"
            />
            {spaces.map((space) => (
              <button
                key={space.id}
                type="button"
                className={styles.pin}
                style={{ left: `${space.x}%`, top: `${space.y}%` }}
                aria-label={space.name}
                aria-pressed={space.id === activeId}
                onClick={() => setActiveId(space.id)}
              >
                <span className={styles.pinLabel} aria-hidden="true">{space.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <ul className={styles.list} aria-label="Lugares de la casa">
            {spaces.map((space) => (
              <li key={space.id}>
                <button
                  type="button"
                  aria-pressed={space.id === activeId}
                  onClick={() => setActiveId(space.id)}
                >
                  {space.name}
                </button>
              </li>
            ))}
          </ul>

          <article className={styles.detail} key={active.id} aria-live="polite">
            <div className={styles.detailImage}>
              <Image
                src={active.image.src}
                alt={active.image.alt}
                width={active.image.width}
                height={active.image.height}
                sizes="(max-width: 960px) 40vw, 16vw"
              />
            </div>
            <div>
              <h3 className={styles.detailTitle}>{active.name}</h3>
              <p className={styles.detailText}>{active.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
