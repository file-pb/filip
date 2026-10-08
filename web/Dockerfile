# Web se staví ve dvou krocích: v prvním Next vyrobí statický export,
# ve druhém zůstane jen nginx a hotové soubory. Žádný Node v běhu —
# tahle stránka nic nepočítá, takže nemá co renderovat za běhu.
#
# POZOR na kontext: staví se z KOŘENE repozitáře, ne z web/.
#   docker build -f web/Dockerfile -t filip .
# Obraz potřebuje soubory z obou adresářů — zdroj z web/ a konfiguraci
# nginxu z deploy/ — takže kontext musí obsáhnout oba. První build v CI
# na tom spadl: cesty byly psané pro kontext web/ a `COPY package.json`
# soubor nenašel (9. 10. 2026).

FROM node:22-alpine AS build
WORKDIR /src

# Závislosti zvlášť, aby se vrstva nepřestavovala při každé změně textu.
COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/ ./
# Základ absolutních adres se zapéká při buildu: canonical, hreflang
# a sitemap. Přechod na vlastní doménu je proto změna téhle proměnné
# a nové nasazení — nikde v obsahu host není.
ARG ZAKLADNI_URL=https://filip.klihovka.cz
ENV ZAKLADNI_URL=$ZAKLADNI_URL
# `next build` kontroluje typy, takže chybějící překlad **shodí build tady**.
RUN npm run build

# Připnuto i s otiskem, stejně jako rozcestník a přehled na platformě:
# `alpine` se posouvá s každým vydáním.
FROM nginx:1.29-alpine@sha256:5616878291a2eed594aee8db4dade5878cf7edcb475e59193904b198d9b830de AS runtime

# Z jakého commitu je tahle image. Servíruje se na /verze a nasazovací
# workflow podle toho pozná, že na produkci běží právě tenhle commit.
ARG VERZE=neznama

COPY --from=build /src/out /usr/share/nginx/html
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf

# /verze jako obyčejný soubor — nginx ho vydá a nic se nemusí šablonovat.
RUN printf '{"verze":"%s"}\n' "$VERZE" > /usr/share/nginx/html/verze

EXPOSE 8080

# Kontrakt platformy chce /health. Tady ho obsluhuje nginx přímo, takže
# kontrola zdraví ověřuje, že server naslouchá a má konfiguraci — víc
# u statiky ověřit nejde a předstírat to nebudu.
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/health/ready || exit 1
