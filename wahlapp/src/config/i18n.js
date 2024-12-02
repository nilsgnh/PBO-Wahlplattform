import { createI18n } from 'vue-i18n';

// Definiere die Übersetzungen für Deutsch und Englisch
const messages = {
  de: {
    welcome: "Willkommen",
    username: "Max Mustermann",
    electionInfo: "Alle Informationen zur Bundestagswahl 2025",
    vote: "Abstimmen",
    support: "Support",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    contact: "Kontakt"
  },
  en: {
    welcome: "Welcome",
    username: "Max Mustermann",
    electionInfo: "All information about the Bundestag Election 2025",
    vote: "Vote",
    support: "Support",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    contact: "Contact"
  }
};

const i18n = createI18n({
  locale: 'de',  // Standard-Sprache
  messages,
});

export default i18n;
