"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { agenda, agendaMonth, agendaStickers, site, weekly, type AgendaItem } from "@/content/site";
import styles from "./Agenda.module.css";

const year = Number(agenda[0].date.slice(0, 4));
const month = Number(agenda[0].date.slice(5, 7)) - 1;
const dateForDay = (day: number) =>
  [year, String(month + 1).padStart(2, "0"), String(day).padStart(2, "0")].join("-");
const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
/* Como en la pieza de Instagram: la grilla arranca el domingo de la semana
   del primer evento (el 4 de octubre) y termina con el mes. */
const firstEventDay = Number(agenda[0].date.slice(8, 10));
const startDay = firstEventDay - new Date(Date.UTC(year, month, firstEventDay)).getUTCDay();
const lastWeekday = new Date(Date.UTC(year, month, daysInMonth)).getUTCDay();
const calendarDays = Array.from(
  { length: daysInMonth + (6 - lastWeekday) - startDay + 1 },
  (_, index) => startDay + index,
);
const weekdays = ["DOM", "LUN", "MAR", "MIER", "JUE", "VIER", "SAB"];
const weekdayName = new Intl.DateTimeFormat("es-AR", { weekday: "long", timeZone: "UTC" });

const eventsByDate = new Map<string, AgendaItem[]>();
for (const item of agenda) {
  const events = eventsByDate.get(item.date) ?? [];
  events.push(item);
  eventsByDate.set(item.date, events);
}
const eventDates = [...eventsByDate.keys()];

/* Fecha de hoy en Argentina, como "AAAA-MM-DD" (comparable como texto). */
function todayInArgentina() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
}

export function Agenda() {
  const [today, setToday] = useState<string | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => setToday(todayInArgentina()), []);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (!calendar) return;

    const mobile = window.matchMedia("(max-width: 600px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const setupReveal = () => {
      observer?.disconnect();
      delete calendar.dataset.scrollReveal;
      if (!mobile.matches || reducedMotion.matches || !("IntersectionObserver" in window)) return;

      calendar.dataset.scrollReveal = "";
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLButtonElement).dataset.visible = "";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      calendar.querySelectorAll<HTMLButtonElement>("[data-calendar-event]").forEach((button) => observer?.observe(button));
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

  useEffect(() => {
    if (!activeDate || !window.matchMedia("(max-width: 900px)").matches) return;
    const frame = window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeDate]);

  const nextDate = today ? agenda.find((item) => item.date >= today)?.date : undefined;
  const activeEvents = activeDate ? eventsByDate.get(activeDate) ?? [] : [];
  const activeDay = activeDate ? Number(activeDate.slice(-2)) : null;
  const detailLabel = activeDate === nextDate
    ? "Lo próximo"
    : activeDate && today && activeDate < today
      ? "Ya pasó"
      : activeEvents.length > 1 ? activeEvents.length + " actividades" : "Actividad en la casa";

  return (
    <section className={styles.section} id="agenda" aria-labelledby="agenda-title">
      <div className={styles.side}>
        <div className={styles.sideIntro}>
          <h2 className={styles.title} id="agenda-title">{agendaMonth} en la casa</h2>
          <p className={styles.intro}>
            Tocá una fecha del calendario para ver qué pasa en la casa ese día. Los cupos son limitados: para anotarte, escribinos
            por Instagram.
          </p>
          <a className="btn btn--ghost" href={site.instagram.dm} target="_blank" rel="noreferrer">
            Escribir para anotarme
          </a>
        </div>

        <div className={styles.weekly}>
          <h3 className={styles.weeklyTitle}>Todas las semanas</h3>
          <ul>
            {weekly.map((item) => (
              <li key={item.day + "-" + item.time}>
                <span className={styles.weeklyWhen}>{item.day}, {item.time}</span>
                <span>{item.title} <span className={styles.muted}>{item.with}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.calendarColumn}>
        <div className={styles.calendar} ref={calendarRef}>
          <div className={styles.calendarTop}>
            <span className={styles.calendarIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M15 4 7 12l8 8" /></svg>
            </span>
            <h3 className={styles.calendarTitle}>
              <Image src="/img/agenda/titulo.png" alt={agendaMonth + " en Casa Costa"} width={432} height={177} sizes="(max-width: 600px) 60vw, 26rem" />
            </h3>
            <span className={styles.calendarIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" /></svg>
            </span>
          </div>

          <div className={styles.weekdays} aria-hidden="true">
            {weekdays.map((day) => <span key={day}>{day}</span>)}
          </div>

          <div className={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (day < 1 || day > daysInMonth) {
                return <div className={styles.cell + " " + styles.outside} key={"blank-" + index} aria-hidden="true" />;
              }

              const date = dateForDay(day);
              const events = eventsByDate.get(date) ?? [];
              const sticker = agendaStickers[date];
              return (
                <div className={styles.cell} key={date}>
                  {events.length > 0 ? (
                    <button
                      type="button"
                      className={styles.eventDay}
                      data-calendar-event=""
                      data-next={date === nextDate ? "" : undefined}
                      aria-label={day + " de " + agendaMonth.toLowerCase() + ": " + events.map((event) => event.title).join(" y ")}
                      aria-pressed={activeDate === date}
                      onClick={() => setActiveDate(date)}
                    >
                      {sticker ? (
                        <Image
                          className={styles.sticker}
                          src={sticker.src}
                          alt=""
                          width={sticker.width}
                          height={sticker.height}
                          sizes="(max-width: 600px) 14vw, 9rem"
                        />
                      ) : (
                        <span className={styles.eventFallback} aria-hidden="true">
                          {events.map((event) => event.calendarLabel).join(" · ")}
                        </span>
                      )}
                      <time className={styles.dayNumber} dateTime={date}>{day}</time>
                    </button>
                  ) : (
                    <time className={styles.plainDay} dateTime={date}>{day}</time>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {activeDate && activeDay ? (
          <article className={styles.detail} key={activeDate} ref={detailRef} aria-live="polite">
            <time className={styles.detailDate} dateTime={activeDate}>
              <span className={styles.detailWeekday}>
                {weekdayName.format(new Date(Date.UTC(year, month, activeDay)))}
              </span>
              <strong className={styles.detailNumber}>{activeDay}</strong>
              <span className={styles.detailMonth}>{agendaMonth} {year}</span>
            </time>
            <div className={styles.detailBody}>
              <div className={styles.detailTop}>
                <p className={styles.detailEyebrow}>{detailLabel}</p>
                <button
                  type="button"
                  className={styles.closeDetail}
                  aria-label="Cerrar detalle de la fecha"
                  onClick={() => {
                    calendarRef.current?.querySelector<HTMLButtonElement>("[aria-pressed='true']")?.focus();
                    setActiveDate(null);
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              {activeEvents.map((item, index) => (
                <div className={styles.detailEvent} key={item.title + "-" + index}>
                  <h3 className={styles.detailTitle}>{item.title}</h3>
                  {item.detail ? <p className={styles.detailText}>{item.detail}</p> : null}
                </div>
              ))}
              {(!today || activeDate >= today) ? (
                <a className={styles.detailLink} href={site.instagram.dm} target="_blank" rel="noreferrer">
                  Consultar cupo <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
            {agendaStickers[activeDate] ? (
              <div className={styles.detailSticker} aria-hidden="true">
                <Image
                  src={agendaStickers[activeDate].src}
                  alt=""
                  width={agendaStickers[activeDate].width}
                  height={agendaStickers[activeDate].height}
                  sizes="9rem"
                />
              </div>
            ) : null}
          </article>
        ) : null}
      </div>
    </section>
  );
}
