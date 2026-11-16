#!/bin/sh
# Brána nad POSTAVENÝM výstupem: osobní Gmail se nesmí dostat do vydaných
# souborů. Nad zdrojem by to nestačilo — `Kontakt` je klientská komponenta,
# takže Next adresu serializuje do RSC payloadu uvnitř HTML, a nad zdrojem
# by kontrola prošla zeleně i u stránky, která adresu vydává.
#
# Hledá se **jméno účtu a doména zvlášť**, ne celý řetězec: `filipburda75
# [zavináč] gmail.com` ani `filipburda75@gmail.com` nejsou jediné podoby,
# ve kterých to může projít, a kontrola na celý řetězec je přesně ta vada,
# kterou tahle stránka popisuje — kontroluje vstup, ne výsledek.
#
# Prochází se celý výstup, ne jen *.html: payload bývá i v .txt a .js.
#
# Použití:  sh web/kontrola-adresy.sh [cesta-k-výstupu]
# Výchozí cesta je web/out.
set -eu

VYSTUP="${1:-web/out}"

if [ ! -d "$VYSTUP" ]; then
  echo "kontrola-adresy: výstup '$VYSTUP' neexistuje — není co kontrolovat." >&2
  echo "Nejdřív postav web (npm run build), pak spusť kontrolu." >&2
  exit 2
fi

# Zakázané části. Je to seznam toho, co se publikovat NESMÍ, ne vzor
# platné adresy: po přechodu na alias na vlastní doméně hlídá regresi.
ZAKAZANE="filipburda75 gmail.com"

NALEZY=0
for CAST in $ZAKAZANE; do
  # -I přeskočí binárky (obrázky, fonty), -r projde podadresáře.
  if grep -rIlF -- "$CAST" "$VYSTUP" > /tmp/kontrola-adresy-nalez.$$ 2>/dev/null; then
    echo "kontrola-adresy: ZAKÁZANÁ ČÁST '$CAST' je ve vydaném výstupu:" >&2
    sed 's/^/  /' /tmp/kontrola-adresy-nalez.$$ >&2
    NALEZY=$((NALEZY + 1))
  fi
  rm -f /tmp/kontrola-adresy-nalez.$$
done

if [ "$NALEZY" -gt 0 ]; then
  cat >&2 <<'KONEC'

Build se zastavuje. Zveřejněná adresa nesmí být identitou osobního Google
účtu: je to vstup pro obnovu účtu, cíl phishingu a klíč k vyhledání
v únicích hesel, a číslo v ní prozrazuje ročník, který se ze stránky jinak
odstraňuje. Navíc je to táž identita, přes kterou se platforma dozví
o poruše — spam v té schránce umí potichu utlumit vlastní alerty.

Oprava: zavést alias oddělený od Google účtu (klihovka.cz existuje)
a přepsat `mail` a `nahrada` ve `web/obsah/cs.ts` a `web/obsah/en.ts`.
KONEC
  exit 1
fi

echo "kontrola-adresy: ve '$VYSTUP' není ani jedna ze zakázaných částí ($ZAKAZANE)."
