<template>
  <div id="wahl">
    <h1 class="text-3xl font-bold p-5">Bundestagswahl 2025</h1>
    <div v-if="start" class="start-container">
      <p>Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:</p>
      <button @click="getStarted()" class="rounded p-2 pl-3 pr-3 bg-200 border-2 hover:bg-gray-300 transition duration-200 ease-in-out">
        Start
      </button>
    </div>
    <div v-if="erststimme" class="stimmdiv">
      <ErststimmeComponent />
      <!-- Buttons: Links = Zurück/Abbrechen, Rechts = Weiter -->
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
    <div v-if="zweitstimme" class="stimmdiv">
      <ZweitstimmeComponent />
      <!-- Buttons: Links = Zurück, Rechts = Weiter -->
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
    <div v-if="bestaetigung" class="stimmdiv">
      <BestaetigungComponent />
      <!-- Buttons: Links = Zurück/Abbrechen, Rechts = Bestätigen -->
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

  <!-- Progressbar einfügen -->
  <section id="wahlfortschritt">
    <div class="progress-wrapper">
      <progress :value="fortschritt" max="3"></progress>
      <span class="progress-text">Schritt {{fortschritt}} von 3</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useWahlStore } from "@/stores/wahlStore";
import ErststimmeComponent from "@/components/ErststimmeComponent.vue";
import ZweitstimmeComponent from "@/components/ZweitstimmeComponent.vue";
import BestaetigungComponent from "@/components/BestaetigungComponent.vue";
import NavigationButton from "@/components/NavigationButton.vue";

const store = useWahlStore();

const start = ref(false);
const erststimme = ref(false);
const zweitstimme = ref(false);
const bestaetigung = ref(false);
const fortschritt = ref(0);

function getStarted() {
  erststimme.value = true;
  start.value = false;
  fortschritt.value = 1;

  // Zurücksetzen der Stimmen
  store.setErststimme(null);
  store.setZweitstimme(null);
}

function gettoStart() {
  const confirmed = window.confirm(
    "Sind Sie sicher, dass Sie die Wahl abbrechen möchten? Alle bisher getroffenen Auswahlen gehen verloren."
  );
  if (confirmed) {
    erststimme.value = false;
    zweitstimme.value = false;
    start.value = true;
    fortschritt.value = 0;
    bestaetigung.value = false;

    // Zurücksetzen der Stimmen
    store.setErststimme(null);
    store.setZweitstimme(null);
  }
}

function getErststimme() {
  erststimme.value = false;
  zweitstimme.value = true;
  fortschritt.value = 2;
}

function gettoErststimme() {
  erststimme.value = true;
  zweitstimme.value = false;
  fortschritt.value = 1;
}

function gettoBestaetigung() {
  zweitstimme.value = false;
  bestaetigung.value = true;
  fortschritt.value = 3;
}

function gettoZweitstimme() {
  zweitstimme.value = true;
  bestaetigung.value = false;
  fortschritt.value = 2;
}

function submit() {
  const confirmed = window.confirm(
    "Sind Sie sicher, dass Sie die Wahl bestätigen möchten? Nach Bestätigung ist keine Änderung mehr möglich."
  );
  if (confirmed) {
    // Hier könnte die Wahl an den Server gesendet werden
    window.alert("Vielen Dank für Ihre Stimme!");
  }
  // Rückleitung zu Dashboard
  window.location.href = "/";
}

onMounted(() => {
  start.value = true;
});
</script>

<style scoped>
h1 {
  text-align: center;
  padding-bottom: 10px;
}

#wahl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.start-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding-top: 50px;
  padding-bottom: 50px;
  max-height: 300px;
}

.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
}

progress {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border: 1px solid #9ca3aff3;
  border-radius: 5px;
}

progress::-webkit-progress-bar {
  background-color: #f3f4f6;
}

progress::-webkit-progress-value {
  background-color: #9ca3aff3;
}

progress::-moz-progress-bar {
  background-color: #9ca3aff3;
}

progress::-ms-fill {
  background-color: #9ca3aff3;
}

.progress-text {
  position: absolute;
  bottom: -25px; /* Abstand unterhalb der Progress-Bar */
  left: 0; /* Text unten links platzieren */
  font-size: 14px;
  color: #333;
}

#wahlfortschritt {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.stimmdiv {
  padding-top: 20px;
  padding-bottom: 10px;
  max-width: 1000px;
  justify-content: center;
  align-items: center;
}

.stimmdiv button {
  margin-top: 20px;
}

#submit-button {
  background-color: #d1fae5;
  border: 2px solid #10b981;
}

#submit-button:disabled {
  background-color: #e5e7eb; /* Grau */
  border: 2px solid #9ca3af;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  gap: 20px;
}

.left-buttons {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
}

.right-buttons {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
