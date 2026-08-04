"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Stepper, { Step } from "./Stepper";

const INACTIVITY_MS = 45000;
const LEAD_POPUP_DISMISSED_KEY = "lead-popup-dismissed";
const DISABLE_LEAD_POPUP = true; // true um popup nicht anzuzeigen

const helpOptions = ["Google Ads", "Search Engine Optimization", "Tracker & Analytics"];
const goalOptions = [
  "Umsatzsteigerung",
  "Neukundengewinnung",
  "Profitabilität steigern",
  "Klickkosten senken",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadCapturePopup() {
  const timerRef = useRef<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(LEAD_POPUP_DISMISSED_KEY) === "1";
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [helpAnswer, setHelpAnswer] = useState("");
  const [goalAnswer, setGoalAnswer] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean | null>(null);

  const isEmailValid = useMemo(() => emailPattern.test(email.trim()), [email]);

  const canProceed = useMemo(() => {
    if (currentStep === 1) return Boolean(helpAnswer);
    if (currentStep === 2) return Boolean(goalAnswer);
    if (currentStep === 3) return isEmailValid;
    if (currentStep === 4) return privacyAccepted === true;
    return false;
  }, [currentStep, goalAnswer, helpAnswer, isEmailValid, privacyAccepted]);

  const closePopup = () => {
    window.localStorage.setItem(LEAD_POPUP_DISMISSED_KEY, "1");
    setIsOpen(false);
  };

  useEffect(() => {
    if (DISABLE_LEAD_POPUP) return;
    if (hasShown) return;

    const clearIdleTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };

    const resetIdleTimer = () => {
      clearIdleTimer();
      timerRef.current = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setIsOpen(true);
          setHasShown(true);
        }
      }, INACTIVITY_MS);
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        resetIdleTimer();
      } else {
        clearIdleTimer();
      }
    };

    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetIdleTimer, { passive: true }));
    document.addEventListener("visibilitychange", handleVisibility);

    resetIdleTimer();

    return () => {
      clearIdleTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [hasShown]);

  if (DISABLE_LEAD_POPUP || !isOpen) return null;

  return (
    <div
      className="lead-popup-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div className="lead-popup-modal" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title">
        <button
          type="button"
          className="lead-popup-close"
          onClick={closePopup}
          aria-label="Popup schließen"
        >
          ×
        </button>

        {!hasStarted ? (
          <div className="lead-popup-start">
            <h2 id="lead-popup-title">Kostenloser Marketing Plan direkt in dein Postfach</h2>
            <p className="lead-popup-start-copy">
              Beantworte zwei kurze Fragen und dann schicken wir dir deinen individuellen Marketing
              Plan basierend auf unserer Growth Strategy!
            </p>
            <button
              type="button"
              className="lead-popup-primary-btn lead-popup-start-btn"
              onClick={() => setHasStarted(true)}
            >
              Fragen beantworten
            </button>
            <div className="lead-popup-duration" aria-label="Dauerhinweis">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 7.5V12L15 13.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>dauert nur 5 min</span>
            </div>
          </div>
        ) : isSubmitted ? (
          <div className="lead-popup-success">
            <h2>Du bist jetzt startklar!</h2>
            <p>Vielen Dank. Wir senden dir den Marketing Plan an deine E-Mail-Adresse.</p>
            <button type="button" className="lead-popup-primary-btn" onClick={closePopup}>
              Fenster schließen
            </button>
          </div>
        ) : (
          <Stepper
            initialStep={1}
            onStepChange={(step) => setCurrentStep(step)}
            onFinalStepCompleted={() => setIsSubmitted(true)}
            backButtonText="Zurück"
            nextButtonText="Weiter"
            completeButtonText="Senden"
            disableStepIndicators={true}
            stepCircleContainerClassName="lead-stepper-card"
            stepContainerClassName="lead-stepper-indicators"
            contentClassName="lead-stepper-content"
            footerClassName="lead-stepper-footer"
            nextButtonProps={{ disabled: !canProceed }}
          >
            <Step>
              <h3 className="lead-step-title">Wobei brauchst du Hilfe?</h3>
              <div className="lead-option-grid">
                {helpOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`lead-option-btn ${helpAnswer === option ? "is-selected" : ""}`}
                    onClick={() => setHelpAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Step>

            <Step>
              <h3 className="lead-step-title">Was ist dein Ziel?</h3>
              <div className="lead-option-grid">
                {goalOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`lead-option-btn ${goalAnswer === option ? "is-selected" : ""}`}
                    onClick={() => setGoalAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Step>

            <Step>
              <h3 className="lead-step-title">Deine Kontaktdaten</h3>
              <div className="lead-input-wrap">
                <label className="lead-input-label" htmlFor="lead-firstname">
                  Vorname (optional)
                </label>
                <input
                  id="lead-firstname"
                  type="text"
                  className="lead-input"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Vorname"
                />
              </div>
              <div className="lead-input-wrap">
                <label className="lead-input-label" htmlFor="lead-email">
                  E-Mail
                </label>
                <input
                  id="lead-email"
                  type="email"
                  className="lead-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@beispiel.de"
                />
                {email.length > 0 && !isEmailValid && (
                  <p className="lead-input-error">Bitte gib eine gültige E-Mail-Adresse ein.</p>
                )}
              </div>
            </Step>

            <Step>
              <h3 className="lead-step-title">Datenschutz</h3>
              <p className="lead-privacy-copy">
                Mit einem Klick auf &quot;Ich akzeptiere&quot; bestätigst du, dass du den Marketing Plan per
                Email gesendet bekommen möchtest und willigst ein, dass hierfür deine E-Mail-Adresse
                und optional dein Vorname durch Lamert Partners verarbeitet werden.
                <br />
                <br />
                Du akzeptierst außerdem, dass wir dir auch in Zukunft unseren Performance Marketing
                Newsletter senden. Näheres zum Newsletterversand findest du in unserer{" "}
                <Link href="/legal/datenschutz">Datenschutzerklärung</Link>. Du kannst deine
                Einwilligung jederzeit widerrufen.
                <br />
                <br />
                Klicke &quot;Ich akzeptiere&quot; und dann auf &quot;Senden&quot;, um deinen Marketing Plan zu erhalten!
              </p>

              <div className="lead-privacy-actions">
                <button
                  type="button"
                  className={`lead-option-btn ${privacyAccepted === true ? "is-selected" : ""}`}
                  onClick={() => setPrivacyAccepted(true)}
                >
                  Ich akzeptiere
                </button>
                <button
                  type="button"
                  className={`lead-option-btn ${privacyAccepted === false ? "is-selected" : ""}`}
                  onClick={() => setPrivacyAccepted(false)}
                >
                  Ich akzeptiere nicht
                </button>
              </div>
            </Step>
          </Stepper>
        )}
      </div>
    </div>
  );
}
