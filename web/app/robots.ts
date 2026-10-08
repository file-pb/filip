import type { MetadataRoute } from "next";
import { ZAKLAD } from "@/lib/jazyky";

/**
 * Varianta B (rozhodnuto 8. 10. 2026): **vyhledávací a uživatelské roboty
 * pustit, tréninkové zakázat.** Blokovat všechno by šlo proti účelu téhle
 * stránky — hledání dnes často probíhá tak, že se někdo zeptá asistenta.
 *
 * Dvě ceny, které to má a o kterých víme:
 *  - `CCBot` buduje veřejný archiv webu, ne jen tréninková data;
 *  - `Amazonbot` není popsaný jako výhradně tréninkový.
 *
 * A dvě věci, které tenhle soubor NEdělá:
 *  - `Google-Extended` vypne i grounding odpovědí v Gemini. Oddělený
 *    přepínač neexistuje, takže je to vědomá cena varianty B.
 *  - `Applebot-Extended` naopak řídí **jen trénink**; podklad pro odpovědi
 *    Apple řeší zvlášť (`nosnippet`).
 *
 * `robots.txt` je doporučení, ne vynucení. Kdo ho nedodrží, toho zastaví
 * jedině Cloudflare před tímhle webem.
 *
 * **Jména tokenů ověřit proti dokumentaci provozovatelů** — mění se,
 * a špatně napsaný token mlčky nedělá nic.
 */
/**
 * Při `output: "export"` musí metadata route výslovně říct, že je
 * statická — Next jinak build zastaví. Není to formalita: bez toho
 * by se robots generoval za běhu, který tady žádný není.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Applebot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Amzn-SearchBot",
          "Amzn-User",
        ],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Amazonbot",
          "Bytespider",
        ],
        disallow: "/",
      },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${ZAKLAD}/sitemap.xml`,
  };
}
