import { JAZYKY, jeJazyk } from "@/lib/jazyky";
import { notFound } from "next/navigation";
import { text } from "@/lib/text";
import { Kontakt } from "./kontakt";

export default async function Stranka({ params }: { params: Promise<{ jazyk: string }> }) {
  const { jazyk } = await params;
  if (!jeJazyk(jazyk)) notFound();
  const o = JAZYKY[jazyk];
  const z = o.cimSeZabyvam;

  return (
    <main>
      <header className="hlava">
        <h1>{o.jmeno}</h1>
        <p className="podtitul">{text(o.podtitul)}</p>
        {o.uvod.map((p, i) => (
          <p key={i}>{text(p)}</p>
        ))}
      </header>

      <section aria-labelledby="cim">
        <h2 id="cim">{z.nadpis}</h2>
        {z.odstavce.map((p, i) => (
          <p key={i}>{text(p)}</p>
        ))}

        <h3>{z.dokladyNadpis}</h3>
        <ul className="doklady">
          {z.doklady.map((b, i) => (
            <li key={i}>
              <strong>{b.nadpis}</strong> {text(b.text)}
            </li>
          ))}
        </ul>

        <h3>{z.technologieNadpis}</h3>
        <dl className="technologie">
          {z.technologie.map((b, i) => (
            <div key={i}>
              <dt>{b.nadpis}</dt>
              <dd>{text(b.text)}</dd>
            </div>
          ))}
        </dl>

        <h3>{z.vyberNadpis}</h3>
        {z.vyber.map((p, i) => (
          <p key={i}>{text(p)}</p>
        ))}
      </section>

      <section aria-labelledby="projekty">
        <h2 id="projekty">{o.projekty.nadpis}</h2>
        {o.projekty.polozky.map((pr, i) => (
          <article key={i} className="projekt">
            <h3>{pr.nazev}</h3>
            {pr.odstavce.map((p, j) => (
              <p key={j}>{text(p)}</p>
            ))}
            {pr.odkaz && (
              <p className="odkaz">
                {/* Odkaz ven do nové karty. */}
                <a href={pr.odkaz.adresa} target="_blank" rel="noopener noreferrer">
                  {pr.odkaz.text}
                </a>
              </p>
            )}
          </article>
        ))}
      </section>

      <section aria-labelledby="jak">
        <h2 id="jak">{o.jakPracuju.nadpis}</h2>
        <p>{text(o.jakPracuju.uvod)}</p>
        {o.jakPracuju.polozky.map((zp, i) => (
          <div key={i} className="zpusob">
            <h3>{zp.nadpis}</h3>
            {zp.odstavce.map((p, j) => (
              <p key={j}>{text(p)}</p>
            ))}
          </div>
        ))}
      </section>

      <section aria-labelledby="mimo">
        <h2 id="mimo">{o.mimoPraci.nadpis}</h2>
        <dl className="technologie">
          {o.mimoPraci.polozky.map((b, i) => (
            <div key={i}>
              <dt>{b.nadpis}</dt>
              <dd>{text(b.text)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="kontakt" className="kontakt">
        <h2 id="kontakt">{o.kontakt.nadpis}</h2>
        <p>{o.kontakt.mesto}</p>
        <p>
          <Kontakt
            uzivatel={o.kontakt.mail.uzivatel}
            domena={o.kontakt.mail.domena}
            nahrada={o.kontakt.nahrada}
          />
        </p>
      </section>
    </main>
  );
}
