"use client";

import { useEffect, useState } from "react";
import { PalmMark } from "@/components/ui/PalmMark";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "#la-casa", label: "La casa" },
  { href: "#marcas", label: "Marcas" },
  { href: "#agenda", label: "Agenda" },
  { href: "#sumate", label: "Sumá tu marca" },
  { href: "#visitanos", label: "Cómo llegar" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={styles.header} data-scrolled={scrolled || menuOpen ? "" : undefined}>
      <div className={styles.bar}>
        <a className={styles.brand} href="#top" aria-label="Casa Costa, volver al inicio" onClick={() => setMenuOpen(false)}>
          <PalmMark className={styles.palm} />
          <span className={styles.wordmark}>Casa Costa</span>
        </a>

        <nav className={styles.nav} aria-label="Secciones">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className={styles.menuIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      <nav id="menu-movil" className={styles.mobileNav} data-open={menuOpen ? "" : undefined} aria-label="Secciones" hidden={!menuOpen}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
