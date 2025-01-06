import { createI18n } from 'vue-i18n';

// Definiere die Übersetzungen für Deutsch und Englisch
const messages = {
  de: {
    welcome: "Willkommen",
    username: "Max Mustermann",
    currentElection: "Jetzt wählen",
    electionInfo: "Alle Informationen zur letzten Wahl",
    vote: "Abstimmen",
    support: "Support",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    contact: "Kontakt",
    verify: "Bitte verifzieren Sie sich",
    datenschutzContent: `
    ## Datenschutz
    Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Auf dieser Seite informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten im Rahmen unserer App.
    ### Erhebung von Daten
    Wir erfassen personenbezogene Daten nur, wenn Sie diese freiwillig im Rahmen der Nutzung unserer Dienste angeben. Dazu gehören beispielsweise Name, E-Mail-Adresse oder andere Kontaktdaten.
    ### Nutzung von Daten
    Ihre Daten werden ausschließlich für die Bereitstellung unserer Dienste genutzt und niemals an Dritte weitergegeben.
    ### Ihre Rechte
    Sie haben das Recht, jederzeit Auskunft über die von uns gespeicherten Daten zu erhalten sowie deren Löschung oder Berichtigung zu verlangen.
    Falls Sie Fragen zum Datenschutz haben, wenden Sie sich bitte an unseren Support.

    Datum: 08.12.2024
    `,
    impressumContent: `
    ## Impressum

    Verantwortlich für den Inhalt:

    Max Mustermann

    Musterstraße 1

    12345 Musterstadt

    Deutschland

    Telefon: +49 123 456789

    E-Mail: kontakt(at)musterfirma.de

    ### Haftungsausschluss
    Alle Inhalte auf dieser Website wurden mit größter Sorgfalt erstellt. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.

    Datum: 08.12.2024
    `,
    contactContent: `
    ## Kontakt

    Wir freuen uns über Ihre Nachricht! Nutzen Sie die unten stehenden Kontaktdaten, um uns zu erreichen:

    ### Adresse
    Max Mustermann

    Musterstraße 1

    12345 Musterstadt

    Deutschland

    ### Telefon
    +49 123 456789

    ### E-Mail
    kontakt(at)musterfirma.de
    `,
    dashboard: "Dashboard",
    curr_election: "Aktuelle Wahl",
    results: "Ergebnisse",
    verification: "Verifizierung",
    h1bundestagswahl: "Bundestagswahl 2025",
    verificationmessage1: "Sie müssen sich erst verifizieren, um wählen zu können. ",
    verificationmessage2: " Bitte loggen sie sich ein. ",
    gotologin: "Zur Anmeldung",
    alreadyvoted1: "Sie haben bereits gewählt. ",
    alreadyvoted2: " Vielen Dank für Ihre Teilnahme an der Wahl.",
    backtodashboard: "Zurück zum Dashboard",
    electionbegin: "Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:",
    cancel: "Abbrechen",
    continue: "Weiter",
    back: "Zurück",
    submit: "Bestätigen",
    aftervotemessage: "Vielen Dank für Ihre Teilnahme an der Wahl. ",
    step: "Schritt",
    of: "von",
    cancelmessage: "Sind Sie sicher, dass Sie die Wahl abbrechen möchten? Alle bisher getroffenen Auswahlen gehen verloren.",
    summary: "Zusammenfassung",
    summaryinfo: " Sie haben folgende Stimmen abgegeben:",
    securityinfo: "Sicherheitsinformationen",
    securitycheck: " Ich habe die Sicherheitsinformationen gelesen und stimme zu.",
    erststimme: "Erststimme",
    zweitstimme: "Zweitstimme",
    erststimmeInfo: " für die Wahl eines oder einer Wahlkreisabgeordneten",
    zweitstimmeInfo: " für die Wahl einer Landesliste (Partei)",
    yourVote: "Sie haben eine Stimme",
    sicherheitsinformationen: [
      "GG BRD",
      "Art 38",
      "(1) Die Abgeordneten des Deutschen Bundestages werden in allgemeiner, unmittelbarer, freier, gleicher und geheimer Wahl gewählt. Sie sind Vertreter des ganzen Volkes, an Aufträge und Weisungen nicht gebunden und nur ihrem Gewissen unterworfen.",
      "(2) Wahlberechtigt ist, wer das achtzehnte Lebensjahr vollendet hat; wählbar ist, wer das Alter erreicht hat, mit dem die Volljährigkeit eintritt.",
      "(3) Das Nähere bestimmt ein Bundesgesetz.",
      "Ihr Wahl wird sicher und anonym verarbeitet. Mit dem Klick auf \"Bestätigen\" ist die getroffene Auswahl nicht mehr änderbar."
    ],
    confirmAbort: "Sind Sie sicher, dass Sie die Wahl abbrechen möchten? Alle bisher getroffenen Auswahlen gehen verloren.",
    confirmSubmit: "Sind Sie sicher, dass Sie die Wahl bestätigen möchten? Nach Bestätigung ist keine Änderung mehr möglich.",
    electionResults: "Wahlergebnisse 2021",
    auswertung: "Gewinne und Verluste",
    trueVerification: "Sie sind erfolgreich verifiziert",
    register: "Mit BundID anmelden oder registrieren",
    login: "Melden Sie sich mit Ihrem elektronischen Personalausweis über BundID an, um weiter Digitale Wahlplattform zu nutzen.",
    goOn: "Weiter mit BundID",
    redirect: "Sie werden zu BundId.de weitergeleitet, um den Authentifizierungsprozess fortzusetzen.",
  },
  en: {
    welcome: "Welcome",
    username: "Max Mustermann",
    currentElection: "Vote now",
    electionInfo: "All information about the last Election",
    vote: "Vote",
    support: "Support",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    contact: "Contact",
    verify: "Please verify yourself",
    datenschutzContent: `
    ## Privacy Policy

    We take the protection of your personal data seriously. On this page, we inform you about the collection, processing, and use of your data within our app.

    ### Data Collection
    We only collect personal data if you voluntarily provide it during the use of our services. This includes, for example, your name, email address, or other contact information.

    ### Data Usage
    Your data is used solely to provide our services and is never shared with third parties.

    ### Your Rights
    You have the right to request information about the data we have stored at any time, as well as to request its deletion or correction.

    If you have any questions about data protection, please contact our support team.

    Date: 08.12.2024
    `,
    impressumContent: `
    ## Legal Notice

    Responsible for the content:

    Max Mustermann

    Example Street 1

    12345 Example City

    Germany

    Phone: +49 123 456789

    Email: contact(at)examplecompany.com

    ### Disclaimer
    All content on this website has been created with the utmost care. However, we do not guarantee the accuracy, completeness, or timeliness of the content.

    Date: 08.12.2024
    `,
    contactContent: `
    ## Contact

    We look forward to hearing from you! Use the contact information below to reach us:

    ### Address
    Max Mustermann

    Example Street 1

    12345 Example City

    Germany

    ### Phone
    +49 123 456789

    ### Email
    contact(at)examplecompany.com
    `,
    dashboard: "Dashboard",
    curr_election: "Current Election",
    results: "Results",
    verification: "Verification",
    h1bundestagswahl: "Federal Election 2025",
    verificationmessage1: "You need to verify yourself before you can vote. ",
    verificationmessage2: "Please log in. ",
    gotologin: "Go to Login",
    alreadyvoted1: "You have already voted. ",
    alreadyvoted2: " Thank you for participating in the election.",
    backtodashboard: "Back to Dashboard",
    electionbegin: "Start the election process by pressing Start:",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    aftervotemessage: "Thank you for participating in the election.",
    step: "Step",
    of: "of",
    cancelmessage: "Are you sure you want to cancel the election? All selections made so far will be lost.",
    summary: "Summary",
    summaryinfo: "You have cast the following votes:",
    securityinfo: "Security Information",
    securitycheck: " I have read and agree to the security information.",
    erststimme: "First Vote",
    zweitstimme: "Second Vote",
    erststimmeInfo: " for the election of a constituency representative",
    zweitstimmeInfo: " for the election of a state list (party)",
    yourVote: "You have one Vote",
    sicherheitsinformationen: [
      "GG BRD",
      "Art 38",
      "(1) Members of the German Bundestag are elected by general, direct, free, equal, and secret ballot. They are representatives of the whole people, not bound by orders and instructions, and are only subject to their conscience.",
      "(2) Anyone who has reached the age of eighteen is eligible to vote; anyone who has reached the age of majority is eligible for election.",
      "(3) Further details are determined by a federal law.",
      "Your vote will be processed securely and anonymously. Once you click \"Confirm,\" the selected choice can no longer be changed."
    ],
    confirmAbort: "Are you sure you want to cancel the election? All previous selections will be lost.",
    confirmSubmit: "Are you sure you want to confirm your vote? After confirmation, no changes can be made.",
    electionResults: "Election Results 2021",
    auswertung: "Gains and Losses",
    trueVerification: "You have been successfully verified",
    register: "Log in or register with BundID",
    login: "Log in with your electronic ID card via BundID to continue using the Digital Voting Platform.",
    goOn: "Continue with BundID",
    redirect: "You will be redirected to BundID.de to continue the authentication process.",
  },
};

const i18n = createI18n({
  locale: 'de',  // Standard-Sprache
  messages,
});

export default i18n;
