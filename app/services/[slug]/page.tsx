import type { Metadata } from "next";
import { FiCheck } from "react-icons/fi";
import CtaBox from "../../components/CtaBox";
import PageTemplate from "../../components/PageTemplate";
import ScrollReveal from "../../components/ScrollReveal";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatFallbackTitle = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const serviceContent = {
  einstieg: {
    heroTitle: "Digitales Fundament",
    heroDescription:
      "Moderne Website, Google-Unternehmensprofil und starke lokale Auffindbarkeit als Fundament deines digitalen Auftritts.",
    headline: "Der schnelle Start für deine digitale Sichtbarkeit.",
    intro:
      "Wir schaffen ein solides digitales Fundament für dein Unternehmen: Eine schnelle, vertrauenswürdige Website, ein perfekt optimiertes Google-Unternehmensprofil und ein gezieltes Local-SEO-Setup.",
    pillars: [
      {
        title: "Überzeugende Website",
        text: "Ein moderner Webauftritt, der deine Dienstleistungen klar präsentiert und Interessenten zu Kunden macht.",
      },
      {
        title: "Maximale Sichtbarkeit",
        text: "Ein vollständig eingerichtetes Google-Profil sorgt dafür, dass du regional direkt auf der Karte gefunden wirst.",
      },
      {
        title: "Sofort startklar",
        text: "Kein technisches Chaos: Nach dem Launch steht dein digitales Fundament schlüsselfertig bereit.",
      },
    ],
    context: {
      title: "Wann dieser Schritt für dich richtig ist.",
      text: "Ideal für Unternehmen, die noch keine oder eine veraltete Website besitzen und regional endlich wahrgenommen werden wollen.",
    },
    checklistTitle: "Das ist im Einstieg enthalten",
    checklist: [
      "Moderne, schnelle Website mit klarer Nutzerführung",
      "Vollständige Einrichtung & Optimierung des Google-Unternehmensprofils",
      "Local SEO Grundsetup für deine Region",
      "Eintragen in relevante Branchenverzeichnisse",
      "Optimierung für moderne Suchanfragen & KI-Assistenten",
      "Schlüsselfertige Übergabe inklusive aller Zugänge",
    ],
    process: [
      {
        number: "01",
        title: "Analyse & Setup",
        text: "Wir klären deine Ziele, sammeln notwendige Inhaltsbausteine und definieren die lokale Zielgruppe.",
      },
      {
        number: "02",
        title: "Strukturierte Umsetzung",
        text: "Website, Brancheneinträge und Google-Profil werden parallel aufgebaut und abgestimmt.",
      },
      {
        number: "03",
        title: "Go-Live & Übergabe",
        text: "Deine neue Präsenz geht online. Du erhältst alle Dokumente und bist sofort auffindbar.",
      },
    ],
  },
  retainer: {
    heroTitle: "Laufende Betreuung",
    heroDescription: "Kontinuierliche Optimierung und Pflege für dauerhafte Top-Platzierungen.",
    headline: "Sichtbarkeit, die dir dauerhaft Kunden bringt.",
    intro:
      "Ein einmaliger Launch reicht heute nicht mehr aus. Algorithmen, Suchverhalten und Wettbewerber verändern sich ständig. Wir übernehmen die laufende Pflege und Optimierung deiner digitalen Kanäle.",
    pillars: [
      {
        title: "Laufendes Monitoring",
        text: "Wir überwachen deine Platzierungen und reagieren sofort auf Veränderungen im Markt.",
      },
      {
        title: "Stetige Optimierung",
        text: "Inhalte, Google-Beiträge und technische Details werden kontinuierlich scharfgestellt.",
      },
      {
        title: "Klare Reportings",
        text: "Transparente Berichte zeigen dir genau, wie sich deine Sichtbarkeit und deine Anfragen entwickeln.",
      },
    ],
    context: {
      title: "Wann die Betreuung sinnvoll ist.",
      text: "Perfekt für Unternehmen, die ein bestehendes Fundament besitzen und ihre Marktposition in der Region festigen und ausbauen möchten.",
    },
    checklistTitle: "Das ist in der Betreuung enthalten",
    checklist: [
      "Kontinuierliche Local SEO Optimierung",
      "Aktive Pflege deines Google-Unternehmensprofils",
      "Bewertungsmanagement und Antwort-Abläufe",
      "Regelmäßiges, leicht verständliches Performance-Reporting",
      "Laufende Anpassungen an Algorithmus-Updates",
      "Fester Ansprechpartner für alle digitalen Fragen",
    ],
    process: [
      {
        number: "01",
        title: "Status-Check",
        text: "Wir analysieren den Ist-Zustand deiner Kanäle und legen die Schwerpunkte fest.",
      },
      {
        number: "02",
        title: "Kontinuierliche Arbeit",
        text: "Monat für Monat setzen wir geplante Maßnahmen für mehr Reichweite und Interaktion um.",
      },
      {
        number: "03",
        title: "Auswertung & Feinjustierung",
        text: "Wir besprechen die Ergebnisse transparent mit dir und passen die Strategie flexibel an.",
      },
    ],
  },
  filiale: {
    heroTitle: "Filiallösung",
    heroDescription: "Zentral gesteuerte, lokale Sichtbarkeit für jeden einzelnen Standort.",
    headline: "Einheitliche Marke, starke lokale Präsenz.",
    intro:
      "Wer mehrere Standorte betreibt, kennt das Problem: Unvollständige Öffnungszeiten, veraltete Profile und uneinheitliche Markenauftritte. Wir sorgen für korrekte Daten und hohe Sichtbarkeit an jedem Standort.",
    pillars: [
      {
        title: "Zentrale Steuerung",
        text: "Verwalte hunderte Standortdaten effizient und ohne manuellen Aufwand an jedem einzelnen Ort.",
      },
      {
        title: "Lokale Relevanz",
        text: "Jeder Standort wird genau dort gefunden, wo Kunden in der Nähe nach deinen Angeboten suchen.",
      },
      {
        title: "Markenkonsistenz",
        text: "Einheitliche Bilder, korrekte Daten und professionelle Profilpflege über das gesamte Filialnetz.",
      },
    ],
    context: {
      title: "Wann die Filiallösung greift.",
      text: "Für Unternehmen ab 2 Standorten, die Wildwuchs bei Kartendiensten und Branchenverzeichnissen beenden wollen.",
    },
    checklistTitle: "Das ist in der Filiallösung enthalten",
    checklist: [
      "Synchronisation aller Standorte in zentralen Kartendiensten",
      "Google-Unternehmensprofile für jeden einzelnen Standort",
      "Zentral gesteuertes Bewertungsmanagement",
      "Einheitlicher Markenauftritt bei allen lokalen Suchanfragen",
      "Automatisierter Datenabgleich bei Änderungen (z. B. Feiertage)",
      "Standortbezogenes Reporting für das Management",
    ],
    process: [
      {
        number: "01",
        title: "Netzwerk-Audit",
        text: "Wir prüfen alle bestehenden Standortdaten auf Fehler, Duplikate und Lücken.",
      },
      {
        number: "02",
        title: "Bereinigung & Setup",
        text: "Wir bereinigen fehlerhafte Einträge und bauen eine synchrone Datenbasis auf.",
      },
      {
        number: "03",
        title: "Laufende Verwaltung",
        text: "Alle Standorte bleiben dauerhaft aktuell, geschützt und zentral gepflegt.",
      },
    ],
  },
  individuell: {
    heroTitle: "Individuelle Strategie",
    heroDescription: "Maßgeschneiderte Lösungen für komplexe Anforderungen.",
    headline: "Passgenaue Konzepte abseits vom Standard.",
    intro:
      "Standardpakete passen nicht immer. Wenn du spezielle technische Anforderungen hast, eigene Systeme anbinden möchtest oder gezielte Teilbereiche auslagern willst, entwickeln wir eine exakte Lösung.",
    pillars: [
      {
        title: "Bedarfsanalyse",
        text: "Wir analysieren deine spezifische Ausgangslage und identifizieren die wirksamsten Hebel.",
      },
      {
        title: "Gezielter Einsatz",
        text: "Du buchst nur die Bausteine und Leistungen, die dir echten wirtschaftlichen Vorteil bringen.",
      },
      {
        title: "Höchster Anspruch",
        text: "Maßgeschneiderte Strategieentwicklung mit direkter Sparringspartner-Betreuung auf Augenhöhe.",
      },
    ],
    context: {
      title: "Wann eine individuelle Lösung nötig ist.",
      text: "Für Unternehmen mit komplexen Vertriebsstrukturen, individuellen Schnittstellen oder speziellen Projekten.",
    },
    checklistTitle: "Mögliche individuelle Bausteine",
    checklist: [
      "Maßgeschneiderte Einzelleistungen statt Starrmuster",
      "Flexible Vertrags- und Projektlaufzeiten",
      "Integration in bestehende CRM- und Systemlandschaften",
      "Individuelle Workshop- & Sparringsformate",
      "Gezielte Spezial-Suchmaschinenoptimierung",
      "Persönliche Begleitung durch erfahrene Strategen",
    ],
    process: [
      {
        number: "01",
        title: "Erstgespräch & Anforderungsanalyse",
        text: "Wir besprechen deine Herausforderungen und definieren das konkrete Zielbild.",
      },
      {
        number: "02",
        title: "Individuelles Konzept",
        text: "Du erhältst einen maßgeschneiderten Projektplan inklusive transparenter Aufwände.",
      },
      {
        number: "03",
        title: "Präzise Umsetzung",
        text: "Wir setzen das Konzept Schritt für Schritt um und halten dich stets im Loop.",
      },
    ],
  },
} as const;

export async function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceContent[slug as keyof typeof serviceContent];

  if (!service) {
    return {
      title: `${formatFallbackTitle(slug)} | Nearbase`,
      description: "Leistungsübersicht von Nearbase.",
    };
  }

  return {
    title: `${service.heroTitle} | Nearbase`,
    description: service.heroDescription,
  };
}

export default async function ServicesSubPage({ params }: PageProps) {
  const { slug } = await params;
  const detailedService = serviceContent[slug as keyof typeof serviceContent];

  if (!detailedService) {
    const fallbackTitle = formatFallbackTitle(slug);
    return (
      <PageTemplate
        heroTitle={`Leistung: ${fallbackTitle}`}
        heroDescription="Diese Leistungsseite ist noch in Planung."
      >
        <div style={{ paddingTop: "24px", maxWidth: "800px", margin: "0 auto" }}>
          <p>Wir arbeiten zurzeit an den Inhalten für diese Leistungsseite. Bitte schaue in Kürze wieder vorbei.</p>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      heroTitle={detailedService.heroTitle}
      heroDescription={detailedService.heroDescription}
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left kicker-arrow-anchor service-hero-header">
          <h2 className="process-title">{detailedService.headline}</h2>
          <p className="process-copy">{detailedService.intro}</p>
        </div>
      </section>

      <section className="case-detail-overview dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left">
          <h3 className="about-section-title">{detailedService.context.title}</h3>
        </div>
        <div className="case-detail-section">
          <p className="case-detail-copy">{detailedService.context.text}</p>
        </div>
      </section>

      <section className="about-stats dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-grid">
          {detailedService.pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.title}
              className="process-card"
              delay={index * 0.08}
              amount={0.25}
              x={index % 2 === 0 ? -48 : 48}
              y={16}
            >
              <h3>{pillar.title}</h3>
              <div className="process-number">{`0${index + 1}`}</div>
              <p>{pillar.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="about-divider" />

      <section className="about-why dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="about-why-grid">
          <div className="process-header section-header-left">
            <h3 className="about-section-title">{detailedService.checklistTitle}</h3>
          </div>

          <div className="about-checklist">
            {detailedService.checklist.map((item, index) => (
              <ScrollReveal
                key={item}
                className="about-check-item"
                delay={index * 0.08}
                amount={0.25}
                x={index % 2 === 0 ? -48 : 48}
                y={16}
              >
                <span className="about-check-icon" aria-hidden="true">
                  <FiCheck />
                </span>
                <span>{item}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="about-divider" />

      <section className="services process-section dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left">
          <h3 className="about-section-title">Wie wir vorgehen.</h3>
        </div>

        <div className="process-grid">
          {detailedService.process.map((step, index) => (
            <ScrollReveal
              key={step.number}
              className="process-card service-card"
              delay={index * 0.08}
              amount={0.25}
              x={index % 2 === 0 ? -48 : 48}
              y={16}
            >
              <h3>{step.title}</h3>
              <div className="process-number">{step.number}</div>
              <p>{step.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="cta">
        <CtaBox />
      </section>
    </PageTemplate>
  );
}