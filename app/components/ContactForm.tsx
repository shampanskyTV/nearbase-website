"use client";

import { useState, useMemo } from "react";

const BUSINESS_HOURS = { start: 9, end: 18 };
const SLOT_MINUTES = 30;

function getMinSelectableDateTime() {
  const min = new Date();
  min.setHours(min.getHours() + 12);
  return min;
}

function toDateInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function generateTimeSlots(selectedDate: string) {
  if (!selectedDate) return [];
  
  const dayDate = new Date(selectedDate + "T00:00:00");
  const dayOfWeek = dayDate.getDay();

  // Samstag (6) und Sonntag (0) ausschließen
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return [];
  }

  const slots: string[] = [];
  const minDateTime = getMinSelectableDateTime();

  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    for (let min = 0; min < 60; min += SLOT_MINUTES) {
      const slot = new Date(dayDate);
      slot.setHours(hour, min, 0, 0);
      if (slot >= minDateTime) {
        slots.push(`${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
      }
    }
  }
  return slots;
}

type Tab = "message" | "consultation" | "callback";

function DateTimeFields({
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  timeSlots,
}: {
  date: string;
  time: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
  minDate: string;
  timeSlots: string[];
}) {
  const isWeekend = date ? [0, 6].includes(new Date(date + "T00:00:00").getDay()) : false;

  return (
    <>
      <div className="contact-form-row">
        <div className="contact-field">
          <label className="contact-field-label" htmlFor="wish-date">Wunschdatum*</label>
          <input
            id="wish-date"
            className="lead-input"
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div className="contact-field">
          <label className="contact-field-label" htmlFor="wish-time">Uhrzeit*</label>
          <select
            id="wish-time"
            className="lead-input"
            required
            disabled={!date || isWeekend}
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
          >
            <option value="" disabled>
              {date ? (isWeekend ? "Wochenende nicht möglich" : "Uhrzeit wählen") : "Erst Datum wählen"}
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot} Uhr</option>
            ))}
          </select>
        </div>
      </div>
      {date && (isWeekend || timeSlots.length === 0) && (
        <p className="contact-hint">
          {isWeekend
            ? "An Wochenenden bieten wir keine regulären Termine an. Bitte wählen Sie einen Werktag (Mo-Fr)."
            : "An diesem Tag sind leider keine freien Slots mehr verfügbar."}
        </p>
      )}
    </>
  );
}

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<Tab>("message");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const [consultationDate, setConsultationDate] = useState("");
  const [consultationTime, setConsultationTime] = useState("");
  const [callbackDate, setCallbackDate] = useState("");
  const [callbackTime, setCallbackTime] = useState("");

  const minDate = useMemo(() => toDateInputValue(getMinSelectableDateTime()), []);
  const consultationSlots = useMemo(() => generateTimeSlots(consultationDate), [consultationDate]);
  const callbackSlots = useMemo(() => generateTimeSlots(callbackDate), [callbackDate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.type = activeTab;

    if (activeTab === "consultation") {
      payload.preferredDateTime = `${consultationDate} ${consultationTime}`;
    }
    if (activeTab === "callback") {
      payload.preferredDateTime = `${callbackDate} ${callbackTime}`;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      e.currentTarget.reset();
      setConsultationDate("");
      setConsultationTime("");
      setCallbackDate("");
      setCallbackTime("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-tabs" role="tablist" aria-label="Kontaktoptionen">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "message"}
          onClick={() => setActiveTab("message")}
          className={`contact-tab-btn ${activeTab === "message" ? "is-active" : ""}`}
        >
          Nachricht senden
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "consultation"}
          onClick={() => setActiveTab("consultation")}
          className={`contact-tab-btn ${activeTab === "consultation" ? "is-active" : ""}`}
        >
          Erstgespräch buchen
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "callback"}
          onClick={() => setActiveTab("callback")}
          className={`contact-tab-btn ${activeTab === "callback" ? "is-active" : ""}`}
        >
          Rückruf anfordern
        </button>
      </div>

      <form onSubmit={handleSubmit} className="contact-form-grid" key={activeTab}>
        <div className="contact-form-row">
          <input className="lead-input" name="name" placeholder="Name*" required aria-label="Ihr Name" />
          <input className="lead-input" name="phone" placeholder="Telefon*" required aria-label="Ihre Telefonnummer" />
        </div>

        {activeTab === "message" && (
          <>
            <div className="contact-form-row">
              <input className="lead-input" name="email" type="email" placeholder="E-Mail*" required aria-label="Ihre E-Mail-Adresse" />
              <input className="lead-input" name="website" placeholder="Website (optional)" aria-label="Ihre Website" />
            </div>
            <select className="lead-input" name="topic" required defaultValue="" aria-label="Betreff auswaehlen">
              <option value="" disabled>Worüber möchtest du sprechen?*</option>
              <option value="neukunde">Neues Projekt / Sichtbarkeit verbessern</option>
              <option value="bestandskunde">Ich bin bereits Kunde</option>
              <option value="sonstiges">Allgemeine Frage</option>
            </select>
            <textarea className="lead-input" name="message" placeholder="Deine Nachricht an uns..." rows={4} aria-label="Ihre Nachricht" />
          </>
        )}

        {activeTab === "consultation" && (
          <>
            <div className="contact-form-row">
              <input className="lead-input" name="email" type="email" placeholder="E-Mail*" required aria-label="Ihre E-Mail-Adresse" />
              <input className="lead-input" name="website" placeholder="Website*" required aria-label="Ihre Website" />
            </div>
            <select className="lead-input" name="service" required defaultValue="" aria-label="Leistung auswaehlen">
              <option value="" disabled>Interesse an welcher Leistung?*</option>
              <option value="einstieg">Einstieg & Relaunch</option>
              <option value="retainer">Laufende Betreuung & SEO</option>
              <option value="filiale">Filiallösung (Mehrere Standorte)</option>
              <option value="individuell">Individuelle Strategie</option>
            </select>
            <DateTimeFields
              date={consultationDate}
              time={consultationTime}
              onDateChange={(v) => { setConsultationDate(v); setConsultationTime(""); }}
              onTimeChange={setConsultationTime}
              minDate={minDate}
              timeSlots={consultationSlots}
            />
            <p className="contact-note">
              Im 15–20 minütigen Erstgespräch analysieren wir deine Ausgangslage und klären, ob und wie wir dich unterstützen können.
            </p>
          </>
        )}

        {activeTab === "callback" && (
          <>
            <div className="contact-form-row">
              <input className="lead-input" name="email" type="email" placeholder="E-Mail (optional)" aria-label="Ihre E-Mail-Adresse" />
              <input className="lead-input" name="website" placeholder="Website (optional)" aria-label="Ihre Website" />
            </div>
            <DateTimeFields
              date={callbackDate}
              time={callbackTime}
              onDateChange={(v) => { setCallbackDate(v); setCallbackTime(""); }}
              onTimeChange={setCallbackTime}
              minDate={minDate}
              timeSlots={callbackSlots}
            />
          </>
        )}

        <label className="contact-privacy-check">
          <input type="checkbox" required />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzbestimmung</a>{" "}
            gelesen und stimme ihr zu*
          </span>
        </label>

        <button type="submit" className="btn-begin contact-submit-btn" disabled={status === "sending"}>
          <span>{status === "sending" ? "Wird gesendet..." : "Anfrage absenden"}</span>
          <span className="btn-begin-arrow" aria-hidden="true">
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
            </svg>
          </span>
        </button>

        {status === "sent" && (
          <p className="contact-status contact-status-ok">
            Vielen Dank! Deine Nachricht wurde übermittelt. Wir melden uns umgehend bei dir.
          </p>
        )}
        {status === "error" && (
          <p className="contact-status contact-status-error">
            Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später noch einmal oder kontaktiere uns direkt per E-Mail.
          </p>
        )}
      </form>

      <style jsx>{`
        .contact-form-wrapper {
          width: 100%;
        }
        .contact-tabs {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--faq-item-border);
          flex-wrap: wrap;
        }
        .contact-tab-btn {
          background: none;
          border: none;
          padding: 12px 0;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .contact-tab-btn.is-active {
          color: var(--text-main);
          border-bottom-color: var(--brand-orange);
        }
        .contact-form-grid { display: grid; gap: 16px; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-field { display: grid; gap: 6px; }
        .contact-field-label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); }
        .contact-hint { margin: -4px 0 0; font-size: 0.82rem; color: #d34646; }
        .contact-note { margin: -4px 0 0; font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }
        .contact-privacy-check {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .contact-privacy-check input { margin-top: 3px; }
        .contact-privacy-check a {
          color: var(--brand-orange);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .contact-status { margin-top: 8px; font-size: 0.9rem; font-weight: 500; }
        .contact-status-ok { color: #2e7d32; }
        .contact-status-error { color: #d34646; }
        .contact-submit-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          justify-self: start;
          border: 1px solid rgba(10, 10, 10, 0.12) !important;
          background: #f5f5f5 !important;
          color: #0a0a0a !important;
          box-shadow: none !important;
          transition: color 0.28s ease;
        }
        .contact-submit-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--brand-orange);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 1.05s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .contact-submit-btn > :global(span) { position: relative; z-index: 1; }
        .contact-submit-btn:hover {
          transform: none !important;
          color: #f5f5f5 !important;
          transition-delay: 0.16s;
        }
        .contact-submit-btn:hover::before { transform: scaleX(1); }
        .contact-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 600px) {
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}