# filip — osobní profesní stránka

Statický web na platformě „hračkárna“ (`klihovka.cz`). Adresa
`filip.klihovka.cz`, později vlastní doména.

## Čti první

- `web/obsah/typy.ts` — tvar obsahu. **Oba jazyky jsou tímhle typované,
  takže chybějící překlad shodí build při kontrole typů.** Je to celá
  kontrola úplnosti, žádný další nástroj na to není.
- `web/obsah/cs.ts`, `web/obsah/en.ts` — **jediné místo, kde je text.**
  Komponenty žádný text neobsahují.

## Pravidla, která tady platí

1. **Žádná věta bez dokladu nebo bez Filipova rozhodnutí.** Znění prošlo
   čtyřmi koly nezávislé oponentury; podklady (časová osa, mapa dokladů)
   jsou mimo tenhle repozitář. Když přidáváš tvrzení, musí mít zdroj.
2. **Angličtina je psaná, ne přeložená** — ale nesmí tvrdit nic, co česká
   verze netvrdí. Významové rozšíření je nová věta, ne překlad.
3. **Na stránku nepatří:** věk a rok narození (ani `birthDate` v JSON-LD,
   ani odvoditelně — žádné dobové kotvy typu „tehdy se programovalo v…“),
   jméno současného zaměstnavatele (ani `worksFor`), jméno živnosti
   a koncese, provozní údaje platformy.
4. **Délka praxe se neuvádí**, místo ní letopočet 2000. Číslo zastará
   a dřív nesedělo.
5. Odkaz ven má `target="_blank" rel="noopener noreferrer"`, vnitřní ne.
6. Nikdy `dangerouslySetInnerHTML` na cokoli jiného než náš vlastní
   `JSON.stringify` v JSON-LD.

## Stavba a nasazení

- `web/` je Next.js se **statickým exportem** (`output: "export"`).
  Výstup je `out/`, servíruje ho nginx — žádný Node v běhu.
- `/health`, `/health/ready` a `/verze` obsluhuje nginx
  (`deploy/nginx/default.conf`), ne aplikace.
- Kořen `/` přesměrovává nginx na `/cs/`. Statický export přesměrování
  za běhu neumí.
- Jméno Traefikova routeru je v `deploy/docker-compose.yml`
  **napsané natvrdo** — Compose neinterpoluje proměnné do klíčů labelů.
- Základ absolutních adres (`ZAKLADNI_URL`) se zapéká při buildu.
  **Přechod na vlastní doménu = změna té proměnné a nové nasazení.**

## Co ještě není hotové

- `web/obsah/*.ts`: `kontakt.mail` a `kontakt.nahrada` mají `VYPLNIT`.
- Jména robotů v `web/app/robots.ts` ověřit proti dokumentaci
  provozovatelů — mění se a špatně napsaný token mlčky nedělá nic.
- Otevřené obsahové otázky: PPC a e-marketing, úroveň angličtiny,
  jmenování dalších minulých firem.
