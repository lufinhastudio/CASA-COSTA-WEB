"use client";

import { useEffect } from "react";

/* Movimiento global, cargado sólo en el navegador:
   - Lenis: scroll suave con mouse/trackpad (nunca en touch).
   - GSAP + ScrollTrigger: los grabados [data-drift] se desplazan apenas
     mientras se scrollea, como un papel que se mueve detrás.
   Todo se apaga si la persona pidió reducir el movimiento. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let cleanup = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), finePointer ? import("lenis") : Promise.resolve(null)]).then(
      ([gsapModule, triggerModule, lenisModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((element) => {
            gsap.fromTo(
              element,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
              },
            );
          });
        });

        const header = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.25;
        const lenis = lenisModule
          ? new lenisModule.default({ duration: 1.1, smoothWheel: true, anchors: { offset: -header } })
          : null;

        let frame = 0;
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
          };
          frame = requestAnimationFrame(raf);
        }

        ScrollTrigger.refresh();
        cleanup = () => {
          cancelAnimationFrame(frame);
          lenis?.destroy();
          context.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return children;
}
