/* ==========================================================================
   Casa Costa — contenido de la demo
   Todo el texto y los datos editables viven acá. Los componentes sólo leen.
   ========================================================================== */

export const site = {
  name: "Casa Costa",
  tagline: "Una nueva manera de vivir la ciudad",
  description:
    "Casa Costa es un multiespacio en una casa antigua de Concepción del Uruguay: unas 30 marcas locales, cafetería, talleres y patio. Abierto todos los días de 7 a 22 hs.",
  address: {
    street: "9 de Julio 500, esquina Erausquin",
    city: "Concepción del Uruguay, Entre Ríos",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=9+de+Julio+500,+Concepci%C3%B3n+del+Uruguay,+Entre+R%C3%ADos",
    embedUrl:
      "https://maps.google.com/maps?q=9%20de%20Julio%20500%2C%20Concepci%C3%B3n%20del%20Uruguay%2C%20Entre%20R%C3%ADos&z=17&output=embed",
  },
  hours: {
    /* Horario de la casa, en hora de Argentina. Se usa para el aviso "abierto ahora". */
    open: 7,
    close: 22,
    label: "Todos los días de 7 a 22 hs",
    cafe: "Cafetería de 8 a 20 hs",
  },
  instagram: {
    handle: "casacosta.er",
    url: "https://www.instagram.com/casacosta.er/",
    dm: "https://ig.me/m/casacosta.er",
  },
};

/* ── Espacios de la casa (sección "Recorré la casa") ─────────────────────
   x / y: posición del punto sobre la ilustración, en % del ancho y alto. */
export type Space = {
  id: string;
  name: string;
  text: string;
  image: { src: string; alt: string; width: number; height: number };
  x: number;
  y: number;
};

export const spaces: Space[] = [
  {
    id: "salas",
    name: "Las salas",
    text: "Cada habitación de la casa tiene marcas adentro: ropa, bikinis, deco, aromas, accesorios y diseño. Son unas 30, todas con su rincón.",
    image: { src: "/img/casa/salas.jpg", alt: "Un ropero antiguo con ropa colgada, debajo del cartel de Casa Costa", width: 800, height: 1000 },
    x: 43.9,
    y: 42.5,
  },
  {
    id: "cafecito",
    name: "El cafecito",
    text: "Café, chipá, brownies y muffins para quedarse un rato. Abre de 8 a 20 hs.",
    image: { src: "/img/casa/taza.jpg", alt: "Taza de café con leche pintada a mano y chipá", width: 1000, height: 863 },
    x: 61.4,
    y: 38,
  },
  {
    id: "regionales",
    name: "Regionales",
    text: "Vinos y productos de la zona, para llevarte algo de acá o regalar.",
    image: { src: "/img/casa/grabado-parra.jpg", alt: "Grabado de una parra con racimos", width: 963, height: 600 },
    x: 51.4,
    y: 49.6,
  },
  {
    id: "laboratorio",
    name: "El Laboratorio",
    text: "La sala de talleres, al fondo. Cocina, cerámica, flores y lo que traiga la agenda de cada mes.",
    image: { src: "/img/casa/flores.jpg", alt: "Ramos de flores armados en un taller", width: 900, height: 1125 },
    x: 56.4,
    y: 30.5,
  },
  {
    id: "patiecito",
    name: "El patiecito",
    text: "Verde, sombra y puertas azules. Acá se hacen las clases de yoga y tiene su propia entrada por 9 de Julio.",
    image: { src: "/img/casa/patio.jpg", alt: "Clase de yoga en el pasto del patio, junto a las puertas azules de la casa", width: 1000, height: 1500 },
    x: 71.5,
    y: 45,
  },
  {
    id: "entradas",
    name: "Tres entradas",
    text: "La principal, en la esquina de Erausquin y 9 de Julio. Con rampa, por Erausquin. Y entre verdes, por el patiecito sobre 9 de Julio.",
    image: { src: "/img/casa/grabado-puerta.jpg", alt: "Grabado de la puerta de entrada de la casa", width: 917, height: 580 },
    x: 50.3,
    y: 64,
  },
];

/* ── Marcas destacadas ───────────────────────────────────────────────── */
export type Brand = { handle: string; image: string; width: number; height: number; alt: string };

export const brands: Brand[] = [
  { handle: "hola.corbox", image: "/img/marcas/corbox.jpg", width: 800, height: 1000, alt: "Ropa interior Corbox en tonos marrones" },
  { handle: "lavida_pink", image: "/img/marcas/lavida.jpg", width: 800, height: 1000, alt: "Blazer de lino de La Vie en Rose" },
  { handle: "raizarfragancias", image: "/img/marcas/raizar.jpg", width: 540, height: 425, alt: "Home sprays de Raizar Fragancias" },
  { handle: "bkgretas", image: "/img/marcas/gretas.jpg", width: 800, height: 1000, alt: "Bikinis de Greta colgadas en percheros" },
  { handle: "nidoalmacen.deco", image: "/img/marcas/nido.jpg", width: 720, height: 900, alt: "Taza de cerámica con cerezas de Nido Almacén Deco" },
  { handle: "usaditos.oficial", image: "/img/marcas/usaditos.jpg", width: 800, height: 1000, alt: "Local de Usaditos con ropa de chicos" },
];

/* ── Agenda ──────────────────────────────────────────────────────────── */
export type AgendaItem = { date: string; title: string; detail?: string };

export const agendaMonth = "Octubre";

export const agenda: AgendaItem[] = [
  { date: "2026-10-09", title: "Taller Mini Chef", detail: "Especial Halloween, para chicos" },
  { date: "2026-10-16", title: "Tejiendo arrullos", detail: "Ronda para bebés" },
  { date: "2026-10-16", title: "Tarde de automaquillaje" },
  { date: "2026-10-17", title: "Yoga, clase abierta", detail: "En el patio" },
  { date: "2026-10-19", title: "Taller de cerámica y vino" },
  { date: "2026-10-21", title: "Taller de sushi", detail: "Con vinito" },
  { date: "2026-10-23", title: "Taller Mini Chef", detail: "Especial Halloween, para chicos" },
  { date: "2026-10-24", title: "Greta presenta su nueva colección" },
  { date: "2026-10-25", title: "Bingo a beneficio de ALCEC" },
  { date: "2026-10-29", title: "Flores", detail: "Merienda y armado floral" },
];

export const weekly = [
  { day: "Miércoles", time: "8 hs", title: "Yoga para adultos", with: "con Juliana López" },
  { day: "Miércoles", time: "16 hs", title: "Yoga para chicos", with: "con Juliana López" },
  { day: "Viernes", time: "8:30 hs", title: "Stretching", with: "con Cata" },
];

/* ── Cómo funciona para las marcas (es una secuencia real) ───────────── */
export const joinSteps = [
  { title: "Traés tus productos", text: "Tu marca ocupa un lugar en la casa y deja su mercadería en consignación." },
  { title: "La casa los vende", text: "Casa Costa exhibe, atiende y vende todos los días de 7 a 22 hs, también los fines de semana." },
  { title: "Cobrás lo vendido", text: "Recibís lo que se vendió, menos la comisión acordada con la casa." },
];
