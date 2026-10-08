import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statický export. Tahle stránka nic nepočítá ani nedrží stav, takže
  // nemá co renderovat za běhu — nginx vydá hotové soubory. Platforma to
  // má v ARCHITEKTURA.md přímo předepsané pro „veřejný web, blog", a navíc
  // tím nevzniká třída problému S11 (limit rychlosti nad kapacitou webu),
  // protože statika unese o dva řády víc než 30 požadavků za sekundu.
  output: "export",
  // Každá stránka je adresář s index.html. Bez toho by nginx musel
  // dopisovat .html a /cs by vracelo 404.
  trailingSlash: true,
};

export default nextConfig;
