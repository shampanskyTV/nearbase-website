import { FiClock, FiMapPin, FiArrowUpRight } from "react-icons/fi";
import PageTemplate from "../components/PageTemplate";

const JOIN_VERTRIEBSPARTNER = "https://join.com/companies/lamertpartnerscom/16543852";

export default function CareerOverviewPage() {
  const careerItems = [
    {
      link: JOIN_VERTRIEBSPARTNER,
      title: "Vertriebspartner (m/w/d)",
      type: "Provisionsbasis",
      location: "Ortsunabhängig",
    },
  ];

  return (
    <PageTemplate
      heroTitle="Karriere"
      heroDescription="Offene Positionen bei Nearbase."
      showHeroTitle={false}
      showHeroDescription={false}
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0"
    >
      <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="process-header section-header-left kicker-arrow-anchor">
          <div className="process-kicker">Karriere</div>
          <h2 className="process-title">Offene Positionen.</h2>
          <p className="process-copy">Offene Positionen bei Nearbase, für alle, die mit uns wachsen wollen.</p>
        </div>
      </section>

      <section className="dot-grid-section dot-grid-left">
        <div className="dot-grid-layer" aria-hidden="true" />
        <div className="faq-list">
          {careerItems.map((item) => {
            return (
              <a key={item.link} href={item.link} target="_blank" rel="noopener noreferrer" className="faq-item" style={{ display: "block", textDecoration: "none" }}>
                <div className="faq-question">
                  <span>{item.title}</span>
                  <FiArrowUpRight />
                </div>
                <p style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiClock size={14} /> {item.type}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiMapPin size={14} /> {item.location}
                  </span>
                </p>
              </a>
            );
          })}
        </div>
      </section>
    </PageTemplate>
  );
}