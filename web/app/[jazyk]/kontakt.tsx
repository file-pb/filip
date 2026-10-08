"use client";

import { useState } from "react";

/**
 * Obfuskovaný e-mail. **Celá adresa v HTML není** — jsou tam jen dvě části
 * a skládá se až po kliknutí. Bez JavaScriptu zůstane čitelná náhrada,
 * kterou jde ručně zkopírovat.
 *
 * Nikoho rozhodného to nezastaví a taková ambice to nemá; jde o to odstínit
 * hromadné sběrače. Telefon na stránce není (rozhodnuto 8. 10. 2026) —
 * přidat ho jde kdykoli, odebrat zveřejněné číslo z cizích seznamů ne.
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
