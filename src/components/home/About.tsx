import Image from "next/image";
import styles from "./About.module.css";

const ways = [
  {
    term: "Comprar",
    text: "Marcas de la zona que antes había que buscar una por una por Instagram, ahora en la misma casa y con atención todos los días.",
  },
  {
    term: "Merendar",
    text: "Un café con chipá o algo dulce, para hacer una pausa en el recorrido o juntarte con alguien.",
  },
  {
    term: "Hacer algo distinto",
    text: "Talleres, clases de yoga y encuentros que cambian todos los meses.",
  },
];

export function About() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.engraving}>
        <Image
          src="/img/casa/grabado-palmeras.jpg"
          alt=""
          width={971}
          height={620}
          sizes="(max-width: 860px) 100vw, 50vw"
          data-drift
        />
      </div>

      <div className={styles.body}>
        <h2 className={styles.title} id="about-title">¿Qué es Casa Costa?</h2>
        <p className={styles.lead}>
          Casa Costa nace con una visión clara: crear un nuevo punto de encuentro para Concepción del Uruguay. Un
          espacio donde las personas puedan encontrarse, compartir y disfrutar.
        </p>
        <p className={styles.text}>
          Adentro conviven unas 30 marcas locales, cada una con su rincón: ropa, bikinis, deco, aromas, ropa de chicos
          y regalos. Las marcas dejan sus productos y la casa se encarga de atenderte, así que podés recorrer todo en
          una sola visita.
        </p>

        <dl className={styles.ways}>
          {ways.map((way) => (
            <div key={way.term}>
              <dt>{way.term}</dt>
              <dd>{way.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
