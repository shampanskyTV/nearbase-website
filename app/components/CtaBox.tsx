import Link from "next/link";

export default function CtaBox() {
  return (
    <Link href="/contact" className="cta-box" aria-label="Strategiegespräch kostenfrei buchen">
      <p className="cta-box-kicker">Lass uns schauen ob wir zusammenpassen.</p>
      <div className="cta-box-row">
        <h2>
          Termin vereinbaren
          <span className="cta-box-button" aria-hidden="true">
            <span className="cta-box-button-arrow">
              <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
              </svg>
            </span>
          </span>
        </h2>
      </div>
    </Link>
  );
}
