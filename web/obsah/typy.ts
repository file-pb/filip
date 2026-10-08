/**
 * Tvar obsahu stránky. Oba jazyky jsou typované tímhle, takže **chybějící
 * překlad shodí build** při kontrole typů — ne až v provozu, kdy by na webu
 * zůstalo prázdné místo. Je to celý mechanismus kontroly úplnosti; žádný
 * další nástroj na to není.
 *
 * Text v polích smí obsahovat jen dvě značky: `**tlusté**` a
 * `[text](adresa)`. Víc ne — viz lib/text.tsx, kde se to překládá.
 */
export type Odstavec = string;

export type Bod = { nadpis: string; text: Odstavec };

export type Projekt = {
  nazev: string;
  odstavce: Odstavec[];
  /** Vlastní odkaz projektu. Chybí u toho, co není veřejné. */
  odkaz?: { text: string; adresa: string };
};

export type Zpusob = { nadpis: string; odstavce: Odstavec[] };

export type Obsah = {
  jazyk: "cs" | "en";
  /** Druhý jazyk — pro přepínač a pro hreflang. */
  druhy: { jazyk: "cs" | "en"; nazev: string; cesta: string };

  titulek: string;
  popis: string;
  jmeno: string;
  podtitul: string;
  uvod: Odstavec[];

  cimSeZabyvam: {
    nadpis: string;
    odstavce: Odstavec[];
    dokladyNadpis: string;
    doklady: Bod[];
    technologieNadpis: string;
    technologie: Bod[];
    vyberNadpis: string;
    vyber: Odstavec[];
  };

  projekty: { nadpis: string; polozky: Projekt[] };
  jakPracuju: { nadpis: string; uvod: Odstavec; polozky: Zpusob[] };
  mimoPraci: { nadpis: string; polozky: Bod[] };
  kontakt: {
    nadpis: string;
    mesto: string;
    /** Rozdělená adresa — celá se nikde v HTML neobjeví. */
    mail: { uzivatel: string; domena: string };
    /** Co se zobrazí bez JavaScriptu. */
    nahrada: string;
  };
  /** Pro JSON-LD: čím se zabývá, strojově čitelně. */
  umi: string[];
};
