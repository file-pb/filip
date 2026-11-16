"use client";

import { useState } from "react";

/**
 * E-mail. **Celá adresa ve zdroji stránky JE** — tenhle komentář dřív
 * tvrdil opak a byla to nepravda. Komponenta je `"use client"`, takže Next
 * musí `uzivatel`, `domena` i `nahrada` serializovat do RSC payloadu, aby
 * sedla hydratace; `nahrada` navíc nese adresu v čitelné podobě. Ověřeno
 * nad nasazeným webem 12. 11. 2026: adresa je ve vydaném HTML a v payloadu
 * té stránky třikrát.
 *
 * Rozdělení na části tedy nic neskrývá a sběrače neodstíní. Při rámci
 * „jen e-mail“ a „žádná běhová závislost“ je cíl „adresa není v HTML“
 * nedosažitelný — jediné účinné opatření je **alias oddělený od Google
 * účtu**, aby zveřejněná adresa nebyla identitou osobního účtu.
 *
 * Co tenhle soubor opravdu řeší: obsluhu klávesnicí (je to `<button>`),
 * čitelnou podobu bez JavaScriptu a jeden klik místo `mailto:` ve zdroji.
 * Telefon na stránce není (rozhodnuto 8. 10. 2026) — přidat ho jde
 * kdykoli, odebrat zveřejněné číslo z cizích seznamů ne.
 */
export function Kontakt({
  uzivatel,
  domena,
  nahrada,
}: {
  uzivatel: string;
  domena: string;
  nahrada: string;
}) {
  const [odhaleno, setOdhaleno] = useState<string | null>(null);

  if (odhaleno) {
    return (
      <a className="mail" href={`mailto:${odhaleno}`} rel="noopener noreferrer">
        {odhaleno}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="mail"
      // Obsluha klávesnicí je zadarmo, protože je to <button> a ne <span
      // onClick>. Byla to jedna z věcí, které se měly při implementaci
      // ověřit, tak ať se nemusí.
      onClick={() => setOdhaleno(`${uzivatel}@${domena}`)}
    >
      {nahrada}
    </button>
  );
}
