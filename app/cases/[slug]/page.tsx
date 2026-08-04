import type { Metadata } from "next";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import CountUpInView from "../../components/CountUpInView";
import CtaBox from "../../components/CtaBox";
import PageTemplate from "../../components/PageTemplate";
import ScrollReveal from "../../components/ScrollReveal";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const caseStudyPages = {
  "matratzen-concord": {
    label: "Matratzen Concord",
    title: "Matratzen Concord",
    description: "Wie wir 560 Filialen sauber bei Google eingebunden und lokale Suchanfragen direkt in Ladenbesuche verwandelt haben.",
  },
  "steuerkanzlei-berlin": {
    label: "steuerkanzlei.berlin",
    title: "steuerkanzlei.berlin",
    description: "Wie eine neue Kanzlei ohne bestehenden Kundenstamm heute wöchentlich 10 bis 15 qualifizierte Mandantenanfragen gewinnt.",
  },
  "naturfriseur": {
    label: "Naturfriseur in Köln",
    title: "Naturfriseur in Köln",
    description: "Wie ein etablierter Salon mit vollem Terminkalender seine Online-Reichweite ausgebaut und Neukunden-Anfragen verdoppelt hat.",
  },
  "verkehrsrecht-kanzlei": {
    label: "Kanzlei für Verkehrsrecht",
    title: "Kanzlei für Verkehrsrecht",
    description: "Von Google-Seite 3 direkt auf die vorderen Plätze: Wie Unfallgeschädigte die Kanzlei heute sofort online finden.",
  },
  handwerksbetrieb: {
    label: "Handwerksbetrieb",
    title: "Handwerksbetrieb",
    description: "Unabhängig von Mundpropaganda: Wie ein Betrieb jeden Monat verlässlich 5 direkte Auftragsanfragen über die Website bekommt.",
  },
  "beauty-studio": {
    label: "Beauty-Studio",
    title: "Beauty-Studio",
    description: "Keine leeren Klicks mehr: Wie ein Studio durch sauberes Google-Profil seine Online-Terminbuchungen verdoppelt hat.",
  },
  "autohaus-filialen": {
    label: "Autohaus mit mehreren Standorten",
    title: "Autohaus mit mehreren Standorten",
    description: "Falsche Nummern und doppelte Einträge gelöscht: Ein klarer, einheitlicher Markenauftritt über 12 Standorte hinweg.",
  },
  "physiotherapie-standorte": {
    label: "Physiotherapie-Praxiskette",
    title: "Physiotherapie-Praxiskette",
    description: "Neuer Standort eröffnet? Mit unserem Standard-Setup ist jede neue Praxis innerhalb von 10 Tagen lokal bei Google auffindbar.",
  },
} as const;

const formatFallbackTitle = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const parseStatValueForCountUp = (value: string) => {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return null;
  const [, prefix = "", numericPart, suffix = ""] = match;
  return { to: Number(numericPart), prefix, suffix };
};

export async function generateStaticParams() {
  return Object.keys(caseStudyPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = caseStudyPages[slug as keyof typeof caseStudyPages];
  const title = pageData?.label ?? formatFallbackTitle(slug);
  const description = pageData?.description ?? "Echte Praxisbeispiele von Nearbase.";

  return {
    title: `${title} – Praxisbeispiel | Nearbase`,
    description,
  };
}

export default async function CaseStudyPlaceholderPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const pageData = caseStudyPages[slug as keyof typeof caseStudyPages];
  const title = pageData?.label ?? formatFallbackTitle(slug);

  const caseStudyContent = {
"matratzen-concord": {
      heading: "Matratzen Concord",
      subheading: "Digitale Pflege für über 560 Filialen in Deutschland, Österreich und der Schweiz.",
      company: "Matratzen Concord gehört mit rund 560 Filialen zu den bekanntesten Fachhändlern im DACH-Raum. Vor der Zusammenarbeit mit Nearbase hat unser Gründerteam bereits das digitale Wachstum von Matratzen Concord in einer anderen Funktion begleitet: von 2019 bis 2024 stieg der digitale Umsatz von 4 auf 19 Millionen Euro, die organische Sichtbarkeit vervierfachte sich, die Kosten pro Bestellung sanken um drei Viertel.",
      services: ["Lokale Google-Profile", "Filialfinder-Website", "Bewertungsverwaltung", "Zentrale Datenpflege"],
      stats: [
        { value: "560+", label: "Betreute Standorte" },
        { value: "950.000+", label: "Seitenaufrufe" },
        { value: "4,8", label: "Ø Sternebewertung" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Bei Hunderten Filialen ändern sich ständig Öffnungszeiten oder Kontaktdaten. Früher wurden diese Änderungen oft manuell gepflegt – das führte zu falschen Angaben, enttäuschten Kunden vor verschlossenen Türen und unnötigem Verwaltungsaufwand." },
        { kicker: "Ziel", text: "Jeder einzelne Standort sollte bei Google Maps und in der Suche sofort mit korrekten Daten, sauberen Öffnungszeiten und direkter Routenplanung auffindbar sein." },
        { kicker: "Was wir gemacht haben", text: "Wir haben alle Verzeichniseinträge bereinigt, zusammengeführt und mit der Hauptdatenbank verknüpft. Zudem wurde ein schneller Filialfinder auf der Website integriert, der Suchende direkt zum nächstgelegenen Geschäft führt." },
        { kicker: "Ergebnis", text: "Über 15.000 Einträge laufen heute synchron, über 10.500 Bewertungen wurden strukturiert gesammelt. Seit der Umsetzung zählen wir über 950.000 Seitenaufrufe, mehr als 138.000 Klicks auf Call-to-Actions, rund 35.000 Klicks auf Wegbeschreibungen und über 22.000 Anrufe direkt aus der lokalen Suche." },
      ],
    },
    "steuerkanzlei-berlin": {
      heading: "steuerkanzlei.berlin",
      subheading: "Neugründung ohne Altmandanten und ohne teures Werbebudget.",
      company: "steuerkanzlei.berlin stand nach der Gründung vor dem klassischen Problem: Eine hervorragende Qualifikation, aber noch keine Mandanten im Umkreis.",
      services: ["Website-Aufbau", "Lokale Google-Optimierung", "Anfrage-Formulare", "Laufende Betreuung"],
      stats: [
        { value: "10x", label: "Mehr Suchanfragen" },
        { value: "10-15", label: "Qualifizierte Anfragen / Woche" },
        { value: "12", label: "Monate verlässliche Partnerschaft" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Kaltakquise bringt bei Steuerberatern wenig und teure Werbeanzeigen verbrennen schnell Budget. Gesucht war ein Weg, wie Mandanten, die aktiv nach Beratung in Berlin suchen, direkt auf die Kanzlei aufmerksam werden." },
        { kicker: "Ziel", text: "Ein stetiger Strom an neuen Anfragen von Unternehmen und Privatpersonen aus der Region, die gezielt nach steuerlicher Unterstützung suchen." },
        { kicker: "Was wir gemacht haben", text: "Wir haben eine übersichtliche, vertrauenerweckende Website gebaut und die Kanzlei für die wichtigsten Suchbegriffe in Berlin lokal positioniert. Keine unverständlichen Fachbegriffe, sondern klare Antworten auf die Fragen der Mandanten." },
        { kicker: "Ergebnis", text: "Schon nach wenigen Monaten stieg die Reichweite drastisch. Heute kommen jede Woche 10 bis 15 konkrete Anfragen über die Website – ohne einen Cent für Werbeanzeigen auszugeben." },
      ],
    },
    "naturfriseur": {
      heading: "Naturfriseur in Köln",
      subheading: "Gute Arbeit vor Ort, aber online praktisch nicht vorhanden.",
      company: "Ein etablierter Salon in Köln mit exzellentem Handwerk und zufriedener Stammkundschaft. Wer allerdings auf Google nach einem Naturfriseur im Viertel suchte, fand den Salon nicht.",
      services: ["Neue Website", "Google Maps Optimierung", "Online-Termin-Anbindung"],
      stats: [
        { value: "2x", label: "Mehr Neukunden" },
        { value: "Top 3", label: "Google-Platzierung im Viertel" },
        { value: "6", label: "Monate bis zum Durchbruch" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Der Friseursalon verließ sich jahrelang auf Mundpropaganda. Das funktioniert zwar, lässt aber das Wachstum stagnieren, sobald Kunden wegziehen oder Nachwuchs gesucht wird." },
        { kicker: "Ziel", text: "Neukunden aus Köln gewinnen, die gezielt nach ökologischer Haarpflege und Naturkosmetik suchen." },
        { kicker: "Was wir gemacht haben", text: "Wir haben eine moderne, ehrliche Website erstellt, die das Handwerk des Salons zeigt, und den Google-Eintrag komplett überarbeitet." },
        { kicker: "Ergebnis", text: "Der Salon erscheint bei allen relevanten Suchbegriffen ganz oben auf Google Maps. Die Zahl der Neukundenanfragen hat sich innerhalb von sechs Monaten verdoppelt." },
      ],
    },
    "verkehrsrecht-kanzlei": {
      heading: "Kanzlei für Verkehrsrecht",
      subheading: "Fachlich top, bei Google jedoch hinter der Konkurrenz.",
      company: "Eine spezialisierte Kanzlei, die Leuten nach Unfällen oder bei Bußgeldverfahren schnell hilft. Bisher kamen Mandanten fast nur über Empfehlungen.",
      services: ["Website-Überarbeitung", "Lokale SEO-Konzepte", "Google Profile Management"],
      stats: [
        { value: "3x", label: "Mehr Erstberatungen" },
        { value: "Platz 2", label: "Bei Suchbegriffen zur Region" },
        { value: "8", label: "Monate Zusammenarbeit" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Wer einen Autounfall hat, sucht sofort auf dem Handy nach rechtlicher Hilfe in der Nähe. Die Kanzlei tauchte bei diesen Notfall-Suchen erst auf Seite 3 bei Google auf – dort schaut niemand hin." },
        { kicker: "Ziel", text: "Direkt auf den ersten Plätzen stehen, wenn Betroffene in der Region nach juristischer Hilfe bei Unfällen suchen." },
        { kicker: "Was wir gemacht haben", text: "Wir haben die Seite für Mobilgeräte optimiert, die Ladezeiten verkürzt und die Leistungsseiten so aufgebaut, dass Ratsuchende direkt zum Anruf greifen." },
        { kicker: "Ergebnis", text: "Die Kanzlei belegt stabil Platz 2 in der regionalen Suche und verzeichnet dreimal mehr direkte Anrufe von Unfallgeschädigten." },
      ],
    },
    handwerksbetrieb: {
      heading: "Handwerksbetrieb",
      subheading: "Unabhängig von Mundpropaganda und freien Empfehlungen werden.",
      company: "Ein Meisterbetrieb für Sanitär und Heizung mit starker Arbeit vor Ort, der sich nie um das Thema Internet gekümmert hatte.",
      services: ["Einfache Landingpage", "Google Maps Profil", "Monatliche Pflege"],
      stats: [
        { value: "5", label: "Direkte Zusatzaufträge / Monat" },
        { value: "Platz 1", label: "Für Heizungsservice vor Ort" },
        { value: "9", label: "Monate Zusammenarbeit" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Aufträge kamen ausschließlich über Weiterempfehlungen. Wenn im Sommer weniger zu tun war, gab es kaum Möglichkeiten, gezielt neue Aufträge in der Nähe reinzuholen." },
        { kicker: "Ziel", text: "Eine simple, funktionierende Internetseite, die monatlich verlässlich ein paar gute Zusatzaufträge aus dem Nachbardorf bringt." },
        { kicker: "Was wir gemacht haben", text: "Eine schnörkellose Website gebaut, Bilder der echten Arbeiten eingefügt und den Betrieb lokal bei Google registriert." },
        { kicker: "Ergebnis", text: "Der Betrieb bekommt nun jeden Monat rund 5 qualifizierte Anfragen für Badsanierungen oder Heizungswechsel direkt über das Internet." },
      ],
    },
    "beauty-studio": {
      heading: "Beauty-Studio",
      subheading: "Eine Website war da – aber es kamen einfach keine Kunden darüber.",
      company: "Ein Kosmetikstudio mit schöner Einrichtung und gutem Service. Eine eigene Homepage gab es seit Jahren, aber Buchungen über das Internet blieben aus.",
      services: ["Google Maps Optimierung", "Lokales Ranking", "Laufende Pflege"],
      stats: [
        { value: "2x", label: "Mehr Online-Termine" },
        { value: "Platz 3", label: "Im direkten Umkreis" },
        { value: "5", label: "Monate Betreuung" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Das Studio zahlte monatlich Geld für Hosting und eine veraltete Website, ohne dass sich daraus Termine ergaben. Wer in der Stadt nach Kosmetik oder Fußpflege suchte, landete bei der Konkurrenz." },
        { kicker: "Ziel", text: "Den bestehenden Auftritt so einstellen, dass Frauen und Männer aus der Umgebung direkt online Termine buchen." },
        { kicker: "Was wir gemacht haben", text: "Wir haben den Google-Eintrag überarbeitet, aktuelle Fotos hinterlegt, Öffnungszeiten korrigiert und die Terminbuchung auf der Website vereinfacht." },
        { kicker: "Ergebnis", text: "Die Terminbuchungen über die Google-Suche haben sich verdoppelt. Das Studio belegt heute dauerhaft Platz 3 im Stadtgebiet." },
      ],
    },
    "autohaus-filialen": {
      heading: "Autohaus mit mehreren Standorten",
      subheading: "Verwirrung bei Kunden durch falsche Telefonnummern und doppelte Einträge.",
      company: "Ein regionales Autohaus mit 12 Standorten. Über die Jahre hatten sich veraltete Öffnungszeiten, falsche Telefonnummern und doppelte Google-Einträge eingeschlichen.",
      services: ["Eintragssynchronisation", "Google-Konto-Bereinigung", "Filialpflege"],
      stats: [
        { value: "12", label: "Saubere Standorte" },
        { value: "100%", label: "Korrekte Angaben" },
        { value: "+30%", label: "Mehr Anrufe in den Filialen" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Kunden riefen in geschlossenen Filialen an oder fuhren zu alten Adressen. Das sorgte für Frust bei den Kunden und Unruhe beim Verkaufspersonal." },
        { kicker: "Ziel", text: "Ein aufgeräumter, einheitlicher Auftritt für alle 12 Filialen, der zentral gesteuert werden kann." },
        { kicker: "Was wir gemacht haben", text: "Doppelte Einträge löschen lassen, Inhaberschaften zusammengeführt und alle Kontaktdaten auf den neuesten Stand gebracht." },
        { kicker: "Ergebnis", text: "Alle 12 Standorte laufen nun zentral gesteuert. Die Telefonanrufe in den Werkstätten und Verkaufsräumen sind um 30 % gestiegen, weil Nummern wieder stimmen." },
      ],
    },
    "physiotherapie-standorte": {
      heading: "Physiotherapie-Praxiskette",
      subheading: "Jede neue Praxis musste von Null aufgebaut werden.",
      company: "Eine wachsende Praxis für Physiotherapie, die regelmäßig neue Filialen eröffnet. Bisher dauerte es oft Monate, bis eine neue Praxis bei Google gefunden wurde.",
      services: ["Standardisiertes Eröffnungs-Setup", "Google-Profile", "Laufende Betreuung"],
      stats: [
        { value: "7", label: "Erfolgreich eingestellte Praxen" },
        { value: "10 Tage", label: "Bis zur vollen Auffindbarkeit" },
        { value: "100%", label: "Verlässlicher Ablauf" },
      ],
      sections: [
        { kicker: "Ausgangslage", text: "Bei einer Neueröffnung standen Räume und Therapeuten bereit, aber die Patienten blieben aus, weil die Praxis im Internet schlicht noch nicht existierte." },
        { kicker: "Ziel", text: "Ein klarer Ablauf, damit jede neue Praxis ab dem ersten Tag der Eröffnung voll bei Google gelistet ist." },
        { kicker: "Was wir gemacht haben", text: "Wir haben einen festen Leitfaden entwickelt: 14 Tage vor Eröffnung wird das Profil angelegt, verifiziert und mit allen Leistungen bespielt." },
        { kicker: "Ergebnis", text: "Mittlerweile wurden 7 Standorte nach diesem Prinzip eröffnet. Jeder neue Standort ist spätestens nach 10 Tagen lokal auffindbar und ab Woche 1 gut gebucht." },
      ],
    },
  } as const;

  const detailedCaseStudy = caseStudyContent[slug as keyof typeof caseStudyContent];

  if (detailedCaseStudy) {
    const services = detailedCaseStudy.services;
    const stats = detailedCaseStudy.stats;
    const sections = detailedCaseStudy.sections;

    return (
      <PageTemplate
        heroTitle={title}
        heroDescription="Erfahrungsbericht"
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
        contentTopPadding="0"
      >
        <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">{detailedCaseStudy.heading}</h2>
            <p className="process-copy">{detailedCaseStudy.subheading}</p>
          </div>
        </section>

        <section className="case-detail-overview dot-grid-section dot-grid-left">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="case-detail-grid">
            <ScrollReveal className="case-detail-panel" amount={0.25} x={-40} y={14}>
              <div className="process-kicker">Der Betrieb</div>
              <p className="case-detail-copy">{detailedCaseStudy.company}</p>
            </ScrollReveal>

            <ScrollReveal className="case-detail-panel" delay={0.08} amount={0.25} x={40} y={14}>
              <div className="process-kicker">Was gemacht wurde</div>
              <div className="case-service-list">
                {services.map((service) => (
                  <div key={service} className="case-service-item">
                    <span className="case-service-icon" aria-hidden="true">
                      <FiChevronRight />
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="about-divider" />

        <section className="case-detail-stats">
          <div className="case-detail-stat-grid" style={{ "--case-stat-columns": stats.length } as React.CSSProperties}>
            {stats.map((stat, index) => {
              const countUpConfig = parseStatValueForCountUp(stat.value);
              return (
                <ScrollReveal key={stat.label} className="about-stat-card" delay={index * 0.08} amount={0.25} x={index % 2 === 0 ? -40 : 40} y={14}>
                  <h3>
                    {countUpConfig ? (
                      <CountUpInView to={countUpConfig.to} prefix={countUpConfig.prefix} suffix={countUpConfig.suffix} duration={1000} />
                    ) : (
                      stat.value
                    )}
                  </h3>
                  <p>{stat.label}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <div className="about-divider" />

        <section className="case-detail-sections dot-grid-section dot-grid-right">
          <div className="dot-grid-layer" aria-hidden="true" />
          {sections.map((section, index) => (
            <ScrollReveal key={section.kicker} className="case-detail-section" delay={Math.min(index * 0.06, 0.24)} amount={0.4} scale={0.98} x={index % 2 === 0 ? -30 : 30} y={10}>
              <div className="process-kicker">{section.kicker}</div>
              <p className="case-detail-copy">{section.text}</p>
            </ScrollReveal>
          ))}
        </section>

        <section className="cta">
          <CtaBox />
        </section>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      heroTitle={title}
      heroDescription="Praxisbeispiel"
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left kicker-arrow-anchor">
          <div className="process-kicker">Praxisbeispiel</div>
          <h2 className="process-title">{title}</h2>
          <p className="process-copy">
            {pageData?.description ?? "Diese Case Study wird gerade aufbereitet."}
          </p>
        </div>
      </section>

      <section className="dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <ScrollReveal className="case-placeholder-card" amount={0.35} y={14} scale={0.98}>
          <h3>{pageData?.title ?? "In Vorbereitung"}</h3>
          <p>Wir bereiten hier gerade die Auswertung vor: Ausgangslage, Umsetzungen und die genauen Zahlen aus dem Betrieb.</p>
          <div className="case-placeholder-actions">
            <Link href="/company/cases" className="btn-begin">Zur Übersicht</Link>
            <Link href="/contact" className="btn-begin">
              <span>Erstgespräch vereinbaren</span>
              <span className="btn-begin-arrow" aria-hidden="true">
                <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
                </svg>
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </PageTemplate>
  );
}