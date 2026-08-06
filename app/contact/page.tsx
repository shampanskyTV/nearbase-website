import type { Metadata } from "next";
import PageTemplate from "../components/PageTemplate";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie Nearbase für Fragen, ein Erstgespräch oder einen Rückruf.",
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
          <div className="contact-booking-main-card">
            <h1 className="contact-booking-title">Kontaktieren Sie uns.</h1>
            <p className="process-copy contact-section-copy">
              Nachricht, Erstgespräch oder Rückruf: Wählen Sie den Weg, der zu Ihnen passt.
            </p>
            <ContactForm />
          </div>
      </section>
    </PageTemplate>
  );
}