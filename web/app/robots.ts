import type { MetadataRoute } from "next";
import { ZAKLAD } from "@/lib/jazyky";

/**
 * Varianta B (rozhodnuto 8. 10. 2026): **vyhledávací a uživatelské roboty
 * pustit, tréninkové zakázat.** Blokovat všechno by šlo proti účelu téhle
 * stránky — hledání dnes často probíhá tak, že se někdo zeptá asistenta.
 *
 * **Jména tokenů ověřena 9. 10. 2026 přímo v dokumentaci provozovatelů.**
 * Co z toho vyšlo a co je potřeba vědět:
 *
 * - `Google-Extended` řídí trénink **i grounding** odpovědí v Gemini
 *   a Vertex AI. Google výslovně uvádí, že zařazení ani pořadí v Search
 *   neovlivní. Oddělený přepínač pro ty dvě věci neexistuje — je to
 *   vědomá cena varianty B.
 * - `Applebot-Extended` naopak řídí **jen trénink** základních modelů,
 *   **sám necrawluje** a v hodnocení Search se nebere. Použití obsahu jako
 *   podkladu odpovědí řeší Apple zvlášť. Tady tedy nic neztrácíme.
 * - `CCBot` buduje **veřejný archiv** webu pro výzkum, ne tréninkovou sadu.
 *   Zákaz nás vyřadí i z těch ostatních použití. Vědomá cena.
 * - `Amazonbot` slouží „ke zlepšování produktů a služeb“ a obsah **může**
 *   být použit k tréninku — není to tedy čistě tréninkový robot.
 * - `ChatGPT-User`, `Perplexity-User` a `Amzn-User` obsluhují dotaz
 *   člověka, a provozovatelé u nich výslovně uvádějí, že `robots.txt`
 *   nemusí platit. Jsou v povolených, takže na tom nezáleží.
 * - `anthropic-ai` **v dokumentaci Anthropicu není** — byl to historický
 *   údaj, proto tu není. Doložené jsou `ClaudeBot`, `Claude-User`
 *   a `Claude-SearchBot`, všechny tři `robots.txt` respektují.
 * - `OAI-AdsBot` existuje, ale chodí jen na stránky zadané jako reklama
 *   v ChatGPT. Sem ho nepíšu, protože se sem nikdy nedostane.
 * - **`Bytespider` se mi u provozovatele ověřit nepodařilo.** Tvar tokenu
 *   je napříč zdroji shodný, ale dodržování `robots.txt` je sporné.
 *   Nechávám ho v zákazu, protože zakázat token nic nestojí — jen se
 *   na něj nespoléhám.
 *
 * `robots.txt` je vůbec doporučení, ne vynucení. Kdo ho nedodrží, toho
 * zastaví jedině Cloudflare před tímhle webem.
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
