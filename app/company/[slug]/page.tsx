import type { Metadata } from "next";
import Image from "next/image";
import { FiCheck, FiBarChart2, FiZap, FiTarget, FiUsers, FiGlobe, FiBookOpen } from "react-icons/fi";
import CountUpInView from "../../components/CountUpInView";
import CtaBox from "../../components/CtaBox";
import FlowingMenu from "../../components/FlowingMenu";
import Noise from "../../components/Noise";
import PageTemplate from "../../components/PageTemplate";
import ScrollReveal from "../../components/ScrollReveal";
import YouTubePlayer from "../../components/YouTubePlayer";
import { pageTemplates } from "../../site-content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TemplateData = {
  title: string;
  description: string;
  content?: string;
};

const companyPages: Record<string, TemplateData> = Object.fromEntries(
  Object.entries(pageTemplates)
    .filter(([key]) => key.startsWith("company-"))
    .map(([key, value]) => [key.replace("company-", ""), value as TemplateData])
);

const formatFallbackTitle = (slug: string) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = companyPages[slug];
  const title = pageData?.title ?? formatFallbackTitle(slug);
  const description = pageData?.description ?? "Nearbase – Sichtbarkeit für regionale Betriebe.";

  return {
    title,
    description,
  };
}

export default async function CompanySubPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = companyPages[slug];

  if (!pageData) {
    const fallbackTitle = formatFallbackTitle(slug);

    return (
      <PageTemplate
        heroTitle={`Company: ${fallbackTitle}`}
        heroDescription="Diese Unternehmensseite ist noch in Planung."
      >
        <div style={{ paddingTop: '24px' }}>
          <p>
            Diese Seite wird bald überarbeitet. Bitte wähle eine der verfügbaren Seiten.
          </p>
        </div>
      </PageTemplate>
    );
  }

  if (slug === "about") {
    const differentiators = [
      "Wir arbeiten ausschließlich mit lokalen Unternehmen und Filialisten, nicht mit jeder Branche gleichzeitig.",
      "Sie sprechen direkt mit den Personen, die Ihr Projekt tatsächlich umsetzen.",
      "Wenn eine Maßnahme aus unserer Sicht keinen Mehrwert bringt, sagen wir das offen.",
      "Die Zusammenarbeit endet mit Ihrer Kündigung, nicht mit einer festen Vertragsbindung.",
    ];

    const mindsetItems = [
      {
        icon: FiTarget,
        title: "Ergebnisse statt Berichte",
        text: "Wir messen unseren Erfolg an tatsächlichen Anfragen und Kundenkontakten, nicht an umfangreichen Reportings.",
      },
      {
        icon: FiUsers,
        title: "Gleicher Anspruch für jeden Kunden",
        text: "Ob Einzelstandort oder Filialnetz: Wir arbeiten mit derselben Sorgfalt und demselben Vorgehen.",
      },
      {
        icon: FiBookOpen,
        title: "Klare Kommunikation",
        text: "Wir sprechen offen über realistische Erwartungen und setzen ausschließlich Maßnahmen um, die einen nachweisbaren Nutzen haben.",
      },
      {
        icon: FiBarChart2,
        title: "Begrenzte Kundenzahl",
        text: "Wir betreuen bewusst eine überschaubare Anzahl an Projekten, um jedem Kunden die notwendige Aufmerksamkeit zu widmen.",
      },
      {
        icon: FiZap,
        title: "Umsetzung statt Konzeptpapier",
        text: "Eine Strategie entfaltet erst durch die Umsetzung ihren Wert. Wir setzen jede Empfehlung direkt in die Praxis um.",
      },
      {
        icon: FiGlobe,
        title: "Erfahrung im regionalen Markt",
        text: "Wir kennen die Besonderheiten der lokalen Suche im DACH-Raum aus langjähriger praktischer Erfahrung.",
      },
    ];

    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription={pageData.description}
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
        contentTopPadding="0"
      >
        <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right"> 
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Wir sind Nearbase.</h2>
            <p className="process-copy">
              Eine Digitalagentur für lokale Unternehmen und Filialisten im DACH-Raum. Wir sorgen dafür, dass unsere Kunden in ihrer Region online sichtbar sind und neue Kunden gewinnen.
            </p>
          </div>
        </section>

        <section className="about-story">
          <div className="about-story-grid">
            <div className="process-header section-header-left">
              <h3 className="about-section-title">Erfahrung aus der Praxis.</h3>
              <div className="about-story-copy">
                Bevor es Nearbase gab, haben wir das digitale Wachstum eines bundesweiten Filialisten mitgestaltet und über Jahre Erfahrung in Vertrieb, Webentwicklung und Suchmaschinenoptimierung aufgebaut.
                <br />
                Dieses Wissen setzen wir heute für lokale Unternehmen ein, mit demselben Anspruch, den wir aus großen Projekten kennen.
              </div>
            </div>
            <div className="about-story-media">
              <Image
                src="/nearbase-ueberuns.jpg"
                alt="Nearbase Team"
                width={2592}
                height={1728}
                className="about-story-image"
              />
            </div>
          </div>
        </section>

        <section className="about-why dot-grid-section dot-grid-left">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="about-why-grid">
            <div className="process-header section-header-left">
              <h3 className="about-section-title">Was uns unterscheidet.</h3>
            </div>
            <div className="about-checklist">
              {differentiators.map((item, index) => (
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

        <section className="about-values testimonials-invert">
          <div className="testimonials-invert-surface">
            <div className="testimonials-invert-inner">
              <div className="process-header section-header-left about-values-header">
                <h3 className="process-title">Wie wir arbeiten.</h3>
              </div>
              <div className="about-values-grid">
                {mindsetItems.map((item, index) => (
                  <ScrollReveal
                    key={item.title}
                    className="about-values-card"
                    delay={Math.min(index * 0.06, 0.24)}
                    amount={0.22}
                    y={10}
                  >
                    <span className="about-values-icon" aria-hidden="true">
                      <item.icon />
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="about-divider" />

        <section className="cta">
          <CtaBox />
        </section>
      </PageTemplate>
    );
  }

  if (slug === "cases") {
    const demoItems = [
      {
        link: "/cases/matratzen-concord",
        text: "Matratzen Concord",
        image: "PLATZHALTER_BILD_URL",
        description: "Über 560 Standorte in Deutschland, Österreich und der Schweiz. Wie wir die digitale Sichtbarkeit für jeden einzelnen Standort aufgebaut haben."
      },
      {
        link: "/cases/steuerkanzlei-berlin",
        text: "steuerkanzlei.berlin",
        image: "PLATZHALTER_BILD_URL",
        description: "Eine Neugründung ohne bestehende Mandanten. Heute gehen 10 bis 15 Anfragen pro Woche über die Website ein."
      },
      {
        link: "/cases/naturfriseur",
        text: "Naturfriseur in Köln",
        image: "PLATZHALTER_BILD_URL",
        description: "Ein etablierter Salon mit bislang geringer digitaler Sichtbarkeit. Ergebnis: doppelt so viele Neukundenanfragen."
      },
      {
        link: "/cases/verkehrsrecht-kanzlei",
        text: "Kanzlei für Verkehrsrecht",
        image: "PLATZHALTER_BILD_URL",
        description: "Von geringer Sichtbarkeit zu Platz 2 bei relevanten Suchbegriffen und dreimal so vielen Mandatsanfragen."
      },
      {
        link: "/cases/handwerksbetrieb",
        text: "Handwerksbetrieb",
        image: "PLATZHALTER_BILD_URL",
        description: "Ein zusätzlicher, verlässlicher Anfragekanal neben der klassischen Mundpropaganda."
      },
      {
        link: "/cases/beauty-studio",
        text: "Beauty-Studio",
        image: "PLATZHALTER_BILD_URL",
        description: "Eine bestehende Website ohne Sichtbarkeit in der lokalen Suche. Nach der Optimierung doppelt so viele Terminbuchungen."
      },
      {
        link: "/cases/autohaus-filialen",
        text: "Autohaus mit mehreren Standorten",
        image: "PLATZHALTER_BILD_URL",
        description: "Uneinheitliche Verzeichniseinträge über mehrere Filialen bereinigt und zu einem konsistenten Auftritt geführt."
      },
      {
        link: "/cases/physiotherapie-standorte",
        text: "Physiotherapie-Praxiskette",
        image: "PLATZHALTER_BILD_URL",
        description: "Ein standardisierter Prozess, der jeden neuen Standort innerhalb von 10 Tagen sichtbar macht."
      },
    ];

    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription={pageData.description}
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
        contentTopPadding="0"
      >
        <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Projekte mit messbarer Wirkung.</h2>
            <p className="process-copy">
              Ein Auszug aus Projekten, bei denen wir Sichtbarkeit, Anfragen und Wachstum messbar verbessert haben.
            </p>
          </div>
        </section>

        <section className="case-study-list case-study-list-fullbleed dot-grid-section dot-grid-left">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="case-flowing-menu-wrap case-flowing-menu-wrap-fullbleed">
            <FlowingMenu
              items={demoItems}
              speed={15}
              textColor="var(--flowing-menu-text)"
              bgColor="var(--flowing-menu-bg)"
              marqueeBgColor="var(--flowing-menu-marquee-bg)"
              marqueeTextColor="var(--flowing-menu-marquee-text)"
              borderColor="var(--flowing-menu-border)"
            />
          </div>
        </section>
      </PageTemplate>
    );
  }

  if (slug === "career") {
    const careerItems = [
      {
        link: "/career/vertriebspartner",
        text: "Vertriebspartner (m/w/d)",
        image: "PLATZHALTER_BILD_URL",
        description: "Selbstständige Tätigkeit auf Provisionsbasis, ortsunabhängig. Neukundengewinnung für unser Angebot."
      },
    ];

    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription={pageData.description}
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
        contentTopPadding="0"
      >
        <section className="about-hero-panel about-hero-panel-xl dot-grid-section dot-grid-right">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Offene Positionen.</h2>
            <p className="process-copy">
              Wir suchen Partner, die mit uns wachsen wollen.
            </p>
          </div>
        </section>

        <section className="case-study-list case-study-list-fullbleed dot-grid-section dot-grid-left">
          <div className="dot-grid-layer" aria-hidden="true" />
          <div className="case-flowing-menu-wrap case-flowing-menu-wrap-fullbleed">
            <FlowingMenu
              items={careerItems}
              speed={15}
              textColor="var(--flowing-menu-text)"
              bgColor="var(--flowing-menu-bg)"
              marqueeBgColor="var(--flowing-menu-marquee-bg)"
              marqueeTextColor="var(--flowing-menu-marquee-text)"
              borderColor="var(--flowing-menu-border)"
            />
          </div>
        </section>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate heroTitle={pageData.title} heroDescription={pageData.description}>
      <p>{pageData.content}</p>
    </PageTemplate>
  );
}