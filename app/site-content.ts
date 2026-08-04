export type SimpleLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type FooterItem = {
  label: string;
  href?: string;
};

export type NavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: SimpleLink[];
};

export const navItems: NavItem[] = [
  {
    label: "Lösungen",
    bgColor: "var(--bg-elevated)",
    textColor: "var(--text-main)",
    links: [
      { label: "Digitales Fundament", href: "/services/einstieg" },
      { label: "Laufende Betreuung", href: "/services/retainer" },
      { label: "Filiallösung", href: "/services/filiale" },
      { label: "Individuelle Strategie", href: "/services/individuell" },
    ]
  },
  {
    label: "Unternehmen",
    bgColor: "var(--bg-elevated)",
    textColor: "var(--text-main)",
    links: [
      { label: "Über uns", href: "/company/about" },
      { label: "Case Studies", href: "/company/cases" },
      { label: "Karriere", href: "/career" },
    ]
  },
  {
    label: "Verbinden",
    bgColor: "var(--bg-elevated)",
    textColor: "var(--text-main)",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/nearbase.de", ariaLabel: "LinkedIn Profil von Nearbase" },
      { label: "Instagram", href: "https://www.instagram.com/nearbase.de/", ariaLabel: "Instagram Profil von Nearbase" },
      { label: "Kontakt", href: "/contact" },
    ]
  }
];

export const footerColumns: { title: string; links: FooterItem[] }[] = [
  {
    title: "Lösungen",
    links: [
      { label: "Digitales Fundament", href: "/services/einstieg" },
      { label: "Laufende Betreuung", href: "/services/retainer" },
      { label: "Filiallösung", href: "/services/filiale" },
      { label: "Individuelle Strategie", href: "/services/individuell" }
    ]
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/company/about" },
      { label: "Case Studies", href: "/company/cases" },
      { label: "Karriere", href: "/career" },
      { label: "Kontakt", href: "/contact" },
    ]
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/legal/impressum" },
      { label: "Datenschutzerklärung", href: "/legal/datenschutz" },
      { label: "AGB", href: "/legal/agb" },
      { label: "Cookies", href: "/legal/cookies" }
    ]
  },
  {
    title: "Kontakt",
    links: [
      { label: "Erreichbar für Fragen und Anfragen." },
      { label: "Montag – Donnerstag: 09:00 – 17:00 Uhr" },
      { label: "Freitag: 09:00 – 14:00 Uhr" },
      { label: "Tel.: +49 5137 704 97 95", href: "tel:+4951377049795" },
      { label: "Mail: info@nearbase.de", href: "mailto:info@nearbase.de" }
    ]
  }
];

export const pageTemplates: Record<string, { title: string; description: string; content: string }> = {
  "company-about": {
    title: "Über uns",
    description: "Digitalagentur für lokale Unternehmen und Filialisten. Wir entwickeln die digitale Infrastruktur für nachhaltige regionale Sichtbarkeit.",
    content: "Wir helfen lokalen Unternehmen und Filialisten, online sichtbar zu werden und kontinuierlich neue Kunden zu gewinnen."
  },
  "company-cases": {
    title: "Case Studies",
    description: "Belegte Ergebnisse aus echten Projekten – von Einzelstandorten bis zu Filialisten mit hunderten Standorten.",
    content: "Ein Auszug aus Projekten, bei denen wir Sichtbarkeit, Anfragen und Wachstum messbar verbessert haben."
  },
  "legal-impressum": {
    title: "Impressum",
    description: "Rechtliche Angaben zu Nearbase.",
    content: "Hier werden die rechtlichen Pflichtangaben, Verantwortliche und Kontaktangaben für den offiziellen Bereich aufgeführt."
  },
  "legal-datenschutz": {
    title: "Datenschutz",
    description: "Wie wir mit Daten sicher und transparent umgehen.",
    content: "Wir behandeln Nutzerdaten gemäß geltender Datenschutzbestimmungen und setzen auf klare, nachvollziehbare Prozesse."
  },
  "legal-agb": {
    title: "Allgemeine Geschäftsbedingungen",
    description: "Allgemeine Geschäftsbedingungen unserer Zusammenarbeit.",
    content: "Unsere Allgemeinen Geschäftsbedingungen befinden sich derzeit in der Aktualisierung. Bei Fragen zu bestehenden oder künftigen Verträgen wenden Sie sich bitte direkt an unseren Support."
  },
  "legal-cookies": {
    title: "Cookies",
    description: "Cookie-Richtlinie und Informationen zu eingesetzten Cookies.",
    content: "Hier findest du unsere Cookie-Richtlinie inklusive Informationen zu Einwilligung, eingesetzten Diensten und deinen Rechten."
  }
};