import Image from "next/image";
import styles from "./About.module.css";

const ways = [
  {
    term: "Comprar",
    text: "Marcas de la zona que antes había que buscar una por una por Instagram, ahora en la misma casa y con atención todos los días.",
    mobileText: "Diseño, deco y regalos de marcas de la zona.",
  },
  {
    term: "Merendar",
    text: "Un café con chipá o algo dulce, para hacer una pausa en el recorrido o juntarte con alguien.",
    mobileText: "Un café y algo rico para hacer una pausa.",
  },
  {
    term: "Hacer algo distinto",
    text: "Talleres, clases de yoga y encuentros que cambian todos los meses.",
    mobileText: "Talleres, yoga y encuentros que cambian cada mes.",
  },
];

export function About() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.engraving}>
        <Image
          src="/img/casa/grabado-palmeras-hd.png"
          alt=""
          width={1570}
          height={1002}
          sizes="(max-width: 860px) 100vw, 50vw"
          data-drift
        />
      </div>

      <div className={styles.body}>
        <h2 className={styles.title} id="about-title">¿Qué es Casa Costa?</h2>
        <p className={styles.lead}>
          <span className={styles.desktopOnly}>
            Casa Costa nace con una visión clara: crear un nuevo punto de encuentro para Concepción del Uruguay. Un
            espacio donde las personas puedan encontrarse, compartir y disfrutar.
          </span>
          <span className={styles.mobileOnly}>
            Una casa para encontrarnos, descubrir marcas locales y disfrutar de la ciudad.
          </span>
        </p>
        <p className={styles.text}>
          <span className={styles.desktopOnly}>
            Adentro conviven unas 30 marcas locales, cada una con su rincón: ropa, bikinis, deco, aromas, ropa de chicos
            y regalos. Las marcas dejan sus productos y la casa se encarga de atenderte, así que podés recorrer todo en
            una sola visita.
          </span>
          <span className={styles.mobileOnly}>
            Unas 30 marcas comparten sus rincones. Pasá, recorré y encontrá algo nuevo en cada visita.
          </span>
        </p>

        <dl className={styles.ways}>
          {ways.map((way) => (
            <div key={way.term}>
              <dt>{way.term}</dt>
              <dd>
                <span className={styles.desktopOnly}>{way.text}</span>
                <span className={styles.mobileOnly}>{way.mobileText}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
