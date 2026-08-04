import Link from "next/link";

export default function CtaBox() {
  return (
    <div className="cta-box">
      <h2>Bereit für den nächsten Schritt?</h2>
      <p>Lass uns gemeinsam herausfinden, wie wir Ihr Potential voll ausschöpfen können.</p>
      <Link href="/contact" className="btn-begin large">
        <span>Erstgespräch kostenfrei buchen</span>
        <span className="btn-begin-arrow" aria-hidden="true">
          <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.79222 3.46797L7.7093 3.49623L2.5 8.72243L3.27757 9.5L8.49532 4.28225L8.43124 8.1609L9.5 8.1609L9.5 2.5L3.79222 2.5001V3.46797Z" fill="currentColor"></path>
          </svg>
        </span>
      </Link>
    </div>
  );
}
