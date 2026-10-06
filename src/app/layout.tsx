import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Intro } from "@/components/layout/Intro";

/* Tipografías autoalojadas (subset latino, variables):
   Cormorant Garamond → la voz de la casa (títulos, frases)
   Jost → lectura e interfaz, pariente de la Futura de la marca */
const serif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic-latin.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: [{ path: "./fonts/jost-latin.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/img/casa/bolsas.jpg"],
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#efebe1",
};

/* Corre antes de pintar: si la intro ya se vio en esta sesión (o se pidió
   reducir el movimiento) marca <html data-intro="seen"> y el CSS la omite. */
const introScript = `try{if(sessionStorage.getItem("casacosta:intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <Intro />
        <MotionProvider>
          <a className="skip-link" href="#contenido">Saltar al contenido</a>
          <SiteHeader />
          <main id="contenido">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
