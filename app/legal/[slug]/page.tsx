import PageTemplate from "../../components/PageTemplate";
import { pageTemplates } from "../../site-content";
import type { ReactElement } from "react";

type PageParams = {
  slug: string;
};


const legalPages = Object.fromEntries(
  Object.entries(pageTemplates)
    .filter(([key]) => key.startsWith("legal-"))
    .map(([key, value]) => [key.replace("legal-", ""), value])
);

const formatFallbackTitle = (slug: string) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const isSectionTitle = (line: string) => /^\d+\.\s/.test(line);
const isSubTitle = (line: string) =>
  line.length > 0 &&
  line.length <= 95 &&
  line[0] === line[0].toUpperCase() &&
  /[A-Za-zÄÖÜäöüß0-9]/.test(line) &&
  !/\.\s*$/.test(line) &&
  !line.includes("  ");

const renderDatenschutzText = (text: string) => {
  const lines = text.split("\n");
  const content: ReactElement[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (!currentParagraph.length) return;
    content.push(
      <p
        key={`paragraph-${content.length}`}
        style={{ marginTop: "0.55rem", marginBottom: "0.55rem" }}
      >
        {currentParagraph.join(" ")}
      </p>
    );
    currentParagraph = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      return;
    }

    if (isSectionTitle(line)) {
      flushParagraph();
      content.push(
        <h2
          key={`h2-${index}`}
          style={{ marginTop: "2.4rem", marginBottom: "0.9rem", fontSize: "1.7rem" }}
        >
          {line}
        </h2>
      );
      return;
    }

    if (isSubTitle(line) || line.endsWith("?")) {
      flushParagraph();
      content.push(
        <h3 key={`h3-${index}`} style={{ marginTop: "1.7rem", marginBottom: "0.7rem" }}>
          {line}
        </h3>
      );
      return;
    }

    currentParagraph.push(line);
  });

  flushParagraph();
  return content;
};

const renderLegalText = (text: string) => {
  const lines = text.split("\n");
  const content: ReactElement[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];

  const flushParagraph = () => {
    if (!currentParagraph.length) return;
    content.push(
      <p
        key={`paragraph-${content.length}`}
        style={{ marginTop: "0.55rem", marginBottom: "0.55rem" }}
      >
        {currentParagraph.join(" ")}
      </p>
    );
    currentParagraph = [];
  };

  const flushList = () => {
    if (!currentList.length) return;
    content.push(
      <ul
        key={`list-${content.length}`}
        style={{ marginTop: "0.55rem", marginBottom: "0.9rem", paddingLeft: "1.3rem" }}
      >
        {currentList.map((item, index) => (
          <li key={`list-item-${index}`} style={{ marginBottom: "0.45rem" }}>
            {item}
          </li>
        ))}
      </ul>
    );
    currentList = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (isSectionTitle(line)) {
      flushParagraph();
      flushList();
      content.push(
        <h2
          key={`h2-${index}`}
          style={{ marginTop: "2.4rem", marginBottom: "0.9rem", fontSize: "1.7rem" }}
        >
          {line}
        </h2>
      );
      return;
    }

    if (line === "Immer aktiv") {
      flushParagraph();
      flushList();
      content.push(
        <p
          key={`note-${index}`}
          style={{ marginTop: "0.3rem", marginBottom: "0.8rem", fontWeight: 600 }}
        >
          {line}
        </p>
      );
      return;
    }

    if (isSubTitle(line) || line.endsWith("?")) {
      flushParagraph();
      flushList();
      content.push(
        <h3 key={`h3-${index}`} style={{ marginTop: "1.7rem", marginBottom: "0.7rem" }}>
          {line}
        </h3>
      );
      return;
    }

    if (line.startsWith("Consent to service ")) {
      flushParagraph();
      currentList.push(line);
      return;
    }

    if (
      /^[A-ZÄÖÜa-zäöüß].*$/.test(line) &&
      line.length <= 110 &&
      !/[.!?:]$/.test(line) &&
      !line.includes("„")
    ) {
      flushParagraph();
      currentList.push(line);
      return;
    }

    flushList();
    currentParagraph.push(line);
  });

  flushParagraph();
  flushList();
  return content;
};

type CookiePurpose = {
  name: string;
  retention: string;
  function: string;
  href?: string;
};

type CookieService = {
  title: string;
  categories: string;
  consentLabel: string;
  usage: string;
  usageLink?: string;
  sharing: string;
  sharingLink?: string;
  purposes: {
    label: string;
    items: CookiePurpose[];
  }[];
};

type ConsentCategory = {
  title: string;
  description: string;
  state: string;
};

const cookieIntroText = `1. Einführung
Unsere Website, https://nearbase.de (im folgenden: „Die Website“) verwendet Cookies und ähnliche Technologien (der Einfachheit halber werden all diese unter „Cookies“ zusammengefasst). Cookies werden außerdem von uns beauftragten Drittparteien platziert. In dem unten stehendem Dokument informieren wir dich über die Verwendung von Cookies auf unserer Website.

2. Was sind Cookies?
Ein Cookie ist eine einfache kleine Datei, die gemeinsam mit den Seiten einer Internetadresse versendet und vom Webbrowser auf dem PC oder einem anderen Gerät gespeichert werden kann. Die darin gespeicherten Informationen können während folgender Besuche zu unseren oder den Servern relevanter Drittanbieter gesendet werden.

3. Was sind Skripte?
Ein Script ist ein Stück Programmcode, das benutzt wird, um unserer Website Funktionalität und Interaktivität zu ermöglichen. Dieser Code wird auf unseren Servern oder auf deinem Gerät ausgeführt.

4. Was ist ein Web Beacon?
Ein Web-Beacon (auch Pixel-Tag genannt), ist ein kleines unsichtbares Textfragment oder Bild auf einer Website, das benutzt wird, um den Verkehr auf der Website zu überwachen. Um dies zu ermöglichen werden diverse Daten von dir mittels Web-Beacons gespeichert.

5. Cookies
5.1 Technische oder funktionelle Cookies
Einige Cookies stellen sicher, dass bestimmte Teile der Website ordnungsgemäß funktionieren und deine Benutzereinstellungen weiterhin in Erinnerung bleiben. Durch das Setzen funktionaler Cookies erleichtern wir dir den Besuch unserer Website. Auf diese Weise musst du beim Besuch unserer Website nicht wiederholt dieselben Informationen eingeben, so bleiben Artikel beispielsweise in deinem Warenkorb, bis du bezahlst. Wir können diese Cookies ohne deine Einwilligung platzieren.

5.2 Marketing- / Tracking-Cookies
Marketing- / Tracking-Cookies sind Cookies oder eine andere Form der lokalen Speicherung, die zur Erstellung von Benutzerprofilen verwendet werden, um Werbung anzuzeigen oder den Benutzer auf dieser Website oder über mehrere Websites hinweg für ähnliche Marketingzwecke zu verfolgen.

5.3 Soziale Medien
Unsere Website verwendet keine eingebetteten Social-Media-Plugins, die bereits beim Laden der Seite Cookies setzen. Verlinkungen auf externe Plattformen wie LinkedIn oder Instagram werden erst aktiv, wenn du diese Links anklickst und die jeweilige Plattform besuchst.`;

const cookieTailText = `8. Aktivierung/Deaktivierung und Löschen von Cookies
Du kannst deinen Internetbrowser verwenden um automatisch oder manuell Cookies zu löschen. Du kannst außerdem spezifizieren ob spezielle Cookies nicht platziert werden sollen. Eine andere Möglichkeit ist es deinen Internetbrowser derart einzurichten, dass du jedes Mal benachrichtigt wirst, wenn ein Cookie platziert wird. Für weitere Information über diese Möglichkeiten beachte die Anweisungen in der Hilfesektion deines Browsers.

Bitte nimm zur Kenntnis, dass unsere Website möglicherweise nicht richtig funktioniert, wenn alle Cookies deaktiviert sind. Wenn du die Cookies in deinem Browser löscht, werden diese neu platziert, wenn du unsere Website erneut besuchst.
`;

const cookieServices: CookieService[] = [
  {
    title: "Next.js",
    categories: "Funktional",
    consentLabel: "Consent to service nextjs",
    usage:
      "Wir verwenden Next.js für die technische Bereitstellung der Website. Beim regulären Seitenaufruf werden in der Regel keine persistenten First-Party-Cookies gesetzt.",
    sharing: "Diese Daten werden nicht an Dritte weitergegeben.",
    purposes: [
      {
        label: "Funktional (nur Preview-/Redaktionsmodus)",
        items: [
          {
            name: "__prerender_bypass",
            retention: "Sitzung",
            function: "Technische Vorschau-/Rendering-Funktion der Website im Preview-Modus",
          },
          {
            name: "__next_preview_data",
            retention: "Sitzung",
            function: "Speichert temporäre Vorschauinformationen für Redaktionsvorschauen",
          },
        ],
      },
    ],
  },
  {
    title: "Cookiebot",
    categories: "Funktional, Präferenzen",
    consentLabel: "Consent to service cookiebot",
    usage:
      "Wir verwenden Cookiebot zur Verwaltung und Dokumentation deiner Cookie-Einwilligungen (nur falls Cookiebot auf der Website aktiviert ist).",
    usageLink: "https://www.cookiebot.com/de/privacy-policy/",
    sharing: "Weitere Informationen findest du in der Datenschutzerklärung von Usercentrics/Cookiebot.",
    sharingLink: "https://www.cookiebot.com/de/privacy-policy/",
    purposes: [
      {
        label: "Funktional / Präferenzen",
        items: [
          {
            name: "CookieConsent",
            retention: "12 Monate",
            function: "Speichert den Einwilligungsstatus des Nutzers für die aktuelle Domain",
          },
          {
            name: "CookieConsentBulkTicket",
            retention: "12 Monate",
            function: "Ordnet und dokumentiert die Einwilligung zu einer Einwilligungs-ID",
          },
        ],
      },
    ],
  },
  {
    title: "YouTube",
    categories: "Marketing, Statistik",
    consentLabel: "Consent to service youtube",
    usage: "Wir verwenden YouTube für die Einbindung von Videoinhalten.",
    usageLink: "https://policies.google.com/privacy",
    sharing:
      "Daten können an Google LLC in den USA übermittelt werden. Weitere Informationen in der YouTube/Google-Datenschutzerklärung.",
    sharingLink: "https://policies.google.com/privacy",
    purposes: [
      {
        label: "Marketing / Statistik",
        items: [
          {
            name: "YSC",
            retention: "Sitzung",
            function: "Speichert eine eindeutige Sitzungs-ID für die Videoauswertung",
          },
          {
            name: "VISITOR_INFO1_LIVE",
            retention: "6 Monate",
            function: "Schätzt Bandbreite und nutzerbezogene Präferenzen für den Videoplayer",
          },
          {
            name: "VISITOR_PRIVACY_METADATA",
            retention: "6 Monate",
            function: "Speichert Datenschutz- und Einwilligungsbezogene Präferenzen für YouTube",
          },
          {
            name: "PREF",
            retention: "Bis zu 2 Jahre",
            function: "Speichert Benutzereinstellungen für YouTube/Google-Dienste",
          },
          {
            name: "CONSENT",
            retention: "Bis zu 2 Jahre",
            function: "Speichert den Einwilligungsstatus für Google-/YouTube-Dienste",
          },
        ],
      },
    ],
  },
];

const consentCategories: ConsentCategory[] = [
  {
    title: "Funktional",
    state: "Immer aktiv",
    description:
      "Die technische Speicherung oder der Zugang ist unbedingt erforderlich für den rechtmäßigen Zweck, die Nutzung eines bestimmten Dienstes zu ermöglichen, der vom Teilnehmer oder Nutzer ausdrücklich gewünscht wird, oder für den alleinigen Zweck, die Übertragung einer Nachricht über ein elektronisches Kommunikationsnetz durchzuführen.",
  },
  {
    title: "Präferenzen",
    state: "Optional",
    description:
      "Die technische Speicherung oder der Zugriff ist für den rechtmäßigen Zweck der Speicherung von Präferenzen erforderlich, die nicht vom Abonnenten oder Benutzer angefordert wurden.",
  },
  {
    title: "Statistiken",
    state: "Optional",
    description:
      "Die technische Speicherung oder der Zugriff, der ausschließlich zu statistischen Zwecken erfolgt. Die technische Speicherung oder der Zugriff, der ausschließlich zu anonymen statistischen Zwecken verwendet wird. Ohne eine Vorladung, die freiwillige Zustimmung deines Internetdienstanbieters oder zusätzliche Aufzeichnungen von Dritten können die zu diesem Zweck gespeicherten oder abgerufenen Informationen allein in der Regel nicht dazu verwendet werden, dich zu identifizieren.",
  },
  {
    title: "Marketing",
    state: "Optional",
    description:
      "Die technische Speicherung oder der Zugriff ist erforderlich, um Nutzerprofile zu erstellen, um Werbung zu versenden oder um den Nutzer auf einer Website oder über mehrere Websites hinweg zu ähnlichen Marketingzwecken zu verfolgen.",
  },
];

const datenschutzText = `1. Datenschutz auf einen Blick
Allgemeine Hinweise
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

Datenerfassung auf dieser Website
Wer ist verantwortlich für die Datenerfassung auf dieser Website?
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.

Wie erfassen wir Ihre Daten?
Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.

Wofür nutzen wir Ihre Daten?
Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.

Welche Rechte haben Sie bezüglich Ihrer Daten?
Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.

Analyse-Tools und Tools von Drittanbietern
Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.

Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.

2. Hosting
Wir hosten die Inhalte unserer Website bei folgendem Anbieter:

Externes Hosting
Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.

Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.

Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.

Wir setzen folgenden Hoster ein:

netcup GmbH
Emmy-Noether-Straße 10
D-76131 Karlsruhe

Auftragsverarbeitung
Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.

3. Allgemeine Hinweise und Pflichtinformationen
Datenschutz
Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.

Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

Hinweis zur verantwortlichen Stelle
Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

Fabian Lamert
Lamert Marketing
Widdergasse 3a
30823 Garbsen

Telefon: +49 (0) 5137 704 97 95
E-Mail: info@nearbase.de

Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.

Speicherdauer
Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.

Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website
Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.

Empfänger von personenbezogenen Daten
Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.

Widerruf Ihrer Einwilligung zur Datenverarbeitung
Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.

Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie widersprechen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerpruch nach Art. 21 Abs. 1 DSGVO).

Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerpruch nach Art. 21 Abs. 2 DSGVO).

Beschwerderecht bei der zuständigen Aufsichtsbehörde
Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.

Recht auf Datenübertragbarkeit
Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.

Auskunft, Berichtigung und Löschung
Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.

Recht auf Einschränkung der Verarbeitung
Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:

Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.

SSL- bzw. TLS-Verschlüsselung
Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.

Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.

Widerspruch gegen Werbe-E-Mails
Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.

4. Datenerfassung auf dieser Website
Cookies
Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.

Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).

Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.

Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.

Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.

Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.

Server-Log-Dateien
Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

Browsertyp und Browserversion
verwendetes Betriebssystem
Referrer URL
Hostname des zugreifenden Rechners
Uhrzeit der Serveranfrage
IP-Adresse

Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.

Kontaktformular
Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.

Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.

Anfrage per E-Mail, Telefon oder Telefax
Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.

Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.

5. Plugins und Tools
Google Maps
Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Mit Hilfe dieses Dienstes können wir Kartenmaterial auf unserer Website einbinden.

Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google zum Zwecke der einheitlichen Darstellung der Schriftarten Google Fonts verwenden. Beim Aufruf von Google Maps lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.

Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.

Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
Mehr Informationen zu diesen Verfahren und Links:
https://privacy.google.com/businesses/gdprcontrollerterms/
https://privacy.google.com/businesses/gdprcontrollerterms/sccs/

Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:
https://policies.google.com/privacy?hl=de

Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link:
https://www.dataprivacyframework.gov/participant/5780.

Quelle: https://www.e-recht24.de

Stand: März 2026`;

export default async function LegalSubPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const pageData = legalPages[slug];

  if (!pageData) {
    const fallbackTitle = formatFallbackTitle(slug);

    return (
      <PageTemplate
        heroTitle={`Legal: ${fallbackTitle}`}
        heroDescription="Dieser rechtliche Hinweisbereich ist noch in Planung."
      >
        <div style={{ paddingTop: "24px" }}>
          <p>
            Hier entsteht bald der passende Rechtstext. Bitte nutze derzeit die vorhandenen
            Legal-Seiten.
          </p>
        </div>
      </PageTemplate>
    );
  }

  if (slug === "impressum") {
    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription="Unsere offiziellen Impressumsangaben nach § 5 TMG."
        heroDescriptionStyle={{ marginBottom: "4px" }}
        contentTopPadding="0"
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
      >
        <div className="cookie-policy-page">
          <article className="cookie-policy-card">
            <h2 className="cookie-policy-heading">Impressum</h2>
            <div className="cookie-policy-document">
              <p className="cookie-policy-updated">
                <i>Rechtliche Pflichtangaben und Kontaktdaten gemäß den geltenden Vorschriften.</i>
              </p>
              <h2>Angaben gemäß § 5 TMG</h2>
              <p>Lamert Marketing</p>
              <p>Fabian Lamert</p>
              <p>Widdergasse 3a</p>
              <p>30823 Garbsen</p>

              <h2>Kontakt</h2>
              <p>Telefon: +49 (0) 5137 704 97 95</p>
              <p>E-Mail: info@nearbase.de</p>

              <h2>Webmaster</h2>
              <p>Tom Schönemann</p>
              <p>E-Mail: it@nearbase.de</p>

              <h2>Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE454394910</p>

              <h2>Verbraucherstreitbeilegung/Universal-Schlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
                einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </article>
        </div>
      </PageTemplate>
    );
  }

  if (slug === "datenschutz") {
    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription="Datenschutzerklärung"
        contentTopPadding="0"
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
      >
        <div className="cookie-policy-page">
          <article className="cookie-policy-card">
            <h2 className="cookie-policy-heading">Datenschutzerklärung</h2>
            <div className="cookie-policy-document">
              <p className="cookie-policy-updated">
                <i>Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.</i>
              </p>
              {renderDatenschutzText(datenschutzText)}
            </div>
          </article>
        </div>
      </PageTemplate>
    );
  }

  if (slug === "agb") {
    const formattedAgbText = pageData.content
      .replace(/^Allgemeine Geschäftsbedingungen\s*/i, "")
      .trim();

    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription={pageData.description}
        contentTopPadding="0"
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
      >
        <div className="cookie-policy-page">
          <article className="cookie-policy-card">
            <h2 className="cookie-policy-heading">Allgemeine Geschäftsbedingungen</h2>
            <div className="cookie-policy-document">
              <p className="cookie-policy-updated">
                <i>Allgemeine Geschäftsbedingungen für die Zusammenarbeit mit Nearbase.</i>
              </p>
              {renderLegalText(formattedAgbText)}
            </div>
          </article>
        </div>
      </PageTemplate>
    );
  }

  if (slug === "cookies") {
    return (
      <PageTemplate
        heroTitle={pageData.title}
        heroDescription={pageData.description}
        contentTopPadding="0"
        showHeroTitle={false}
        showHeroDescription={false}
        heroStyle={{ minHeight: "0", padding: "0" }}
      >
        <div className="cookie-policy-page">
          <article className="cookie-policy-card">
            <h2 className="cookie-policy-heading">Cookie-Richtlinie (EU)</h2>

            <div className="cookie-policy-document">
              <p className="cookie-policy-updated">
                <i>
                  Diese Cookie-Richtlinie wurde zuletzt am 27. März 2026 aktualisiert und
                  gilt für Bürger und Einwohner mit ständigem Wohnsitz im Europäischen
                  Wirtschaftsraum und der Schweiz.
                </i>
              </p>

              {renderLegalText(cookieIntroText)}

              <h2>6. Platzierte Cookies</h2>
              <div className="cookie-service-list">
                {cookieServices.map((service) => (
                  <details key={service.title} className="cookie-service">
                    <summary className="cookie-service-summary">
                      <div className="cookie-service-summary-copy">
                        <h3>{service.title}</h3>
                        <p>{service.categories}</p>
                        <span>{service.consentLabel}</span>
                      </div>
                    </summary>

                    <div className="cookie-service-body">
                      <div className="cookie-service-block">
                        <h4>Verwendung</h4>
                        <p>
                          {service.usage || "Der Einsatz dieses Dienstes wird derzeit geprüft."}
                          {service.usageLink ? (
                            <>
                              {" "}
                              <a
                                href={service.usageLink}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                              >
                                Weitere Informationen zu {service.title}
                              </a>
                            </>
                          ) : null}
                        </p>
                      </div>

                      <div className="cookie-service-block">
                        <h4>Weitergabe von Daten</h4>
                        <p>
                          {service.sharing}
                          {service.sharingLink ? (
                            <>
                              {" "}
                              <a
                                href={service.sharingLink}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                              >
                                Zur Datenschutzerklärung
                              </a>
                            </>
                          ) : null}
                        </p>
                      </div>

                      {service.purposes.map((purpose) => (
                        <div key={`${service.title}-${purpose.label}`} className="cookie-purpose">
                          <h4>{purpose.label}</h4>
                          <div className="cookie-purpose-table">
                            {purpose.items.map((item) => (
                              <div key={`${purpose.label}-${item.name}`} className="cookie-purpose-row">
                                <div>
                                  <span>Name</span>
                                  <p>
                                    {item.href ? (
                                      <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                      >
                                        {item.name}
                                      </a>
                                    ) : (
                                      item.name
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <span>Ablaufdatum</span>
                                  <p>{item.retention || "Nicht festgelegt"}</p>
                                </div>
                                <div>
                                  <span>Funktion</span>
                                  <p>{item.function || "Noch in Untersuchung"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>

              <h2>7. Einwilligung</h2>
              <p>
                Wenn du unsere Website das erste Mal besuchst, zeigen wir dir ein Pop-Up
                mit einer Erklärung über Cookies. Sobald du auf „Einstellungen speichern“
                klickst, gibst du uns deine Einwilligung alle von dir gewählten Kategorien
                von Cookies und Plugins wie in dieser Cookie-Erklärung beschrieben zu
                verwenden. Du kannst die Verwendung von Cookies über deinen Browser
                deaktivieren, aber bitte beachte, dass unsere Website dann unter Umständen
                nicht richtig funktioniert.
              </p>

              <p className="cookie-subtitle">7.1 Verwalte deine Einwilligungseinstellungen</p>
              <div className="cookie-consent-panel">
                {consentCategories.map((category) => (
                  <details key={category.title} className="cookie-consent-category">
                    <summary>
                      <span className="cookie-consent-title">{category.title}</span>
                      <span className="cookie-consent-state">{category.state}</span>
                    </summary>
                    <div className="cookie-consent-description">{category.description}</div>
                  </details>
                ))}
              </div>

              {renderLegalText(cookieTailText)}

              <h2>9. Deine Rechte in Bezug auf personenbezogene Daten</h2>
              <p>Du hast folgende Rechte in Bezug auf deine personenbezogenen Daten:</p>
              <ul className="cookie-rights-list">
                <li>
                  Du hast das Recht zu erfahren, warum deine personenbezogenen Daten
                  benötigt werden, was damit passiert und wie lange sie aufbewahrt werden.
                </li>
                <li>
                  Auskunftsrecht: Du hast das Recht deine uns bekannten persönliche Daten
                  einzusehen.
                </li>
                <li>
                  Recht auf Berichtigung: Du hast das Recht wann immer du wünscht, deine
                  personenbezogenen Daten zu ergänzen, zu korrigieren sowie gelöscht oder
                  blockiert zu bekommen.
                </li>
                <li>
                  Wenn du uns deine Einwilligung zur Verarbeitung deiner Daten erteilst,
                  hast du das Recht diese Einwilligung zu widerrufen und deine
                  personenbezogenen Daten löschen zu lassen.
                </li>
                <li>
                  Recht auf Datenübertragbarkeit: Du hast das Recht, alle deine
                  personenbezogenen Daten von dem für die Verarbeitung Verantwortlichen
                  anzufordern und sie vollständig an einen anderen für die Verarbeitung
                  Verantwortlichen zu übermitteln.
                </li>
                <li>
                  Widerspruchsrecht: Du kannst der Verarbeitung deiner Daten widersprechen.
                  Wir entsprechen dem, es sei denn es gibt berechtigte Gründe für die
                  Verarbeitung.
                </li>
              </ul>
              <p>
                Um diese Rechte auszuüben kontaktiere uns bitte. Bitte beziehe dich auf die
                Kontaktdaten am Ende dieser Cookie-Erklärung. Wenn du eine Beschwerde
                darüber hast, wie wir deine Daten behandeln, würden wir diese gerne hören,
                aber du hast auch das Recht diese an die Aufsichtsbehörde
                (Datenschutzbehörde) zu richten.
              </p>

              <h2>10. Kontaktdaten</h2>
              <p>
                Für Fragen und/oder Kommentare über unsere Cookie-Richtlinien und diese
                Aussage kontaktiere uns bitte mittels der folgenden Kontaktdaten:
              </p>
              <p>
                Lamert Marketing
                <br />
                Widdergasse 3a, 30823 Garbsen
                <br />
                Deutschland
                <br />
                Website: <a href="https://nearbase.de" target="_blank" rel="noopener noreferrer">https://nearbase.de</a>
                <br />
                E-Mail: <a href="mailto:info@nearbase.de">info@nearbase.de</a>
                <br />
                Telefonnummer: 051377049795
              </p>
              <p>
                Diese Cookie-Richtlinie wurde mit{" "}
                <a
                  href="https://cookiedatabase.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cookiedatabase.org
                </a>{" "}
                am 27. März 2026 synchronisiert.
              </p>
            </div>
          </article>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate heroTitle={pageData.title} heroDescription={pageData.description}>
      <p>{pageData.content}</p>
    </PageTemplate>
  );
}
