import type { Obsah } from "./typy";

/**
 * Anglický obsah. **Psaný, ne přeložený** — tak to má plán. Pokud sem
 * přidáváš větu, která v `cs.ts` není, patří nejdřív do podkladu
 * a do mapy dokladů: anglická verze nesmí tvrdit nic, co česká ne.
 *
 * Uvozovky jsou typografické („curly“) místo ASCII — anglická konvence,
 * a navíc se v nich nemusí nic escapovat.
 */
export const en: Obsah = {
  jazyk: "en",
  druhy: { jazyk: "cs", nazev: "Česky", cesta: "/cs/" },

  titulek: "Filip Burda — .NET and C# developer",
  popis:
    ".NET and C# developer, programming professionally since 2000, mostly on financial systems. Builds and runs his own platform for hobby projects.",
  jmeno: "Filip Burda",
  podtitul:
    ".NET and C# developer. Programming professionally since 2000, mostly on financial systems.",
  uvod: [
    "I had hardware and programming side by side from the start: I trained at the secondary technical school in Písek, in electronic and telecommunications equipment and computer-logic programming. I started out on intruder and fire alarm systems and CCTV, so zones, alarm states, false alarms and power budgets aren’t abstractions to me.",
    "In my own time I build and run a small platform for hobby projects. What runs on it isn’t a demo: a public website with monitoring, backups I verify by restoring them, and written-up lessons from faults I actually hit.",
  ],

  cimSeZabyvam: {
    nadpis: "What I do",
    odstavce: [
      "I’ve been programming professionally **since 2000**. The path wasn’t straight, which is the useful part: I started on business and communications systems, came to team leadership by way of an ERP product, then spent several years on contract, ran my own company as its managing director and CTO from 2013 to 2017, and since 2021 I’ve been back in employment working on financial systems.",
      "**I’ve led a team, fifteen people at its largest** — two years in a Scrum master role, four as CTO of my own company. Fifteen is the largest team I led, not the size under both roles. That period also covers the work for **Škoda-Auto**: Azure architecture for single sign-on, and a module that pairs user and browser profiles across its components.",
      "Alongside that, since September 2026, I’ve been building my own platform — somewhere to try the things I don’t get to otherwise.",
      "**The code on my own projects is written with AI. My job is the brief, the critical review, the decisions and the operations.** I put it that bluntly because it’s the point: the value isn’t in how many lines I typed. It’s that these systems run, that their backups are verified, and that I know where their weak spots are — including the ones still unverified.",
    ],
    dokladyNadpis: "What backs that up",
    doklady: [
      {
        nadpis: "In service, not on a laptop.",
        text: "The platform has been running since September 2026. The site and its API answer from the outside with a valid certificate, and the site reports the commit it was built from — so you can check that what’s running is what’s in git. Monitoring reports faults by e-mail and tests daily whether that channel works at all. I added that test after alerts went quietly undelivered for three days because a password had expired.",
      },
      {
        nadpis: "Backups are verified by restoring them.",
        text: "A dump existing isn’t enough — the log reported “backup ok” every night during a period when half of what I needed was missing from it. Verification is now one command: it decrypts the secrets backup and diffs it against what’s actually on the server, then restores every database into a throwaway Postgres beside the live one and compares table counts. That’s two of the drill’s three parts done; the third — bringing everything up on a brand-new machine — is still ahead of me. I’m deliberately precise here: what’s verified is that secrets and databases **load**. That the whole platform would come back up after a disaster is not verified, and I won’t claim it until that third part runs.",
      },
      {
        nadpis: "Decisions carry a reason and a trigger.",
        text: "Every architectural choice is written down with why it was made and what would make me revisit it. Without the trigger you don’t return to a decision a year later — you just work around it.",
      },
      {
        nadpis: "Fifty written-up lessons from operations — and two of them had no symptom.",
        text: "A count tells you nothing, so three specifics, each with a recorded symptom, cause and fix: *(a)* a health check with a short timeout turned overload into an outage — the site was answering slowly but correctly, while monitoring got a 503; *(b)* a backup reported “ok” while missing one service’s sign-in token, its configuration and the applications’ secrets — the restore drill found it, the log never did; *(c)* a project-creation script silently took ownership of a running application’s secrets, which that application would only have discovered on its next restart.",
      },
    ],
    technologieNadpis: "The stack it runs on",
    technologie: [
      {
        nadpis: "Backend and data:",
        text: ".NET 10, C#, PostgreSQL. Tests run on xUnit, Shouldly and Testcontainers — against a real Postgres in a container rather than a stand-in. The ingest contract is pinned by stored payloads so it can’t drift unnoticed.",
      },
      {
        nadpis: "Frontend:",
        text: "TypeScript, Next.js, React. I write CSS by hand, no framework, with custom properties and a dark mode. Images are pre-generated to AVIF at several widths instead of being processed at request time.",
      },
      {
        nadpis: "Operations:",
        text: "Docker and Compose, Traefik with DNS-01 certificates, nginx as a micro-cache, Seq for logs, Uptime Kuma for monitoring. The deployment definition lives in git, not in somebody’s control panel.",
      },
      {
        nadpis: "Also:",
        text: "Python for batch jobs, React Native and Expo for the mobile app.",
      },
    ],
    vyberNadpis: "How I choose",
    vyber: [
      "Portability first, then scalability, then how smoothly things can change. The test is always **what leaving would cost**, not how good a given option looks on its own. That’s why deployment definitions sit in git and why I avoid services that can’t be swapped for a standard equivalent.",
    ],
  },

  projekty: {
    nadpis: "Projects",
    polozky: [
      {
        nazev: "Hračkárna — my own platform",
        odstavce: [
          "*The name is Czech for “the toy room”, which is roughly the brief.*",
          "One server running my hobby projects, with operating costs in the low single digits of euros a month and the whole definition in git.",
          "On it: Traefik as the entry point with automatic certificates, PostgreSQL, Seq for logs, Uptime Kuma for monitoring, a status overview rewritten from cron, nightly backups encrypted and shipped off the machine, and scripts that create a new project without letting it tread on the others.",
          "The interesting part isn’t the list. It’s that the whole thing is written to be moved — and to be brought back after a failure, which I check by restoring, not by trusting.",
          "*Private repository. Happy to walk through it.*",
        ],
      },
      {
        nazev: "Orlický pohár — website for a sailing race series",
        odstavce: [
          "By far the largest thing I have. Public results, boat entry with a workflow of states, roles bound to a specific boat (owner, skipper, crew, supporter), and scoring under the Racing Rules of Sailing 2025–2028.",
          "On top of that, data from the physical world, without which it would just be a table: reservoir water level from the river authority, weather, news from the national sailing association, and **the reservoir’s surface temperature computed from Landsat 8 and 9 imagery** — so sailors know what the water is like. There’s a mobile app, and a screen showing what running the site costs.",
          "What the page also shows about the satellite temperature is what’s uncertain about it: that it’s an estimate of the surface layer at midday, that it **hasn’t been checked against a thermometer**, and how old the image behind it is. Anyone deciding whether to go for a swim deserves to know that.",
          "**Status:** deployed and running. The first race it will serve with live data is in May 2027, so it hasn’t yet been through a race day under real race conditions.",
        ],
        odkaz: { text: "orlickypohar.klihovka.cz", adresa: "https://orlickypohar.klihovka.cz" },
      },
      {
        nazev: "Telemetrie — measurement ingest",
        odstavce: [
          "A small service that takes measurements from several sources into one place. A prototype rather than a finished product; what’s interesting is the shape of the ingest contract. It separates the time of measurement from the time of receipt, handles a revised forecast, and is pinned by stored payloads for both ESP32 devices and Signal K. The reason is practical: you can’t reflash the firmware on a boat remotely, so the input must not break.",
        ],
      },
      {
        nazev: "My own tooling for working with AI",
        odstavce: [
          "Since July 2026 I’ve been writing a layer on top of the AI tools I code with. The most useful part is measurement: what a given piece of work actually consumed, read out of the tool’s own records rather than estimated.",
        ],
      },
    ],
  },

  jakPracuju: {
    nadpis: "How I work",
    uvod:
      "This section is more useful than a list of technologies, because technologies can be caught up on.",
    polozky: [
      {
        nadpis: "A claim rests on evidence, and the evidence has to match the claim.",
        odstavce: [
          "A claim about code I back with a line of code. A claim about production, a line of code does not back — that needs a measurement. It’s an easy distinction to skip, and then decisions get built on top of it.",
        ],
      },
      {
        nadpis: "For any check, I verify that it checks the result and not the input.",
        odstavce: [
          "The case that taught me: I wanted to confirm a guard against installing freshly published packages, and used a command that printed the configured value. But that command returns the value even where the tool can’t act on it at all. It checked the input. Nobody checked the result.",
        ],
      },
      {
        nadpis: "I have my own plans adversarially reviewed by a second model, and I decide what to accept.",
        odstavce: [
          "Before I build something, I hand the plan to an independent model and ask it to attack the reasoning. The most recent such plan is on its fifth version, and each version opens with a table of what the previous one got wrong. More than once it wasn’t just the conclusion that fell, but the reason I thought it was right — which is worth more.",
          "My own part in that is specific and worth stating: I commission the review, then decide which findings to take and what to start with. The tool does the rework; it doesn’t make the call. On the sailing project, the last time that meant starting with how skipper permissions are granted, because that was a confirmed defect blocking boat administration.",
        ],
      },
      {
        nadpis: "A fix belongs where the fault came from.",
        odstavce: [
          "When a defect surfaces in a project but originated in the template, the template gets fixed. Otherwise every later project inherits it.",
        ],
      },
      {
        nadpis: "Production doesn’t go backwards.",
        odstavce: [
          "The deployment process checks that the version being deployed actually descends from the one already running, and refuses the deployment otherwise. It came out of a foreseeable worry rather than an incident.",
        ],
      },
    ],
  },

  mimoPraci: {
    nadpis: "Outside work",
    polozky: [
      {
        nadpis: "Sailing.",
        text: "A 24-foot cabin yacht on the Orlík reservoir in Czechia, and sailing at sea. Certificates: Czech inland VMP, Czech marine B, Croatian B and **RYA SRC** — so a radio operator’s ticket too, which meets the boat electronics halfway. The race series website came out of the sailing.",
      },
      { nadpis: "Football.", text: "UEFA B Diploma." },
      {
        nadpis: "Boat electronics.",
        text: "NMEA 2000 and keeping an eye on a LiFePO4 battery bank — which is exactly where my old work on alarm systems meets the current one. Right now I’m assembling the whole thing dry on the bench at home; it goes into the boat when she comes out of the water for the winter. On the software side, the ingest contract in Telemetrie already allows for measurements from ESP32 and Signal K.",
      },
    ],
  },

  kontakt: {
    nadpis: "Contact",
    mesto: "Příbram, Czechia",
    mail: { uzivatel: "VYPLNIT", domena: "VYPLNIT" },
    nahrada: "VYPLNIT [at] VYPLNIT",
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
