"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import styles from "./OpenStatus.module.css";

/* Hora actual en Argentina (la casa está en Entre Ríos, UTC-3). */
function argentinaHour() {
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  return Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
}

export function OpenStatus({ className }: { className?: string }) {
  const { open, close } = site.hours;
  /* null = todavía no sabemos la hora (SSR): mostramos el horario fijo. */
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const hour = argentinaHour();
      setIsOpen(hour >= open && hour < close);
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [open, close]);

  const label =
    isOpen === null ? `Todos los días, ${open} a ${close} hs` : isOpen ? `Abierto hasta las ${close} hs` : `Abre a las ${open} hs`;

  return (
    <p className={`${styles.status} ${className ?? ""}`} data-open={isOpen === true ? "" : undefined}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </p>
  );
}
