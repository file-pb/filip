import type { Metadata } from "next";
import { JAZYKY, VYCHOZI, ZAKLAD, jeJazyk } from "@/lib/jazyky";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./globals.css";

/**
 * Korzenový layout leží **uvnitř** dynamického segmentu schválně: jen tak
 * může `<html lang>` odpovídat skutečnému jazyku stránky. Kdyby byl
 * v `app/layout.tsx`, byl by jeden pro oba jazyky a anglická verze by se
 * hlásila jako česká — což si `hreflang` a čtečky obrazovky přečtou.
 *
 * Adresy jsou proto `/cs/` a `/en/`. Korzen `/` přesměrovává nginx, ne Next:
 * statický export přesměrování za běhu neumí a tahle cesta je stejně
 * věcí serveru, ne aplikace.
 */
export function generateStaticParams() {
  return Object.keys(JAZYKY).map((jazyk) => ({ jazyk }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jazyk: string }>;
}): Promise<Metadata> {
  const { jazyk } = await params;
  if (!jeJazyk(jazyk)) return {};
  const o = JAZYKY[jazyk];

  return {
    title: o.titulek,
    description: o.popis,
    alternates: {
      canonical: `${ZAKLAD}/${jazyk}/`,
      // Next tyhle odkazy vydá s velkým L — `hrefLang="cs"`. Zkoušel jsem
      // je proto vypsat vlastním JSX v <head> a vyšlo to **úplně stejně**,
      // takže na tom Next nic nekazí a jiná cesta není. Platí to i tak:
      // v HTML jsou jména atributů case-insensitive, takže prohlížeč
      // i vyhledávač to čte jako `hreflang`. Ověřeno 9. 10. 2026 ve výstupu.
      languages: {
        cs: `${ZAKLAD}/cs/`,
        en: `${ZAKLAD}/en/`,
        // Komu nesedí ani jedno, dostane výchozí jazyk. Bez tohohle
        // si to vyhledávač domyslí sám a většinou jinak, než chceš.
        "x-default": `${ZAKLAD}/${VYCHOZI}/`,
      },
    },
    openGraph: {
      type: "profile",
      locale: jazyk === "cs" ? "cs_CZ" : "en_GB",
      title: o.titulek,
      description: o.popis,
      url: `${ZAKLAD}/${jazyk}/`,
    },
    // Záměrně NENÍ noindex. Rozcestník na apexu ho má, tahle stránka ne —
    // jinak je celé SEO zahozené.
    robots: { index: true, follow: true },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ jazyk: string }>;
}) {
  const { jazyk } = await params;
  if (!jeJazyk(jazyk)) notFound();
  const o = JAZYKY[jazyk];

  /**
   * Strojově čitelná část. Je tu schválně bohatá: většina automatického
   * zpracování bere, co najde strukturované, takže je účinnější dobře
   * vyplnit, co chci, než schovávat, co nechci.
   *
   * **Bez `birthDate` a bez `worksFor`** — rozhodnuto 8. 10. 2026. Obor
   * bez jména firmy je v textu, ale `worksFor` čeká organizaci, a obor
   * organizace není.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: o.jmeno,
    jobTitle: jazyk === "cs" ? "Vývojář .NET a C#" : ".NET and C# developer",
    description: o.popis,
    url: `${ZAKLAD}/${jazyk}/`,
    knowsAbout: o.umi,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Příbram",
      addressCountry: "CZ",
    },
    sameAs: ["https://github.com/file-pb"],
  };

  return (
    <html lang={jazyk}>
      <body>
        <div className="obal">
          <nav className="jazyky" aria-label={jazyk === "cs" ? "Jazyk" : "Language"}>
            <Link href={o.druhy.cesta} hrefLang={o.druhy.jazyk} lang={o.druhy.jazyk}>
              {o.druhy.nazev}
            </Link>
          </nav>
          {children}
        </div>
        <script
          type="application/ld+json"
          // Jediné místo s JSON v HTML. Není to uživatelský vstup, je to
          // náš vlastní objekt, a prochází JSON.stringify.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
