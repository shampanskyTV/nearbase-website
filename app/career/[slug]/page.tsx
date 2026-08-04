import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import PageTemplate from "../../components/PageTemplate";
import ScrollReveal from "../../components/ScrollReveal";

type PageParams = {
  slug: string;
};

const TALLY_FORM_URL = "https://tally.so/r/DEIN-FORMULAR-CODE";

const careerPages = {
  vertriebspartner: {
    heading: "Selbstständiger Vertriebspartner (m/w/d)",
    subheading:
      "Digitale Sichtbarkeit für lokale Unternehmen und Filialisten · Provisionsbasis · Ortsunabhängig",
    intro:
      "Nearbase ist eine Digitalagentur für lokale Unternehmen und Filialisten. Wir übernehmen Website, Suchmaschinensichtbarkeit und Google-Unternehmensprofil aus einer Hand, ergänzt durch laufende Betreuung. Zu unseren Kunden zählen Einzelstandorte ebenso wie bundesweite Filialisten, darunter Matratzen Concord, sowie B2B-Kunden wie steuerkanzlei.berlin und mehrere Beauty- und Friseursalons. Zur Erweiterung unseres Vertriebs suchen wir Partner, die neue Kunden für unser Angebot gewinnen.",
    sections: [
      {
        kicker: "Ihre Aufgabe",
        items: [
          "Sie gewinnen neue Kunden für unser Angebot, sei es über gezielte Kaltakquise, ein bestehendes Netzwerk zu lokalen Unternehmen oder eigene Kontakte. Wie Sie vorgehen, entscheiden Sie selbst, entscheidend ist das Ergebnis",
          "Terminvereinbarung und Abschluss liegen in Ihrer Verantwortung",
          "Nach dem Abschluss übernimmt unser Umsetzungsteam die weitere Bearbeitung, sodass Sie sich auf die Neukundengewinnung konzentrieren können",
        ],
      },
      {
        kicker: "Ihr Profil",
        items: [
          "Erfahrung im Vertrieb ist von Vorteil, aber keine Voraussetzung",
          "Sicheres, überzeugendes Auftreten im direkten Kontakt mit potenziellen Kunden",
          "Eigenes Gewerbe oder Bereitschaft zur Anmeldung",
          "Selbstständige und eigenverantwortliche Arbeitsweise",
          "Idealerweise 15 bis 20 Stunden pro Woche, um spürbare Ergebnisse zu erzielen. Als Selbstständiger entscheiden Sie eigenständig über Ihren zeitlichen Einsatz",
        ],
      },
      {
        kicker: "Das bieten wir",
        items: [
          "Ein am Markt bewährtes Angebot mit nachweisbaren Referenzen, kein unerprobtes Konzept",
          "Vorgefertigtes Verkaufsskript sowie qualifizierte Zielgruppenlisten für alle, die über Kaltakquise arbeiten möchten",
          "Direkten Kontakt zur Geschäftsführung ohne lange Entscheidungswege",
          "Vollständige Flexibilität bei Arbeitszeit, Arbeitsort und Vorgehensweise",
          "Perspektivisch ergänzende Inbound-Leads für Ihren Abschlussprozess",
        ],
      },
    ],
    compensation: {
      kicker: "Provision",
      text: "Sie erhalten eine gestaffelte Provision auf jeden Einmalabschluss sowie eine Beteiligung an den monatlichen Betreuungsgebühren, solange der jeweilige Kunde bei uns bleibt. Unser Einstiegspaket umfasst Website, Google-Unternehmensprofil und lokales SEO-Setup für 2.490 Euro, die laufende Betreuung danach 890 Euro pro Monat.",
      example:
        "Beispielrechnung, unverbindlich: Bei 5 Express-Abschlüssen im Monat und einer Provision von 18% ergibt sich eine Provision von rund 2.250 Euro. Werden davon 3 Kunden zu Betreuungskunden, kommt in den ersten Monaten eine zusätzliche Beteiligung von rund 400 Euro pro Monat hinzu. Mit steigender Abschlusszahl wächst die Provisionsstufe auf bis zu 22%.",
    },
  },
} as const;

export default async function CareerDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const pageData = careerPages[slug as keyof typeof careerPages];

  if (!pageData) {
    return (
      <PageTemplate
        heroTitle="Position nicht gefunden"
        heroDescription="Diese Stellenausschreibung ist aktuell nicht verfügbar."
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
        contentTopPadding="0"
      >
        <section className="dot-grid-section dot-grid-left">
          <div className="dot-grid-layer" aria-hidden="true" />
          <ScrollReveal className="case-placeholder-card" amount={0.35} y={14} scale={0.98}>
            <h3>Position nicht gefunden</h3>
            <p>Diese Stellenausschreibung ist aktuell nicht verfügbar.</p>
            <div className="case-placeholder-actions">
              <Link href="/career" className="btn-begin-2">Zur Übersicht</Link>
            </div>
          </ScrollReveal>
        </section>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      heroTitle={pageData.heading}
      heroDescription={pageData.subheading}
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left kicker-arrow-anchor">
          <div className="process-kicker">Karriere</div>
          <h2 className="process-title">{pageData.heading}</h2>
          <p className="process-copy">{pageData.subheading}</p>
        </div>
      </section>

      <section className="case-detail-overview dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <ScrollReveal className="case-detail-panel" amount={0.25} y={14}>
          <div className="process-kicker">Über uns</div>
          <p className="case-detail-copy">{pageData.intro}</p>
        </ScrollReveal>
      </section>

      <div className="about-divider" />

      <section className="case-detail-sections dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        {pageData.sections.map((section, index) => (
          <ScrollReveal key={section.kicker} className="case-detail-section" delay={Math.min(index * 0.06, 0.24)} amount={0.4} x={index % 2 === 0 ? -30 : 30} y={10}>
            <div className="process-kicker">{section.kicker}</div>
            <div className="case-service-list">
              {section.items.map((item) => (
                <div key={item} className="case-service-item">
                  <span className="case-service-icon" aria-hidden="true"><FiChevronRight /></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </section>

      <div className="about-divider" />

      <section className="case-detail-overview dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <ScrollReveal className="case-detail-panel" amount={0.3} y={14}>
          <div className="process-kicker">{pageData.compensation.kicker}</div>
          <p className="case-detail-copy">{pageData.compensation.text}</p>
          <p className="case-detail-copy" style={{ marginTop: "12px" }}>{pageData.compensation.example}</p>
        </ScrollReveal>
      </section>

      <section className="cta">
        <div className="container">
          <a href={TALLY_FORM_URL} target="_blank" rel="noopener noreferrer" className="cta-box" style={{ display: "block" }}>
            <p className="cta-box-kicker">Interesse?</p>
            <div className="cta-box-row">
              <h2>Jetzt bewerben</h2>
              <span className="cta-box-button">
                <span className="cta-box-button-arrow">
                  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
                  </svg>
                </span>
              </span>
            </div>
          </a>
        </div>
      </section>
    </PageTemplate>
  );
}