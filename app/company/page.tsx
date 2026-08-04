import type { Metadata } from "next";
import Link from "next/link";
import { FiBriefcase, FiUsers, FiBriefcase as FiCareer } from "react-icons/fi";
import PageTemplate from "../components/PageTemplate";
import CtaBox from "../components/CtaBox";

export const metadata: Metadata = {
  title: "Über Nearbase",
  description: "Wer wir sind, wie wir arbeiten und was wir für regionale Betriebe erreichen.",
};

export default function CompanyPage() {
  const companyAreas = [
    {
      href: "/company/about",
      title: "Über uns",
      text: "Wer hinter Nearbase steckt, wie wir ticken und warum wir Verträge ohne Knebelklauseln machen.",
      points: ["Das Team", "Unsere Prinzipien", "Echte Praxis"],
      icon: FiUsers,
    },
    {
      href: "/company/cases",
      title: "Case Studies",
      text: "Praxisbeispiele aus echten Betrieben: Wo sie standen, was wir gemacht haben und was es gebracht hat.",
      points: ["Handwerk & Praxen", "Filialisten", "Kanzleien"],
      icon: FiBriefcase,
    },
    {
      href: "/career",
      title: "Karriere",
      text: "Wir suchen Menschen, die anpacken wollen und mit uns gemeinsam wachsen möchten.",
      points: ["Vertrieb", "Freie Mitarbeit", "Remote"],
      icon: FiCareer,
    },
  ] as const;

  const companyStats = [
    { value: "560+", label: "Standorte betreut (z. B. Matratzen Concord)" },
    { value: "DACH", label: "Fokus auf regionale Betriebe" },
    { value: "0 Tage", label: "Kündigungsfrist – Qualität statt Bindung" },
  ] as const;

  return (
    <PageTemplate
      heroTitle="Company"
      heroDescription="Wer wir sind, wie wir arbeiten und was wir für regionale Betriebe erreichen."
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="services services-overview-section landing-dots landing-dots-right">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-right" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Gute Arbeit statt leerer Versprechen.</h2>
            <p className="process-copy">
              Wir sorgen dafür, dass regionale Unternehmen online genau dort auftauchen, wo ihre Kunden suchen.
            </p>
          </div>

          <div className="grid">
            {companyAreas.map((area) => (
              <Link key={area.href} href={area.href} className="process-card service-card services-overview-card">
                <div className="service-icon" aria-hidden="true">
                  <area.icon />
                </div>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
                <div className="service-points">
                  {area.points.map((point) => (
                    <span key={`${area.href}-${point}`}>{point}</span>
                  ))}
                </div>
                <span className="services-card-cta">Mehr erfahren</span>
              </Link>
            ))}
          </div>

          <div className="competence-stats-wrap" aria-label="Company Kennzahlen">
            <div className="about-stat-grid">
              {companyStats.map((stat) => (
                <article key={stat.label} className="about-stat-card">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
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