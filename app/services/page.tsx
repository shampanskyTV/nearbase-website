import type { Metadata } from "next";
import Link from "next/link";
import { FiGlobe, FiMapPin, FiRefreshCw, FiSliders } from "react-icons/fi";
import PageTemplate from "../components/PageTemplate";
import CtaBox from "../components/CtaBox";

export const metadata: Metadata = {
  title: "Leistungen & Angebote",
  description: "Erfahre, wie wir regionale Unternehmen und Filialisten mit klaren Strategien, modernen Websites und gezielter Sichtbarkeit nach vorne bringen.",
};

export default function ServicesPage() {
  const serviceAreas = [
    {
      slug: "einstieg",
      title: "Digitales Fundament",
      text: "Moderne Website, gepflegtes Google-Profil und starke lokale Auffindbarkeit. Alles aus einer Hand für deinen perfekten digitalen Start.",
      points: ["High-Speed Website", "Google Business", "Local SEO Setup"],
      icon: FiGlobe,
    },
    {
      slug: "retainer",
      title: "Laufende Betreuung",
      text: "Kontinuierliche Wartung, Optimierung und Reichweitenaufbau. Wir sorgen dafür, dass deine digitale Präsenz dauerhaft Kunden anzieht.",
      points: ["Wartung & SEO", "Inhalts-Updates", "Klare Reportings"],
      icon: FiRefreshCw,
    },
    {
      slug: "filiale",
      title: "Filiallösung",
      text: "Zentrale Steuerung aller Standorte bei maximaler lokaler Relevanz. Einheitliche Marke, regionale Sichtbarkeit vor Ort.",
      points: ["Multi-Locations", "Zentrale Pflege", "Markenkonsistenz"],
      icon: FiMapPin,
    },
    {
      slug: "individuell",
      title: "Individuelle Strategie",
      text: "Für komplexe Anforderungen, individuelle Schnittstellen oder spezielle Wachstumsziele abseits von Standard-Lösungen.",
      points: ["Bedarfsanalyse", "Speziallösungen", "Direkte Sparringspartner"],
      icon: FiSliders,
    },
  ] as const;

  const workflowSteps = [
    {
      number: "01",
      title: "Analyse & Bestandsaufnahme",
      text: "Wir durchleuchten deine aktuelle digitale Präsenz, decken Potenziale auf und definieren die schnellsten Hebel.",
    },
    {
      number: "02",
      title: "Gezielte Umsetzung",
      text: "Wir setzen die Maßnahmen zügig und strukturiert um – ohne unnötige Schleifen oder bürokratischen Wasserkopf.",
    },
    {
      number: "03",
      title: "Skalierung & Betreuung",
      text: "Wir messen die Ergebnisse, passen die Strategie laufend an und sichern deinen Vorsprung am Markt ab.",
    },
  ] as const;

  const serviceStats = [
    { value: "4", label: "KLARE SCHWERPUNKTE" },
    { value: "100%", label: "TRANSPARENZ & PLANBARKEIT" },
    { value: "Fokus", label: "REGIONALE SICHTBARKEIT" },
    { value: "DACH", label: "EINSATZREGION" },
  ] as const;

  return (
    <PageTemplate
      heroTitle="Leistungen"
      heroDescription="So unterstützen wir regionale Unternehmen und Filialisten bei der digitalen Kundengewinnung."
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="services services-overview-section landing-dots landing-dots-right">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-right" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Wie wir zusammenarbeiten.</h2>
            <p className="process-copy">
              Wähle den Bereich, der genau zu deinen aktuellen Anforderungen und Unternehmenszielen passt.
            </p>
          </div>

          <div className="grid">
            {serviceAreas.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="process-card service-card services-overview-card"
              >
                <div className="service-icon" aria-hidden="true">
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="service-points">
                  {service.points.map((point) => (
                    <span key={`${service.slug}-${point}`}>{point}</span>
                  ))}
                </div>
                <span className="services-card-cta">Mehr erfahren</span>
              </Link>
            ))}
          </div>

          <div className="competence-stats-wrap" aria-label="Leistungs-Kennzahlen">
            <div className="about-stat-grid">
              {serviceStats.map((stat) => (
                <article key={stat.label} className="about-stat-card">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services process-section landing-dots landing-dots-left">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-left" aria-hidden="true" />
          <div className="process-header section-header-left">
            <h2 className="process-title">In drei Schritten zu mehr Sichtbarkeit.</h2>
            <p className="process-copy">
              Ein strukturierter Prozess ohne Umwege: Wir konzentrieren uns auf Maßnahmen, die messbare Ergebnisse bringen.
            </p>
          </div>

          <div className="process-grid">
            {workflowSteps.map((step) => (
              <article key={step.number} className="process-card">
                <h3>{step.title}</h3>
                <div className="process-number">{step.number}</div>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <CtaBox />
        </div>
      </section>
    </PageTemplate>
  );
}