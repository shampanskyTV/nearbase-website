"use client";
import { BsGoogle } from "react-icons/bs";
import { FiSearch, FiBarChart2 } from "react-icons/fi";
import React, { useState } from "react";
import Image from "next/image";
import LogoLoop from "./components/LogoLoop";
import PageTemplate from "./components/PageTemplate";
import ScrollReveal from "./components/ScrollReveal";
import CountUpInView from "./components/CountUpInView";
import LeadCapturePopup from "./components/LeadCapturePopup";
import CtaBox from "./components/CtaBox";

const heroTitles = [
  "Digitalagentur für lokale Unternehmen."
];

const faqItems = [
  {
    question: "Für welche Unternehmen arbeiten Sie?",
    answer: "Für lokale Unternehmen, Dienstleister und Filialisten, die in ihrer Region wachsen und mehr Anfragen über das Internet gewinnen möchten."
  },
  {
    question: "Wie läuft eine Zusammenarbeit ab?",
    answer: "Wir analysieren im ersten Schritt Ihre aktuelle Situation. Darauf aufbauend entwickeln wir die passende Strategie und übernehmen die vollständige Umsetzung."
  },
  {
    question: "Was unterscheidet Sie von anderen Agenturen?",
    answer: "Bei uns gibt es kein Fachchinesisch, keine komplizierten Berichte und keine wechselnden Ansprechpartner. Sie arbeiten direkt mit den Spezialisten zusammen, die Ihr Projekt tatsächlich umsetzen."
  },
  {
    question: "Was kostet eine Zusammenarbeit?",
    answer: "Das hängt vom genauen Umfang Ihres Vorhabens ab. Nach einem kurzen Erstgespräch erhalten Sie von uns ein festes, transparentes Angebot."
  },
  {
    question: "Wie viel Zeit muss ich selbst investieren?",
    answer: "So wenig wie möglich. Nach dem Erstgespräch und der Abstimmung der Inhalte übernehmen wir die komplette operative Arbeit für Sie."
  },
  {
    question: "Muss ich mich langfristig binden?",
    answer: "Nein. Wir überzeugen lieber durch Ergebnisse als durch Knebelverträge. Die laufende Betreuung ist für Sie flexibel kündbar."
  }
];

const workflowSteps = [
  {
    number: "01",
    title: "Bestandsaufnahme",
    text: "Wir analysieren Ihren aktuellen digitalen Auftritt und klären im Erstgespräch Ihre genauen Ziele.",
  },
  {
    number: "02",
    title: "Umsetzung",
    text: "Wir bauen Ihre Website, richten Ihre Profil-Einträge sauber ein und schaffen das Fundament für Ihre lokale Sichtbarkeit.",
  },
  {
    number: "03",
    title: "Laufende Betreuung",
    text: "Nach dem Start halten wir Ihre Systeme auf dem neuesten Stand, optimieren die Ergebnisse und sind bei Fragen direkt erreichbar.",
  },
];

const testimonialItems = [
  {
    quote: "„Mehr Sichtbarkeit für alle Standorte.“",
    text: "Als großes, etabliertes Unternehmen mit vielen Filialen hat uns oft die lokale Sichtbarkeit gefehlt. Nearbase betreut unsere Standorte jetzt komplett eigenständig. Wir haben an jedem Ort spürbar mehr Impressionen aus der Region.",
    name: "Head of Marketing",
    role: "Einzelhandel & Filialnetz",
  },
  {
    quote: "„Zeigen jetzt endlich, wer wir wirklich sind.“",
    text: "Uns gibt es schon ewig als Familienbetrieb, aber unsere alte Website hat einfach nicht mehr gepasst. Wir wollten regional Marktführer werden und für neue Mitarbeiter professionell rüberkommen. Jetzt wirken wir genau so groß und modern, wie wir als Team gewachsen sind.",
    name: "Geschäftsführer",
    role: "Sanitär- & Heizungbau",
  },
  {
    quote: "„Mussten die Betreuung pausieren, weil wir nicht hinterherkamen.“",
    text: "Wir haben als neue Kanzlei gestartet. Mittlerweile kommen plötzlich Woche für Woche 10 bis 15 Mandantenanfragen rein. Wir mussten den Hahn sogar kurz zudrehen, um die Arbeit überhaupt wegzuschaffen.",
    name: "Partner",
    role: "Steuerberatung & Kanzlei",
  },
  {
    quote: "„Nicht mehr nur vom Wochenende abhängig.“",
    text: "Wir sitzen mitten in einer Urlaubsregion und haben uns viel zu lange nur auf Mundpropaganda verlassen. Inzwischen finden uns die Gäste direkt online. Dadurch kriegen wir den Laden jetzt auch unter der Woche voll und zittern nicht mehr dem Wochenende entgegen.",
    name: "Inhaber",
    role: "Day Spa & Wellness",
  },
];

const referenceItems = [
  {
    src: "/marquee/concord.svg",
    alt: "Matratzen Concord",
    href: "/cases/matratzen-concord",
  },
  {
    src: "/marquee/steuerkanzlei.svg",
    alt: "steuerkanzlei.berlin",
    href: "https://steuerkanzlei.berlin",
  },
  {
    src: "/marquee/biofriseur.svg",
    alt: "Naturfriseur Polke",
    href: "/company/cases",
  },
  {
    src: "/marquee/fahrschule.svg",
    alt: "Fahrschule Führerscheinfabrik",
    href: "/company/cases",
  },
  {
    src: "/marquee/more.svg",
    alt: "Und viele mehr ...",
    href: "/company/cases",
  },
];

const referenceLogos = referenceItems.map((item) => ({
  src: item.src,
  alt: item.alt,
  href: item.href || undefined,
  width: 120,
  height: 40,
}));

const coreServices = [
  {
    icon: BsGoogle,
    title: "Digitale Präsenz",
    text: "Eine profesionelle Website und ein optimiertes Google-Unternehmensprofil bilden das Fundament Ihres digitalen Auftritts.",
    points: ["Website", "Google Business Profile", "Brancheneinträge"],
  },
  {
    icon: FiSearch,
    title: "Sichtbarkeit",
    text: "Wir positionieren Ihr Unternehmen in den regionalen Suchergebnissen ganz oben, wo Ihre Kunden täglich nach Ihnen suchen.",
    points: ["SEO", "Google Maps Optimierung", "GEO (KI-Suche)"],
  },
  {
    icon: FiBarChart2,
    title: "Kontinuierliche Betreuung",
    text: "Wir kümmern uns um laufende Pflege, Sicherheit und Aktualisierungen, damit Ihr digitaler Auftritt dauerhaft Ergebnisse liefert",
    points: ["Reporting", "Regelmäßige Updates", "Fester Ansprechpartner"],
  },
];

const competenceStats = [
  { label: "Jahre Erfahrung im Team", countTo: 10, prefix: "", suffix: "+"},
  { label: "Betreute Projekte", countTo: 50, prefix: "", suffix: "+" },
  { label: "Kundenzufriedenheit", countTo: 95, prefix: "", suffix: "%+" },
  { label: "Regionale Marktpräsenz", countTo: 100, prefix: "", suffix: "%" },
];

export default function Home() {
  const [heroTitle, setHeroTitle] = useState(heroTitles[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <PageTemplate
      heroTitle={heroTitle}
      heroDescription="Wir sorgen dafür, dass lokale Unternehmen und Filialisten in ihrer Region digital führend werden und kontinuierlich neue Kunden gewinnen."
heroCta={
  <a href="/contact" className="btn-begin-2 hero-cta-btn-dark" style={{ marginTop: '24px' }}>
    <span>Erstgespräch vereinbaren</span>
    <span className="btn-begin-arrow" aria-hidden="true">
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
      </svg>
    </span>
  </a>
}
      showHeroParticles={true}
      heroStyle={
        {
          "--hero-tag-size": "0.66rem",
          "--hero-title-size": "clamp(2.4rem, 4.8vw, 3.6rem)",
          "--hero-subtitle-size": "clamp(0.88rem, 1.6vw, 1.04rem)",
          "--hero-particles-padding-top": "clamp(124px, calc(20vh - 8px), 236px)",
        } as React.CSSProperties
      }
      contentTopPadding="0"
heroBottomContent={
  <section className="hero-logo-loop-section">
    <div className="container">
      <div className="hero-logo-loop-header">
        <h3>Unternehmen, die uns vertrauen</h3>
      </div>
      <div className="hero-logo-loop-track" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "28px" }}>
        {referenceItems.slice(0, 5).map((item, index) => (
          item.href ? (
            <a
              key={index}
              href={item.href}
              className="hero-logo-loop-item"
              aria-label={item.alt ? `Partner Logo ${item.alt}` : "Partner Logo"}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Image 
                src={item.src} 
                alt={item.alt ?? ""} 
                width={100} 
                height={20} 
                style={{ height: "18px", width: "auto" }}
                className="object-contain block" 
                loading="lazy" 
              />
            </a>
          ) : (
            <span key={index} className="hero-logo-loop-item" >
              <Image 
                src={item.src} 
                alt={item.alt ?? ""} 
                width={100} 
                height={20} 
                style={{ height: "18px", width: "auto" }}
                className="object-contain block" 
                loading="lazy" 
              />
            </span>
          )
        ))}
      </div>
    </div>
  </section>
}
    >
      <section className="services landing-dots landing-dots-right">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-right" aria-hidden="true" />
          <div className="process-header section-header-left kicker-arrow-anchor">
            <h2 className="process-title">Unsere Leistungen.</h2>
            <p className="process-copy">
              Wir entwickeln und betreuen die digitale Infrastruktur, die lokale Unternehmen für planbare Sichtbarkeit und regionale Marktführerschaft brauchen.
            </p>
          </div>
          <div className="grid">
            {coreServices.map((service, index) => (
              <ScrollReveal
                key={service.title}
                className="process-card service-card"
                delay={index * 0.08}
                amount={0.25}
                x={index % 2 === 0 ? -48 : 48}
                y={16}
              >
                <div className="service-icon">
                  <service.icon aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="service-points">
                  {service.points.map((point) => (
                    <span key={`${service.title}-${point}`}>{point}</span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="competence-stats-wrap" aria-label="Leistungskennzahlen">
            <div className="about-stat-grid">
              {competenceStats.map((stat, index) => (
                <ScrollReveal
                  key={stat.label}
                  className="about-stat-card"
                  delay={index * 0.08}
                  amount={0.25}
                  x={index % 2 === 0 ? -40 : 40}
                  y={14}
                >
                  <h3>
                    {typeof stat.countTo === "number" ? (
                      <CountUpInView
                        to={stat.countTo}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={1000}
                      />
                    ) : (
                      stat.countTo
                    )}
                  </h3>
                  <p>{stat.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services process-section landing-dots landing-dots-left">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-left" aria-hidden="true" />
          <div className="process-header">
            <h2 className="process-title">Wie eine Zusammenarbeit aussieht.</h2>
            <p className="process-copy">
              Wir analysieren Ihre aktuelle Ausgangslage und setzen die nötigen Schritte strukturiert für Sie um.
            </p>
          </div>

          <div className="process-grid">
            {workflowSteps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                className="process-card"
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
        </div>
      </section>
      <section className="services process-section landing-dots landing-dots-left testimonials-invert">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-left" aria-hidden="true" />
          <div className="testimonials-invert-surface">
            <div className="testimonials-invert-inner">
              <div className="process-header section-header-left">
                <h2 className="process-title">Was unsere Kunden sagen.</h2>
                <p className="process-copy">
                  Ein Auszug aus Feedback von Unternehmen die wir betreuen.
                </p>
              </div>
              <div className="testimonials-grid" aria-label="Kundenstimmen">
                {testimonialItems.map((item, index) => (
                  <ScrollReveal
                    key={item.name}
                    className="testimonial-card"
                    delay={Math.min(index * 0.06, 0.2)}
                    amount={0.22}
                    x={index % 2 === 0 ? -24 : 24}
                    y={10}
                  >
                    <p className="testimonial-quote">{item.quote}</p>
                    <p className="testimonial-copy">{item.text}</p>
                    <div className="testimonial-author">
                      <div>
                        <h4 className="testimonial-name">{item.name}</h4>
                        <p className="testimonial-role">{item.role}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta landing-dots landing-dots-right">
        <div className="container">
          <div className="landing-dot-cluster landing-dot-cluster-right" aria-hidden="true" />
          <div className="process-header section-header-left">
            <h2 className="process-title">Häufige Fragen.</h2>
            <p className="process-copy">
              Die wichtigsten Antworten für Unternehmen vor dem Start einer Zusammenarbeit.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <ScrollReveal
                key={item.question}
                className={`faq-item ${openFaqIndex === index ? "open" : ""}`}
                delay={Math.min(index * 0.04, 0.2)}
                duration={0.22}
                amount={0.5}
                scale={0.97}
                x={index % 2 === 0 ? -26 : 26}
                y={8}
                role="button"
                tabIndex={0}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setOpenFaqIndex(openFaqIndex === index ? null : index);
                  }
                }}
              >
                <div className="faq-question" aria-expanded={openFaqIndex === index}>
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <CtaBox />
        </div>
      </section>
      <LeadCapturePopup />
    </PageTemplate>
  );
}
