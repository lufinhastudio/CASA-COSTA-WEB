import Image from "next/image";
import { brands, site } from "@/content/site";
import styles from "./Brands.module.css";

export function Brands() {
  return (
    <section className={styles.section} id="marcas" aria-labelledby="brands-title">
      <header className={styles.head}>
        <h2 className={styles.title} id="brands-title">Algunas de las marcas de la casa</h2>
        <p className={styles.intro}>Emprendedores de la zona que eligieron tener su lugar en Casa Costa.</p>
      </header>

      <ul className={styles.grid}>
        {brands.map((brand) => {
          const wide = brand.width > brand.height;
          return (
            <li key={brand.handle} className={wide ? styles.wide : undefined}>
              <a
                className={styles.card}
                href={`https://www.instagram.com/${brand.handle}/`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.photo}>
                  <Image
                    src={brand.image}
                    alt={brand.alt}
                    width={brand.width}
                    height={brand.height}
                    sizes={wide ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 50vw, 25vw"}
                  />
                </span>
                <span className={styles.handle}>@{brand.handle}</span>
              </a>
            </li>
          );
        })}

        <li className={styles.more}>
          <p>Y unas 25 marcas más, que vas a ir descubriendo sala por sala.</p>
          <a className="text-link" href={site.instagram.url} target="_blank" rel="noreferrer">
            Conocelas en @{site.instagram.handle}
          </a>
        </li>
      </ul>
    </section>
  );
}
