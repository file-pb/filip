# filip

Osobní profesní stránka. Statický web, nginx, bez databáze a bez stavu.

```
web/           Next.js se statickým exportem
  obsah/       texty — jediné místo, kde text je
  app/[jazyk]/ layout, stránka, CSS
  lib/         značkování textu a seznam jazyků
deploy/        compose a konfigurace nginxu
```

## Lokálně

```bash
cd web && npm install && npm run dev
```

Pak `http://localhost:3000/cs/` nebo `/en/`. Kořen `/` přesměrovává
teprve nginx, ve vývojovém serveru tedy nefunguje.

## Build jako na produkci

```bash
cd web && npm run build          # výstup v web/out/
```

Build **musí spadnout**, když v jednom jazyce chybí pole — to je záměr.

## Než se to nasadí

1. Vyplnit `kontakt.mail` a `kontakt.nahrada` v `web/obsah/cs.ts` a `en.ts`.
2. Ověřit jména robotů v `web/app/robots.ts`.
3. Na platformě: DNS, adresář v `/opt/apps/filip`, `.env` s `IMAGE`,
   `APP_NAME` a `PLATFORM_DOMAIN`. Pozor: `scripts/new-app.sh` dnes
   vyžaduje databázi, kterou tenhle projekt nemá — viz plán, fáze 2.
4. V GitHubu `DEPLOY_WEBHOOK` (variable) a `DEPLOY_TOKEN` (secret).
5. Dopsat řádku do `DOHLEDY` v `platform/scripts/kuma-setup.sh`.

Podrobnosti a pravidla pro obsah jsou v `CLAUDE.md`.
