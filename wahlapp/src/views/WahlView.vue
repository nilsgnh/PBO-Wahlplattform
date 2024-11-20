<template>
  <div id="wahl">
    <h1 class="text-3xl font-bold p-5">Bundestagswahl 2025</h1>
    <div v-if="start" class="start-container">
      <p>Beginnen Sie mit dem Durchführen der Wahl durch Drücken auf Start:</p>
      <button @click="getStarted()" class="rounded p-2 pl-3 pr-3 bg-darkgreen-200 border-2 hover:bg-gray-300 transition duration-200 ease-in-out">
        Start
      </button>
    </div>
    <div v-if="erststimme" class="stimmdiv">
      <ErststimmeComponent />
      <button @click="gettoStart()" class="rounded p-2 pl-3 pr-3 bg-darkgreen-200 border-2 hover:bg-gray-300 transition duration-200 ease-in-out">
        Zurück
      </button>
      <button @click="getErststimme()" class="rounded p-2 pl-3 pr-3 bg-darkgreen-200 border-2 hover:bg-gray-300 transition duration-200 ease-in-out">
        Weiter
      </button>
    </div>
    <div v-if="zweitstimme" class="stimmdiv">
      <ZweitstimmeComponent />
      <button @click="gettoErststimme()" class="rounded p-2 pl-3 pr-3 bg-darkgreen-200 border-2 hover:bg-gray-300 transition duration-200 ease-in-out">
        Zurück
      </button>
    </div>
  </div>

  <!-- Progressbar einfügen -->
  <section id="wahlfortschritt">
    <div class="progress-wrapper">
      <progress :value="fortschritt" max="4"></progress>
      <span class="progress-text">Schritt {{fortschritt}} von 4</span>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import ErststimmeComponent from "@/components/ErststimmeComponent.vue";
import ZweitstimmeComponent from "@/components/ZweitstimmeComponent.vue";

const start = ref(true);
const erststimme = ref(false);
const zweitstimme = ref(false);
const fortschritt = ref(0);

function getStarted(){
  this.erststimme = true;
  this.start = false;
  this.fortschritt = 1;
}

function gettoStart(){
  this.erststimme = false;
  this.start = true;
  this.fortschritt = 0;
}

function getErststimme(){
  this.erststimme = false;
  this.zweitstimme = true;
  this.fortschritt = 2;
}

function gettoErststimme(){
  this.erststimme = true;
  this.zweitstimme = false;
  this.fortschritt = 1;
}


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

</style>
