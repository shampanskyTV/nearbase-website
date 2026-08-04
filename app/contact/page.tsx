import type { Metadata } from "next";
import PageTemplate from "../components/PageTemplate";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt & Erstgespräch | Nearbase",
  description: "Lass uns über deine digitale Sichtbarkeit sprechen. Buche direkt ein unverbindliches Erstgespräch oder sende uns eine Nachricht.",
};

export default function ContactPage() {
  return (
    <PageTemplate
      heroTitle=""
      heroDescription=""
      heroStyle={{ minHeight: "0", padding: "0" }}
      contentTopPadding="0px"
      showHeroTitle={false}
      showHeroDescription={false}
    >
      <section className="contact-booking" aria-label="Kontakt">
        <div className="dot-grid-layer contact-dot-grid-left" aria-hidden="true" />
        <div className="dot-grid-layer contact-dot-grid-right" aria-hidden="true" />
        <div className="contact-booking-layout">
          <div className="contact-booking-side-card contact-info-card">
            <div className="process-grid contact-process-grid" aria-label="So einfach erreichst du uns">
              <article className="process-card contact-process-card">
                <h3>01. Anliegen wählen</h3>
                <span className="process-number">01</span>
                <p>Nutze das Formular für eine kurze Nachricht oder wähle direkt einen freien Termin im Kalender.</p>
              </article>
              <article className="process-card contact-process-card">
                <h3>02. Erstgespräch</h3>
                <span className="process-number">02</span>
                <p>Wir analysieren deine aktuelle Situation und besprechen Potenziale – unverbindlich und auf den Punkt.</p>
              </article>
              <article className="process-card contact-process-card">
                <h3>03. Klare Empfehlung</h3>
                <span className="process-number">03</span>
                <p>Du erhältst eine ehrliche Einschätzung, welche Maßnahmen für deine Region wirklich Sinn ergeben.</p>
              </article>
            </div>
          </div>

          <div className="contact-booking-main-card">
            <div className="process-kicker">Kontakt & Termin</div>
            <h1 className="contact-booking-title">Lass uns sprechen.</h1>
            <p className="process-copy contact-section-copy">
              Ob direkte Nachricht oder Buchung für ein kurzes Kennenlernen: Wähle einfach den Weg, der am besten für dich passt.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}