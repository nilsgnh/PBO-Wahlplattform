<template>
  <div id="wahl">
    <!-- Hauptüberschrift für die Bundestagswahl -->
    <h1 class="text-3xl font-bold p-2">Bundestagswahl 2025</h1>
    <!-- Anzeige für nicht verifizierte Nutzer -->
    <div v-if="start && !authStore.isAuthenticated" class="start-end-container">
      <!-- Hinweis zur Verifizierung -->
      <div class="text-xl">Sie müssen sich erst verifizieren, um wählen zu können. <br> Bitte loggen sie sich ein. </div>
      <!-- Navigation zur Anmeldeseite -->
      <NavigationButton
        type="next"
        @Click="gettoLogin()"
      >
        <template v-slot:buttonText>
          Zur Anmeldung
        </template>
      </NavigationButton>
    </div>
    <!-- Anzeige, wenn der Nutzer bereits gewählt hat -->
    <div v-if="start && statesStore.gewaehlt" class="start-end-container">
      <!-- Hinweis, dass der Nutzer bereits gewählt hat -->
      <div class="text-xl">Sie haben bereits gewählt. <br> Vielen Dank für Ihre Teilnahme an der Wahl.</div>
      <br>
      <!-- Navigation zurück zum Dashboard -->
      <NavigationButton
        type="dashboard"
        @Click="gettoDashboard"
      >
        <template v-slot:buttonText>
          Zurück zum Dashboard
        </template>
      </NavigationButton>
    </div>
    <!-- Anzeige für Nutzer, die bereit sind zu starten -->
    <div v-if="start && !statesStore.gewaehlt && authStore.isAuthenticated" class="start-end-container">
      <p class="text-xl">Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:</p>
      <NavigationButton
        type="next"
        @Click="getStarted"
      >
        <template v-slot:buttonText>
          Start
        </template>
      </NavigationButton>
    </div>
    <!-- Schritt: Abgabe der Erststimme -->
    <div v-if="erststimme" class="stimmdiv">
      <ErststimmeComponent />
      <!-- Navigation: Abbrechen oder Weiter -->
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton
            type="back"
            @Click="gettoStart"
          >
            <template v-slot:buttonText>
              Abbrechen
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton
            type="next"
            @Click="getErststimme"
          >
            <template v-slot:buttonText>
              Weiter
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
    <!-- Schritt: Abgabe der Zweitstimme -->
    <div v-if="zweitstimme" class="stimmdiv">
      <ZweitstimmeComponent />
      <!-- Navigation: Zurück oder Weiter -->
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton
            type="back"
            @Click="gettoErststimme"
          >
            <template v-slot:buttonText>
              Zurück
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton
            type="next"
            @Click="gettoBestaetigung"
          >
            <template v-slot:buttonText>
              Weiter
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
    <!-- Schritt: Bestätigung der Wahl -->
    <div v-if="bestaetigung" class="stimmdiv">
      <BestaetigungComponent />
      <!-- Navigation: Abbrechen, Zurück oder Bestätigen -->
      <div class="button-container">
        <div class="left-buttons">
          <NavigationButton
            type="back"
            @Click="gettoStart"
          >
            <template v-slot:buttonText>
              Abbrechen
            </template>
          </NavigationButton>
          <NavigationButton
            type="back"
            @Click="gettoZweitstimme"
          >
            <template v-slot:buttonText>
              Zurück
            </template>
          </NavigationButton>
        </div>
        <div class="right-buttons">
          <NavigationButton
            type="submit"
            @Click="submit"
            :isDisabled="!store.checkboxAgreed"
          >
            <template v-slot:buttonText>
              Bestätigen
            </template>
          </NavigationButton>
        </div>
      </div>
    </div>
  </div>
  <!-- Abschlussanzeige nach der Wahl -->
  <div v-if="!bestaetigung && !start && !erststimme && !zweitstimme" class="start-end-container">
      <p class="text-xl"> Vielen Dank für Ihre Teilnahme an der Wahl. </p>
      <NavigationButton
        type="dashboard"
        @Click="gettoDashboard"
      >
        <template v-slot:buttonText>
          Zurück zum Dashboard
        </template>
      </NavigationButton>
  </div>

  <!-- Fortschrittsanzeige für die Wahl -->
  <section v-if="bestaetigung || erststimme || zweitstimme" id="wahlfortschritt">
    <div class="progress-wrapper">
      <!-- Fortschrittsbalken -->
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: (fortschritt / 4) * 100 + '%' }"
        ></div>
      </div>
      <span class="progress-text">Schritt {{ fortschritt }} von 4</span>
    </div>
  </section>

  <br>
</template>

<script setup>
// Importieren der notwendigen Vue-Funktionen und Stores
import { onMounted, ref } from "vue";
import { useWahlStore } from "@/stores/wahlStore";
import { useStatesStore } from "@/stores/statesStore.js";
import { useAuthStore } from "@/stores/useAuth.js";

// Importieren der benötigten Komponenten und Router
import ErststimmeComponent from "@/components/ErststimmeComponent.vue";
import ZweitstimmeComponent from "@/components/ZweitstimmeComponent.vue";
import BestaetigungComponent from "@/components/BestaetigungComponent.vue";
import NavigationButton from "@/components/NavigationButton.vue";
import router from "@/router/index.js";

// Lokale Zustände (State) für den Ablauf der Wahl
const store = useWahlStore();
const statesStore = useStatesStore();
const authStore = useAuthStore();

// Reactive Variablen für die Benutzerinteraktion und UI-Zustände
const start = ref(false); // Initialzustand: Startseite
const erststimme = ref(false); // Zustand für Erststimmen-Ansicht
const zweitstimme = ref(false); // Zustand für Zweitstimmen-Ansicht
const bestaetigung = ref(false); // Zustand für Bestätigungsansicht
const fortschritt = ref(0); // Fortschritt der Wahl, von 0 bis 4

// Funktion: Start der Wahl
function getStarted() {
  erststimme.value = true; // Wechsel zur Erststimmen-Ansicht
  start.value = false; // Startansicht ausblenden
  fortschritt.value = 1; // Fortschritt aktualisieren

  // Zurücksetzen der abgegebenen Stimmen und Checkbox
  store.setErststimme(null);
  store.setZweitstimme(null);
  store.checkboxAgreed = false;
}

// Funktion: Umleitung zur Login-Seite
function gettoLogin() {
  router.push('/verifizierung'); // Router zur Verifizierungsseite navigieren
}

// Funktion: Rückkehr zum Dashboard
function gettoDashboard() {
  // Zurücksetzen aller Zustände
  erststimme.value = false;
  zweitstimme.value = false;
  start.value = false;
  fortschritt.value = 0;
  bestaetigung.value = false;
  store.checkboxAgreed = false;
  // Navigation zur Startseite/Dashboard
  router.push('/');
}

// Funktion: Zurück zum Start der Wahl, mit Benutzerbestätigung
function gettoStart() {
  const confirmed = window.confirm(
    "Sind Sie sicher, dass Sie die Wahl abbrechen möchten? Alle bisher getroffenen Auswahlen gehen verloren."
  );
  // Abfrage, ob Bestätigung des Abbruchs positiv ist
  if (confirmed) {
    // Zustände zurücksetzen und zur Startansicht wechseln
    erststimme.value = false;
    zweitstimme.value = false;
    start.value = true;
    fortschritt.value = 0;
    bestaetigung.value = false;

    // Zurücksetzen der Stimmen
    store.setErststimme(null);
    store.setZweitstimme(null);
    store.checkboxAgreed = false;
    window.scrollTo(0, 0); // Nach oben scrollen
  }
}

// Funktion: Wechsel zur Zweitstimmen-Ansicht
function getErststimme() {
  erststimme.value = false; // Erststimmen-Ansicht deaktivieren
  zweitstimme.value = true; // Zweitstimmen-Ansicht aktivieren
  fortschritt.value = 2; // Fortschritt aktualisieren
  window.scrollTo(0, 0); // Nach oben scrollen
}

// Funktion: Zurück zur Erststimmen-Ansicht
function gettoErststimme() {
  erststimme.value = true; // Erststimmen-Ansicht aktivieren
  zweitstimme.value = false; // Zweitstimmen-Ansicht deaktivieren
  fortschritt.value = 1; // Fortschritt aktualisieren
  window.scrollTo(0, 0); // Nach oben scrollen
}

// Funktion: Wechsel zur Bestätigungsansicht
function gettoBestaetigung() {
  zweitstimme.value = false; // Zweitstimmen-Ansicht deaktivieren
  bestaetigung.value = true; // Bestätigungsansicht aktivieren
  fortschritt.value = 3; // Fortschritt aktualisieren
  window.scrollTo(0, 0); // Nach oben scrollen
}

// Funktion: Zurück zur Zweitstimmen-Ansicht
function gettoZweitstimme() {
  zweitstimme.value = true; // Zweitstimmen-Ansicht aktivieren
  bestaetigung.value = false; // Bestätigungsansicht deaktivieren
  fortschritt.value = 2; // Fortschritt aktualisieren
  window.scrollTo(0, 0); // Nach oben scrollen
}

// Funktion: Abschluss der Wahl
function gettoEnd() {
  bestaetigung.value = false; // Bestätigungsansicht deaktivieren
  fortschritt.value = 4; // Fortschritt abschließen
  window.scrollTo(0, 0); // Nach oben scrollen
}

// Funktion: Absenden der Wahl mit Benutzerbestätigung
function submit() {
  const confirmed = window.confirm(
    "Sind Sie sicher, dass Sie die Wahl bestätigen möchten? Nach Bestätigung ist keine Änderung mehr möglich."
  );
  if (confirmed) {
    // Wahl abschließen (und Daten speichern)
    statesStore.submitWahl();
    gettoEnd(); // Abschluss der Wahl
  }
}

// Lifecycle Hook: Initialisierung beim Laden der Komponente
onMounted(() => {
  start.value = true; // Setzt den Startzustand auf aktiv
});
</script>

<style scoped>
/* Zentrale Überschrift */
h1 {
  text-align: center; /* Zentrierte Ausrichtung */
  padding-bottom: 10px; /* Abstand unterhalb der Überschrift */
}
/* Hauptcontainer für den Wahlprozess */
#wahl {
  display: flex; /* Flexbox zur Anordnung */
  flex-direction: column; /* Elemente vertikal anordnen */
  justify-content: center; /* Zentrierung der Inhalte */
  align-items: center;
  height: 100%; /* Voller verfügbarer Platz */
  text-align: center;
}

/* Container für Start- und Endbildschirm */
.start-end-container {
  display: flex; /* Flexbox zur Anordnung */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px; /* Abstand zwischen Elementen */
  padding-top: 20px;
  padding-bottom: 50px;
  max-height: 300px; /* Begrenzte Höhe */
}
/* Styling für Standardtexte */
p {
  font-size: 20px; /* Vergrößerter Text */
  margin-bottom: 20px; /* Abstand nach unten */
}

/* Wrapper für den Fortschrittsbalken */
.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%; /* Volle Breite */
  max-width: 1000px; /* Begrenzung der Breite */
  margin-left: 10px; /* Abstand nach links */
  margin-right: 10px; /* Abstand nach rechts */
}

/* Fortschrittsanzeige */
progress {
  width: 100%; /* Volle Breite */
  height: 30px; /* Festgelegte Höhe */
  margin-top: 20px; /* Abstand nach oben */
  border: 1px solid #333333; /* Dunkler Rahmen */
}
/* Hover-Effekt für den Fortschrittsbalken */
progress:hover {
  transform: scale(1.02); /* Leichte Vergrößerung */
}

/* Webkit-spezifische Stile für den Fortschrittsbalken */
progress::-webkit-progress-bar {
  background-color: #fafbfd; /* Heller Hintergrund */
}

progress::-webkit-progress-value {
  background-color: #d1fae5; /* Grüner Fortschritt */
}

/* Mozilla-spezifische Stile */
progress::-moz-progress-bar {
  background-color: #d1fae5; /* Grüner Fortschritt */
}

/* Microsoft-spezifische Stile */
progress::-ms-fill {
  background-color: #d1fae5; /* Grüner Fortschritt */
}
/* Alternative Fortschrittsanzeige */
.progress-bar {
  width: 100%; /* Volle Breite */
  height: 30px;
  background-color: #fafbfd; /* Hintergrundfarbe */
  border: 1px solid #333; /* Rahmen */
  overflow: hidden; /* Inhalte, die überstehen, ausblenden */
  position: relative;
}

/* Fortschrittsfüllung */
.progress-fill {
  height: 100%; /* Vollständige Höhe des Containers */
  background-color: #d1fae5; /* Grüne Füllfarbe */
  width: 0; /* Anfangswert: keine Füllung */
  transition: width 0.5s ease; /* Sanfter Übergang */
}

/* Fortschrittstext */
.progress-text {
  position: absolute;
  bottom: -25px; /* Text unterhalb anzeigen */
  left: 0;
  font-size: 14px; /* Kleinere Schriftgröße */
  color: #333; /* Dunkle Schriftfarbe */
}

/* Fortschrittsanzeige im Wahlprozess */
#wahlfortschritt {
  margin-top: 20px; /* Abstand nach oben */
  margin-bottom: 20px; /* Abstand nach unten */
  display: flex;
  justify-content: center; /* Zentrierte Ausrichtung */
}

/* Container für die Stimmauswahl */
.stimmdiv {
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 1000px; /* Begrenzung der Breite */
  width: 100%; /* Volle Breite */
  justify-content: center;
  align-items: center;
}

/* Styling für Buttons innerhalb der Stimmauswahl */
.stimmdiv button {
  margin-top: 20px; /* Abstand nach oben */
}

/* Button für die Abgabe */
#submit-button {
  background-color: #d1fae5; /* Grüner Hintergrund */
  border: 2px solid #10b981; /* Grüne Umrandung */
}

/* Deaktivierter Button für die Abgabe */
#submit-button:disabled {
  background-color: #e5e7eb; /* Grauer Hintergrund */
  border: 2px solid #9ca3af; /* Graue Umrandung */
  cursor: not-allowed; /* Zeigt an, dass keine Aktion möglich ist */
}

/* Container für die Navigationstasten */
.button-container {
  display: flex;
  justify-content: space-between; /* Buttons links und rechts ausrichten */
  width: 100%;
  max-width: 1000px;
  gap: 5px; /* Abstand zwischen Buttons */
}

/* Linke Buttons in der Navigation */
.left-buttons {
  flex: 1; /* Flex-Verhältnis */
  display: flex;
  justify-content: flex-start; /* Links ausrichten */
  gap: 5px;
}

/* Rechte Buttons in der Navigation */
.right-buttons {
  flex: 1; /* Flex-Verhältnis */
  display: flex;
  justify-content: flex-end; /* Rechts ausrichten */
}

/* Anpassung für mobile Endgeräte */
@media (max-width: 540px) {
  .button-container {
    flex-direction: column; /* Buttons untereinander anordnen */
    align-items: center; /* Zentrierte Ausrichtung */
    gap: 10px; /* Mehr Abstand zwischen den Buttons */
  }

  .left-buttons,
  .right-buttons {
    justify-content: center; /* Zentrierte Buttons */
    width: 100%; /* Volle Breite */
  }
}
</style>
