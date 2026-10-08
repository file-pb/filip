import { Fragment, type ReactNode } from "react";

/**
 * Minimální značkování pro texty v `obsah/`. Umí jen tři věci:
 * `**tlusté**`, `*kurzíva*` a `[text](adresa)`. Nic víc schválně —
 * obsah má být čitelný v gitu a tohle je strop, u kterého se to ještě
 * dá přečíst bez renderování.
 *
 * Nikdy `dangerouslySetInnerHTML`. Vrací React uzly, takže se text
 * escapuje sám.
 */
const VZOR = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

/** Vede odkaz mimo tenhle web? Pak se otvírá v nové kartě. */
function jeVen(adresa: string): boolean {
  return /^https?:\/\//i.test(adresa);
}

export function text(vstup: string): ReactNode {
  const casti = vstup.split(VZOR).filter((c) => c !== "");
  return (
    <>
      {casti.map((cast, i) => {
        if (cast.startsWith("**") && cast.endsWith("**")) {
          return <strong key={i}>{cast.slice(2, -2)}</strong>;
        }
        if (cast.startsWith("*") && cast.endsWith("*")) {
          return <em key={i}>{cast.slice(1, -1)}</em>;
        }
        const odkaz = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(cast);
        if (odkaz) {
          const [, popis, adresa] = odkaz;
          // Odkaz ven do nové karty, vnitřní ne. Platí na všech mých webech.
          return jeVen(adresa) ? (
            <a key={i} href={adresa} target="_blank" rel="noopener noreferrer">
              {popis}
            </a>
          ) : (
            <a key={i} href={adresa}>
              {popis}
            </a>
          );
        }
        return <Fragment key={i}>{cast}</Fragment>;
      })}
    </>
  );
}
