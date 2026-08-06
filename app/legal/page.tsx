import type { Metadata } from "next";
import Link from "next/link";
import { FiFileText, FiShield } from "react-icons/fi";
import PageTemplate from "../components/PageTemplate";

export const metadata: Metadata = {
  title: "Rechtliches",
  description: "Alle rechtlichen Hinweise, Pflichtangaben und Datenschutzbestimmungen von Nearbase auf einen Blick.",
};

export default function LegalPage() {
  const legalItems = [
    {
      href: "/legal/impressum",
      title: "Impressum",
      kicker: "Pflichtangaben",
      text: "Wer wir sind, wie du uns erreichst und alle gesetzlich vorgeschriebenen Kontaktdaten.",
      points: ["Anbieter", "Kontakt", "Vertretung"],
      icon: FiFileText,
    },
    {
      href: "/legal/datenschutz",
      title: "Datenschutz",
      kicker: "Deine Daten",
      text: "Wie wir deine Daten schützen, welche Speicherdauern gelten und welche Rechte du hast.",
      points: ["DSGVO", "Deine Rechte", "Sicherheit"],
      icon: FiShield,
    },
    {
      href: "/legal/agb",
      title: "AGB",
      kicker: "Zusammenarbeit",
      text: "Die fairen Spielregeln für unsere Dienstleistungen, Verträge und gemeinsame Projekte.",
      points: ["Leistungen", "Haftung", "Verträge"],
      icon: FiFileText,
    },
    {
      href: "/legal/cookies",
      title: "Cookies",
      kicker: "Technologie",
      text: "Welche technisch notwendigen Hilfsmittel wir nutzen und wie du deine Einstellungen anpasst.",
      points: ["Funktional", "Einstellungen", "Transparenz"],
      icon: FiShield,
    },
  ] as const;

  return (
    <PageTemplate
      heroTitle="Rechtliches"
      heroDescription="Hier findest du alle wichtigen Rechtstexte und Pflichtangaben auf einen Blick."
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="services services-overview-section landing-dots landing-dots-right">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-right" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <div className="process-kicker">Rechtliches</div>
            <h2 className="process-title">Rechtliche Hinweise klar und verständlich.</h2>
            <p className="process-copy">
              Transparenz ist uns wichtig. Hier findest du alle Dokumente zu Impressum, Datenschutz und unserer Zusammenarbeit.
            </p>
          </div>

          <div className="grid">
            {legalItems.map((item) => (
              <Link key={item.href} href={item.href} className="process-card service-card services-overview-card">
                <div className="service-icon" aria-hidden="true">
                  <item.icon />
                </div>
                <p className="services-overview-kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="service-points">
                  {item.points.map((point) => (
                    <span key={`${item.href}-${point}`}>{point}</span>
                  ))}
                </div>
                <span className="services-card-cta">Öffnen</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}