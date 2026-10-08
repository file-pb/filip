import type { MetadataRoute } from "next";
import { JAZYKY, ZAKLAD } from "@/lib/jazyky";

/**
 * Při `output: "export"` musí metadata route výslovně říct, že je
 * statická — Next jinak build zastaví. Není to formalita: bez toho
 * by se sitemap generoval za běhu, který tady žádný není.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(JAZYKY).map((jazyk) => ({
    url: `${ZAKLAD}/${jazyk}/`,
    changeFrequency: "monthly",
    priority: jazyk === "cs" ? 1 : 0.8,
  }));
}
