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
  const slots: string[] = [];
  const minDateTime = getMinSelectableDateTime();
  const dayDate = new Date(selectedDate + "T00:00:00");

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
  return (
    <>
      <div className="contact-form-row">
        <div className="contact-field">
          <label className="contact-field-label">Wunschdatum*</label>
          <input
            className="lead-input"
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div className="contact-field">
          <label className="contact-field-label">Uhrzeit*</label>
          <select
            className="lead-input"
            required
            disabled={!date}
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
          >
            <option value="" disabled>
              {date ? "Uhrzeit wählen" : "Erst Datum wählen"}
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot} Uhr</option>
            ))}
          </select>
        </div>
      </div>
      {date && timeSlots.length === 0 && (
        <p className="contact-hint">
          An diesem Tag ist kein Termin mehr möglich. Bitte wählen Sie einen späteren Tag.
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
  const form = e.currentTarget; // Referenz VOR dem await sichern
  setStatus("sending");
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
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
    form.reset(); // die gesicherte Referenz nutzen, nicht e.currentTarget
    setConsultationDate("");
    setConsultationTime("");
    setCallbackDate("");
    setCallbackTime("");
  } catch {
    setStatus("error");
  }
}

  return (
    <div>
      <div className="contact-tabs">
        <button type="button" onClick={() => setActiveTab("message")} className={`contact-tab-btn ${activeTab === "message" ? "is-active" : ""}`}>
          Nachricht senden
        </button>
        <button type="button" onClick={() => setActiveTab("consultation")} className={`contact-tab-btn ${activeTab === "consultation" ? "is-active" : ""}`}>
          Erstgespräch vereinbaren
        </button>
        <button type="button" onClick={() => setActiveTab("callback")} className={`contact-tab-btn ${activeTab === "callback" ? "is-active" : ""}`}>
          Rückruf anfordern
        </button>
      </div>

      <form onSubmit={handleSubmit} className="contact-form-grid" key={activeTab}>
        <div className="contact-form-row">
          <input className="lead-input" name="name" placeholder="Name*" required />
          <input className="lead-input" name="phone" placeholder="Telefon*" required />
        </div>

        {activeTab === "message" && (
          <>
            <div className="contact-form-row">
              <input className="lead-input" name="email" type="email" placeholder="E-Mail" />
              <input className="lead-input" name="website" placeholder="Website" />
            </div>
            <select className="lead-input" name="topic" required defaultValue="">
              <option value="" disabled>Wie können wir helfen?*</option>
              <option value="bestandskunde">Ich bin bereits Kunde</option>
              <option value="presse">Presse- oder Medienanfrage</option>
              <option value="sonstiges">Sonstiges</option>
            </select>
            <textarea className="lead-input" name="message" placeholder="Nachricht" rows={4} />
          </>
        )}

        {activeTab === "consultation" && (
          <>
            <select className="lead-input" name="service" required defaultValue="">
              <option value="" disabled>Welche Leistung interessiert Sie?*</option>
              <option value="einstieg">Einstieg</option>
              <option value="retainer">Laufende Betreuung</option>
              <option value="filiale">Für Filialisten</option>
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
            <input className="lead-input" name="website" placeholder="Website" />
          </>
        )}

        {activeTab === "callback" && (
          <>
            <DateTimeFields
              date={callbackDate}
              time={callbackTime}
              onDateChange={(v) => { setCallbackDate(v); setCallbackTime(""); }}
              onTimeChange={setCallbackTime}
              minDate={minDate}
              timeSlots={callbackSlots}
            />
            <input className="lead-input" name="website" placeholder="Website" />
          </>
        )}

        <label className="contact-privacy-check">
          <input type="checkbox" required />
          <span>
            Ich habe die{" "}
            <a href="/legal/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>{" "}
            gelesen und stimme ihr zu*
          </span>
        </label>

        <button type="submit" className="btn-begin contact-submit-btn" disabled={status === "sending"}>
          <span>{status === "sending" ? "Wird gesendet..." : "Absenden"}</span>
          <span className="btn-begin-arrow" aria-hidden="true">
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
            </svg>
          </span>
        </button>

        {status === "sent" && <p className="contact-status contact-status-ok">Vielen Dank, wir melden uns zeitnah bei Ihnen.</p>}
        {status === "error" && <p className="contact-status contact-status-error">Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.</p>}
      </form>

      <style jsx>{`
        .contact-tabs { display: flex; gap: 24px; margin-bottom: 20px; border-bottom: 1px solid var(--faq-item-border); flex-wrap: wrap; }
        .contact-tab-btn { background: none; border: none; padding: 12px 0; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent; transition: color 0.2s ease, border-color 0.2s ease; }
        .contact-tab-btn.is-active { color: var(--text-main); border-bottom-color: var(--brand-orange); }
        .contact-form-grid { display: grid; gap: 14px; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-field { display: grid; gap: 6px; }
        .contact-field-label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); }
        .contact-hint { margin: -4px 0 0; font-size: 0.82rem; color: var(--text-muted); }
        .contact-privacy-check { display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
        .contact-privacy-check input { margin-top: 3px; }
        .contact-privacy-check a { color: var(--brand-orange); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; }
        .contact-status { margin: 0; }
        .contact-status-ok { color: var(--text-muted); }
        .contact-status-error { color: #d34646; }
        .contact-submit-btn { position: relative; overflow: hidden; isolation: isolate; justify-self: start; border: 1px solid rgba(10, 10, 10, 0.12) !important; background: #f5f5f5 !important; color: #0a0a0a !important; box-shadow: none !important; transition: color 0.28s ease; }
        .contact-submit-btn::before { content: ""; position: absolute; inset: 0; background: var(--brand-orange); transform: scaleX(0); transform-origin: right; transition: transform 1.05s cubic-bezier(0.22, 1, 0.36, 1); z-index: 0; }
        .contact-submit-btn > :global(span) { position: relative; z-index: 1; }
        .contact-submit-btn:hover { transform: none !important; color: #f5f5f5 !important; transition-delay: 0.16s; }
        .contact-submit-btn:hover::before { transform: scaleX(1); }
        .contact-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 600px) { .contact-form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}