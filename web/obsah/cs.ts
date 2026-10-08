import type { Obsah } from "./typy";

/**
 * Český obsah. Je to jediné místo, kde se texty mění — komponenty žádný
 * text neobsahují. Znění prošlo oponenturou (viz pracovní podklady mimo
 * tenhle repozitář) a platí u něj pravidlo: žádná věta, ke které neexistuje
 * doklad nebo moje rozhodnutí ji tam mít.
 */
export const cs: Obsah = {
  jazyk: "cs",
  druhy: { jazyk: "en", nazev: "English", cesta: "/en/" },

  titulek: "Filip Burda — vývojář .NET a C#",
  popis:
    "Vývojář .NET a C#, programuje profesionálně od roku 2000, převážně na obchodních a finančních systémech. Ve volném čase staví a provozuje vlastní platformu pro hobby projekty.",
  jmeno: "Filip Burda",
  podtitul:
    "Vývojář .NET a C#. Programuju profesionálně od roku 2000, převážně na obchodních a finančních systémech.",
  uvod: [
    "Hardware a programování jsem měl vedle sebe od začátku: vystudoval jsem Střední průmyslovou školu v Písku, obor elektronická a sdělovací zařízení a programování logiky počítačů. Začínal jsem u elektronických zabezpečovacích a požárních systémů a kamer, takže zóny, poplachové stavy, falešné poplachy a napájení pro mě nejsou abstrakce.",
    "Ve volném čase si stavím a provozuju vlastní platformu pro hobby projekty. Neběží na ní cvičná aplikace, ale veřejný web s dohledem, se zálohami, které ověřuju obnovou, a se zapsanými poučeními z poruch, na které jsem narazil.",
  ],

  cimSeZabyvam: {
    nadpis: "Čím se zabývám",
    odstavce: [
      "Programuju profesionálně **od roku 2000**. Dráha nebyla přímá a to je na ní to užitečné: začínal jsem u podnikových a komunikačních systémů, přes ERP jsem se dostal k vedení týmu, pak několik let pracoval na kontrakt, mezi roky 2013 a 2017 jsem to dělal ve vlastní firmě jako jednatel a CTO, a od roku 2021 jsem zpátky v zaměstnaneckém poměru na obchodních a finančních systémech.",
      "**Vedl jsem tým, ve špičce patnáctičlenný** — dva roky v roli Scrum mastera, čtyři roky jako CTO ve vlastní firmě. Těch patnáct je největší tým, který jsem vedl, ne velikost u obou rolí. Z té doby je i práce pro **Škoda-Auto**: architektura Azure pro jednotné přihlašování a modul, který páruje profily uživatele a prohlížeče napříč jejími komponentami.",
      "Vedle toho si od září 2026 stavím vlastní platformu, na které zkouším věci, na které se v práci nedostanu.",
      "**Kód na mých projektech vzniká s pomocí AI. Moje práce je zadání, oponentura, rozhodnutí a provoz.** Píšu to takhle přímo, protože je to podstatné: hodnota není v tom, kolik řádků jsem napsal, ale v tom, že ty systémy běží, mají ověřené zálohy a vím o nich, kde mají slabá místa — včetně toho, co ověřené ještě není.",
    ],
    dokladyNadpis: "Čím se to dá doložit",
    doklady: [
      {
        nadpis: "Provoz, ne demo.",
        text: "Platforma běží od září 2026. Web i jeho API odpovídají zvenčí s platným certifikátem a web hlásí, z jakého commitu je postavený — dá se tedy ověřit, že běží právě to, co je v gitu. Dohled hlásí poruchy e-mailem a má denní zkoušku, jestli ten kanál vůbec funguje; zavedl jsem ji po tom, co alerty tři dny tiše nechodily kvůli propadlému heslu.",
      },
      {
        nadpis: "Zálohy se ověřují obnovou.",
        text: "Nestačí mi, že dump vznikl — log hlásil „záloha ok“ každou noc i v době, kdy v ní chyběla polovina potřebných věcí. Ověření je dnes jeden příkaz: rozšifruje zálohu tajemství a porovná ji s tím, co na serveru doopravdy leží, a obnoví všechny databáze do dočasného Postgresu vedle ostrých, kde srovná počty tabulek. Takhle mám za sebou dvě části ze tří; třetí — rozběhnutí na úplně novém stroji — zbývá. Píšu to takhle přesně schválně: ověřené je, že tajemství i databáze se **načtou**. Že by po havárii naběhla celá platforma, ověřené není, a dokud neproběhne třetí část, tvrdit to nebudu.",
      },
      {
        nadpis: "Rozhodnutí mají napsaný důvod a spoušť.",
        text: "U každé architektonické volby je zapsané, proč padla a za jakých okolností ji přehodnotit. Bez toho se k rozhodnutí za rok nevrátíš, jen ho obejdeš.",
      },
      {
        nadpis: "Padesát zapsaných poučení z provozu — a dvě z nich neměla žádný příznak.",
        text: "Souhrn nic neřekne, takže tři konkrétní, u kterých mám zapsaný příznak, příčinu i opravu: *(a)* zdravotní kontrola s krátkým timeoutem měnila přetížení ve výpadek — web odpovídal pomalu, ale správně, a dohled přitom dostal 503; *(b)* záloha hlásila „ok“ a přitom v ní chyběl přihlašovací token jedné služby, konfigurace a tajemství aplikací — našel to nácvik obnovy, ne log; *(c)* skript na zakládání nového projektu potichu přepsal vlastníka tajemství jiné, běžící aplikaci — ta by to poznala až při restartu.",
      },
    ],
    technologieNadpis: "Technologie, se kterými to běží",
    technologie: [
      {
        nadpis: "Backend a data:",
        text: ".NET 10, C#, PostgreSQL. Testy: xUnit, Shouldly a Testcontainers — tedy proti skutečnému Postgresu v kontejneru, ne proti napodobenině. Kontrakt na vstupu fixuju uloženými payloady, aby ho nešlo změnit nepozorovaně.",
      },
      {
        nadpis: "Frontend:",
        text: "TypeScript, Next.js, React. CSS píšu ručně, bez frameworku, s proměnnými a tmavým režimem. Obrázky generuju předem do AVIF v několika šířkách, místo abych je zpracovával za běhu.",
      },
      {
        nadpis: "Provoz:",
        text: "Docker a Compose, Traefik s certifikáty přes DNS-01, nginx jako mikrocache, Seq na logy, Uptime Kuma na dohled. Definice nasazení je v gitu, ne v nějakém ovládacím panelu.",
      },
      {
        nadpis: "Ostatní:",
        text: "Python na dávkové úlohy, React Native a Expo na mobilní aplikaci.",
      },
    ],
    vyberNadpis: "Jak vybírám",
    vyber: [
      "Nejdřív přenositelnost, pak škálovatelnost, pak možnost hladkých změn. Kritérium je vždycky **kolik stojí odchod**, ne jak dobré to řešení je samo o sobě. Proto mám definice nasazení v gitu a vyhýbám se službám, které se nedají vyměnit za standardní ekvivalent.",
    ],
  },

  projekty: {
    nadpis: "Projekty",
    polozky: [
      {
        nazev: "Hračkárna — vlastní platforma",
        odstavce: [
          "Server, na kterém běží moje hobby projekty. Jeden stroj, provozní náklady v jednotkách eur měsíčně, a celá definice v gitu.",
          "Co na něm je: Traefik jako vstupní bod s automatickými certifikáty, PostgreSQL, Seq na logy, Uptime Kuma na dohled, přehled stavu, který se přepisuje z cronu, noční zálohy šifrované a odkládané mimo stroj, a skripty, kterými se zakládá nový projekt tak, aby si nešlápl na ostatní.",
          "Co je na tom zajímavější než výčet: je to napsané tak, aby se to dalo odstěhovat. A aby se po havárii dalo obnovit — což zkouším obnovou, ne důvěrou.",
          "*Soukromý repozitář. Rád ho ukážu.*",
        ],
      },
      {
        nazev: "Orlický pohár — web seriálu závodů plachetnic",
        odstavce: [
          "Zdaleka největší věc, kterou mám. Veřejné výsledky, přihlašování lodí do závodu s workflow stavů, role vázané ke konkrétní lodi (majitel, kapitán, posádka, fanoušek) a bodování podle Závodních pravidel jachtingu 2025–2028.",
          "Vedle toho data z reálného světa, protože bez nich by to byla jen tabulka: stav vodní hladiny z Povodí Vltavy, počasí, novinky ze svazu, a **povrchová teplota přehrady počítaná z družicových snímků Landsat 8 a 9** — aby jachtaři věděli, jaká je voda. K webu patří i mobilní aplikace a obrazovka, která ukazuje, kolik provoz webu stojí.",
          "U satelitní teploty je na stránce vidět i to, co je na ní nejistého: že je to odhad horní vrstvy vody v poledne, že **nebyla ověřena teploměrem**, a jak starý je snímek, ze kterého vyšla. Kdo se podle toho rozhoduje, jestli si půjde zaplavat, by to vědět měl.",
          "**Stav:** nasazené a běží. První závod, který na tom pojede s reálnými daty, je ale až v květnu 2027 — takže ostrý provoz se závodem to zatím za sebou nemá.",
        ],
        odkaz: { text: "orlickypohar.klihovka.cz", adresa: "https://orlickypohar.klihovka.cz" },
      },
      {
        nazev: "Telemetrie — příjem měření",
        odstavce: [
          "Malá služba, která přijímá měření z různých zdrojů do jednoho místa. Prototyp, ne hotový produkt — zajímavý je na ní návrh vstupního kontraktu: rozlišuje čas měření od času přijetí, umí revizi předpovědi a má uložené payloady pro ESP32 i pro Signal K, které kontrakt fixují. Důvod je praktický: firmware na lodi nepřeflashuješ na dálku, takže se vstup nesmí rozbít.",
        ],
      },
      {
        nazev: "Vlastní nástroje pro práci s AI",
        odstavce: [
          "Od července 2026 si píšu nadstavbu nad AI nástroje, které používám na kódování. Nejužitečnější část je měření: kolik která práce skutečně spotřebovala, čtené ze záznamů nástroje, ne z odhadu.",
        ],
      },
    ],
  },

  jakPracuju: {
    nadpis: "Jak pracuju",
    uvod:
      "Tahle část je podle mě užitečnější než seznam technologií, protože technologie se dají dohnat.",
    polozky: [
      {
        nadpis: "Tvrzení se opírá o doklad, a doklad musí odpovídat tvrzení.",
        odstavce: [
          "Tvrzení o kódu doložím řádkem kódu. Tvrzení o provozu řádek kódu nedoloží — na to je potřeba měření. Je to rozlišení, které se snadno přeskočí, a pak se na něm staví rozhodnutí.",
        ],
      },
      {
        nadpis: "U kontroly ověřuju, že kontroluje výsledek, a ne vstup.",
        odstavce: [
          "Konkrétní případ, na kterém jsem se to naučil: ochranu proti instalaci čerstvě vydaných balíčků jsem chtěl ověřit příkazem, který vypsal nastavenou hodnotu. Jenže ten příkaz vrátí tu hodnotu i tam, kde ji nástroj vůbec neumí použít. Kontroloval vstup. Výsledek neověřil nikdo.",
        ],
      },
      {
        nadpis: "Vlastní plány si nechávám oponovat a rozhoduju, co z nálezů přijmu.",
        odstavce: [
          "Než něco postavím, dám plán nezávislému modelu jako oponentovi. Poslední takový plán má pět verzí a každá začíná tabulkou toho, co se v předchozí nepotvrdilo. Několikrát přitom padl nejen závěr, ale i důvod, kvůli kterému jsem ho považoval za správný — a to je cennější než padlý závěr.",
          "Můj podíl je v tom konkrétní a stojí za upřesnění: oponenturu zadám a pak rozhodnu, které nálezy se přijmou a čím se začne. Zapracování dělá nástroj, rozhodnutí ne. U poháru to naposledy znamenalo začít přidělováním kapitánských práv, protože to byla potvrzená vada blokující správu lodi.",
        ],
      },
      {
        nadpis: "Oprava patří tam, odkud chyba přišla.",
        odstavce: [
          "Když se vada objeví v projektu, ale vznikla v šabloně, opravuje se šablona. Jinak ji zdědí každý další projekt.",
        ],
      },
      {
        nadpis: "Produkci nejde vrátit do minulosti.",
        odstavce: [
          "Nasazovací postup kontroluje, že nasazovaná verze skutečně navazuje na tu běžící, a jinak nasazení odmítne. Vzniklo to z obavy, která se dala předvídat, ne z havárie.",
        ],
      },
    ],
  },

  mimoPraci: {
    nadpis: "Mimo práci",
    polozky: [
      {
        nadpis: "Jachting.",
        text: "Dvacetičtyřstopá kajutová plachetnička na Orlíku a plavby na moři. Průkazy: VMP, námořní B, chorvatská B a RYA SRC — tedy i zkouška radiooperátora, což se s tou elektronikou na lodi potkává. Z jachtingu mimochodem vznikl i web Orlického poháru.",
      },
      { nadpis: "Fotbal.", text: "UEFA B Diploma." },
      {
        nadpis: "Elektronika kolem lodi.",
        text: "Zajímá mě NMEA 2000 a hlídání LiFePO4 baterie — tedy ta oblast, kde se potkává moje dřívější práce se zabezpečovacími systémy s tou dnešní. Zatím celé řešení skládám nasucho doma; na loď půjde při zazimování, až vyjde z vody. Na softwarové straně už kvůli tomu v telemetrii stojí vstupní kontrakt, který s měřeními z ESP32 a ze Signal K počítá.",
      },
    ],
  },

  kontakt: {
    nadpis: "Kontakt",
    mesto: "Příbram",
    // Adresa je rozdělená schválně: v HTML se celá neobjeví a mailto se
    // skládá až při kliknutí. Vyplněno 9. 10. 2026 podle kontaktu
    // v Filipově vlastním CV, které poslal jako podklad pro tuhle stránku.
    // Změna je jedna řádka tady a jedna v en.ts.
    mail: { uzivatel: "filipburda75", domena: "gmail.com" },
    nahrada: "filipburda75 [zavináč] gmail.com",
  },

  umi: [
    ".NET",
    "C#",
    "ASP.NET Core",
    "PostgreSQL",
    "TypeScript",
    "Next.js",
    "React",
    "Docker",
    "Traefik",
    "Python",
    "React Native",
    "Azure",
  ],
};
