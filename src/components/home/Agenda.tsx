"use client";

import { useEffect, useRef, useState } from "react";
import { agenda, agendaMonth, site, weekly } from "@/content/site";
import styles from "./Agenda.module.css";

const weekday = new Intl.DateTimeFormat("es-AR", { weekday: "short", timeZone: "America/Argentina/Buenos_Aires" });

/* Fecha de hoy en Argentina, como "AAAA-MM-DD" (comparable como texto). */
function todayInArgentina() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
}

export function Agenda() {
  /* Se calcula en el navegador para no fijar "hoy" en el HTML generado. */
  const [today, setToday] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => setToday(todayInArgentina()), []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const mobile = window.matchMedia("(max-width: 600px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const setupReveal = () => {
      observer?.disconnect();
      delete list.dataset.scrollReveal;
      if (!mobile.matches || reducedMotion.matches || !("IntersectionObserver" in window)) return;

      list.dataset.scrollReveal = "";
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLLIElement).dataset.visible = "";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );

      list.querySelectorAll("li").forEach((item) => observer?.observe(item));
    };

    setupReveal();
    mobile.addEventListener("change", setupReveal);
    reducedMotion.addEventListener("change", setupReveal);
    return () => {
      observer?.disconnect();
      mobile.removeEventListener("change", setupReveal);
      reducedMotion.removeEventListener("change", setupReveal);
    };
  }, []);

  const nextDate = today ? agenda.find((item) => item.date >= today)?.date : undefined;

  return (
    <section className={styles.section} id="agenda" aria-labelledby="agenda-title">
      <div className={styles.side}>
        <h2 className={styles.title} id="agenda-title">{agendaMonth} en la casa</h2>
        <p className={styles.intro}>
          Talleres, encuentros y planes para ir con amigas, con los chicos o por tu cuenta. Los cupos son limitados: para
          anotarte, escribile a la casa por Instagram.
        </p>
        <a className="btn btn--ghost" href={site.instagram.dm} target="_blank" rel="noreferrer">
          Escribir para anotarme
        </a>

        <div className={styles.weekly}>
          <h3 className={styles.weeklyTitle}>Todas las semanas</h3>
          <ul>
            {weekly.map((item) => (
              <li key={`${item.day}-${item.time}`}>
                <span className={styles.weeklyWhen}>{item.day}, {item.time}</span>
                <span>{item.title} <span className={styles.muted}>{item.with}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className={styles.list} ref={listRef}>
        {agenda.map((item, index) => {
          const date = new Date(`${item.date}T12:00:00-03:00`);
          const past = today !== null && item.date < today;
          const isNext = item.date === nextDate && agenda.findIndex((a) => a.date === nextDate) === index;
          return (
            <li key={`${item.date}-${item.title}`} className={styles.item} data-past={past ? "" : undefined}>
              <time className={styles.date} dateTime={item.date}>
                <span className={styles.day}>{date.getDate()}</span>
                <span className={styles.weekday}>{weekday.format(date).replace(".", "")}</span>
              </time>
              <div className={styles.what}>
                <p className={styles.eventTitle}>{item.title}</p>
                {item.detail ? <p className={styles.detail}>{item.detail}</p> : null}
              </div>
              {isNext ? <span className={styles.next}>Lo próximo</span> : null}
              {past ? <span className={styles.pastLabel}>Ya pasó</span> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
