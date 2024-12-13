import { createI18n } from 'vue-i18n';

// Definiere die Übersetzungen für Deutsch und Englisch
const messages = {
  de: {
    welcome: "Willkommen",
    username: "Max Mustermann",
    currentElection: "Jetzt wählen",
    electionInfo: "Alle Informationen zur Bundestagswahl 2025",
    vote: "Abstimmen",
    support: "Support",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    contact: "Kontakt",
    datenschutzContent: `
## Datenschutz {.font-bold .text-xl}
Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Auf dieser Seite informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten im Rahmen unserer App.
### Erhebung von Daten {.font-bold .text-xl}
Wir erfassen personenbezogene Daten nur, wenn Sie diese freiwillig im Rahmen der Nutzung unserer Dienste angeben. Dazu gehören beispielsweise Name, E-Mail-Adresse oder andere Kontaktdaten.
### Nutzung von Daten {.font-bold .text-xl}
Ihre Daten werden ausschließlich für die Bereitstellung unserer Dienste genutzt und niemals an Dritte weitergegeben.
### Ihre Rechte {.font-bold .text-xl}
Sie haben das Recht, jederzeit Auskunft über die von uns gespeicherten Daten zu erhalten sowie deren Löschung oder Berichtigung zu verlangen.
Falls Sie Fragen zum Datenschutz haben, wenden Sie sich bitte an unseren Support.

Datum: 08.12.2024
    `,
    impressumContent: `
## Impressum {.font-bold .text-xl}

Verantwortlich für den Inhalt:

Max Mustermann
Musterstraße 1
12345 Musterstadt
Deutschland

Telefon: +49 123 456789
E-Mail: kontakt@musterfirma.de

### Haftungsausschluss {.font-bold .text-xl}
Alle Inhalte auf dieser Website wurden mit größter Sorgfalt erstellt. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.

Datum: 08.12.2024
    `,
    contactContent: `
## Kontakt {.font-bold .text-xl}

Wir freuen uns über Ihre Nachricht! Nutzen Sie die unten stehenden Kontaktdaten, um uns zu erreichen:

### Adresse {.font-bold .text-xl}
Max Mustermann
Musterstraße 1
12345 Musterstadt
Deutschland

### Telefon {.font-bold .text-xl}
+49 123 456789

### E-Mail {.font-bold .text-xl}
kontakt@musterfirma.de
    `,
  },
  en: {
    welcome: "Welcome",
    username: "Max Mustermann",
    currentElection: "Vote now",
    electionInfo: "All information about the Bundestag Election 2021",
    vote: "Vote",
    support: "Support",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    contact: "Contact",
    datenschutzContent: `
## Privacy Policy {.font-bold .text-xl}

We take the protection of your personal data seriously. On this page, we inform you about the collection, processing, and use of your data within our app.

### Data Collection {.font-bold .text-xl}
We only collect personal data if you voluntarily provide it during the use of our services. This includes, for example, your name, email address, or other contact information.

### Data Usage {.font-bold .text-xl}
Your data is used solely to provide our services and is never shared with third parties.

### Your Rights {.font-bold .text-xl}
You have the right to request information about the data we have stored at any time, as well as to request its deletion or correction.

If you have any questions about data protection, please contact our support team.

Date: 08.12.2024
    `,
    impressumContent: `
## Legal Notice {.font-bold .text-xl}

Responsible for the content:

Max Mustermann
Example Street 1
12345 Example City
Germany

Phone: +49 123 456789
Email: contact@examplecompany.com

### Disclaimer {.font-bold .text-xl}
All content on this website has been created with the utmost care. However, we do not guarantee the accuracy, completeness, or timeliness of the content.

Date: 08.12.2024
    `,
    contactContent: `
## Contact {.font-bold .text-xl}

We look forward to hearing from you! Use the contact information below to reach us:

### Address {.font-bold .text-xl}
Max Mustermann
Example Street 1
12345 Example City
Germany

### Phone {.font-bold .text-xl}
+49 123 456789

### Email {.font-bold .text-xl}
contact@examplecompany.com
    `,
  },
};

const i18n = createI18n({
  locale: 'de',  // Standard-Sprache
  messages,
});

export default i18n;
