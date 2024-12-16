<template>
  <div id="wahl">
    <h1 class="text-3xl font-bold p-2">Bundestagswahl 2025</h1>
    <div v-if="start && statesStore.gewaehlt" class="start-end-container">
      <div class="text-xl">Sie haben bereits gewählt. <br> Vielen Dank für Ihre Teilnahme an der Wahl.</div>
      <br>
      <NavigationButton
        type="dashboard"
        @Click="gettoDashboard"
      >
        <template v-slot:buttonText>
          Zurück zum Dashboard
        </template>
      </NavigationButton>
    </div>
    <div v-if="start && !statesStore.gewaehlt" class="start-end-container">
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

  <!-- Progressbar -->
  <section v-if="bestaetigung || erststimme || zweitstimme" id="wahlfortschritt">
    <div class="progress-wrapper">
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
import { onMounted, ref } from "vue";
import { useWahlStore } from "@/stores/wahlStore";
import { useStatesStore } from "@/stores/statesStore.js";

import ErststimmeComponent from "@/components/ErststimmeComponent.vue";
import ZweitstimmeComponent from "@/components/ZweitstimmeComponent.vue";
import BestaetigungComponent from "@/components/BestaetigungComponent.vue";
import NavigationButton from "@/components/NavigationButton.vue";
import router from "@/router/index.js";

const store = useWahlStore();
const statesStore = useStatesStore();

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
  store.checkboxAgreed = false;
}

function gettoDashboard() {
  erststimme.value = false;
  zweitstimme.value = false;
  start.value = false;
  fortschritt.value = 0;
  bestaetigung.value = false;
  store.checkboxAgreed = false;
  //auf Router umleiten
  router.push('/');
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
    store.checkboxAgreed = false;
    window.scrollTo(0, 0);
  }
}

function getErststimme() {
  erststimme.value = false;
  zweitstimme.value = true;
  fortschritt.value = 2;
  window.scrollTo(0, 0);
}

function gettoErststimme() {
  erststimme.value = true;
  zweitstimme.value = false;
  fortschritt.value = 1;
  //window.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

function gettoBestaetigung() {
  zweitstimme.value = false;
  bestaetigung.value = true;
  fortschritt.value = 3;
  window.scrollTo(0, 0);
}

function gettoZweitstimme() {
  zweitstimme.value = true;
  bestaetigung.value = false;
  fortschritt.value = 2;
  window.scrollTo(0, 0);
}

function gettoEnd() {
  bestaetigung.value = false;
  fortschritt.value = 4;
  window.scrollTo(0, 0);
}

function submit() {
  const confirmed = window.confirm(
    "Sind Sie sicher, dass Sie die Wahl bestätigen möchten? Nach Bestätigung ist keine Änderung mehr möglich."
  );
  if (confirmed) {
    // Wahl abschließen
    statesStore.submitWahl();
    gettoEnd();
  }
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

.start-end-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 50px;
  max-height: 300px;
}

p {
  font-size: 20px;
  margin-bottom: 20px;
}

.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin-left: 10px;
  margin-right: 10px;
}

progress {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border: 1px solid #333333 ; /* dunkler als #f0fff4 */
  /*border-radius: 5px;*/
}

progress:hover {
  transform: scale(1.02);
}

progress::-webkit-progress-bar {
  background-color: #fafbfd;
}

progress::-webkit-progress-value {
  background-color: #d1fae5;
}

progress::-moz-progress-bar {
  background-color: #d1fae5;
}

progress::-ms-fill {
  background-color: #d1fae5;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background-color: #fafbfd;
  border: 1px solid #333;
  /*border-radius: 5px;*/
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #d1fae5;
  width: 0;
  transition: width 0.5s ease; /* Weicher Übergang */
}

.progress-text {
  position: absolute;
  bottom: -25px;
  left: 0;
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
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 1000px;
  width: 100%;
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
  gap: 5px;
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

/* Media Query für kleine Bildschirme/mobile Version*/
@media (max-width: 540px) {
  .button-container {
    flex-direction: column; /* Buttons untereinander anordnen */
    align-items: center; /* Zentrierte Ausrichtung */
    gap: 10px; /* Mehr Abstand zwischen den Buttons */
  }

  .left-buttons,
  .right-buttons {
    justify-content: center; /* Zentrierte Buttons */
    width: 100%; /* Breite anpassen */
  }
}

</style>
