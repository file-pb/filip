import { cs } from "@/obsah/cs";
import { en } from "@/obsah/en";
import type { Obsah } from "@/obsah/typy";

/**
 * Jediný seznam jazyků. Přidat další = přidat soubor do `obsah/` a řádku
 * sem; typ `Obsah` pak **shodí build**, dokud nejsou přeložená všechna
 * pole. To je celá kontrola úplnosti.
 */
export const JAZYKY = { cs, en } satisfies Record<string, Obsah>;

export type Jazyk = keyof typeof JAZYKY;

export const VYCHOZI: Jazyk = "cs";

export function jeJazyk(x: string): x is Jazyk {
  return Object.hasOwn(JAZYKY, x);
}

/**
 * Základ absolutních adres. Bere se z prostředí **při buildu**, takže
 * přechod na vlastní doménu je změna jedné proměnné a nové nasazení —
 * nikde v obsahu host není. Viz plán, fáze 4.
 */
export const ZAKLAD = (process.env.ZAKLADNI_URL ?? "https://filip.klihovka.cz").replace(/\/$/, "");
