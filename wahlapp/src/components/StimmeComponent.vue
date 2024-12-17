<template>
  <!-- Anzeige der Überschrift mit der Stimme (z. B. "Erststimme" oder "Zweitstimme") -->
  <p class="font-bold text-2xl"> {{ stimme }} </p>
  <!-- Anzeige eines erklärenden Textes mit zusätzlicher Info -->
  <p class="text-base pb-3">Sie haben eine Stimme{{info}}.</p>
  <hr>
  <!-- Container für die Auswahl der Parteien -->
  <div class="flex flex-row" id="wahl">
    <form>
      <!-- Iteration über die anzuzeigenden Elemente (Parteien oder Listenplätze) -->
      <!-- Boxen werden nicht mehr deaktiviert -->
      <ParteiboxComponent
        v-for="item in itemsToDisplay"
        :key="item.id"
        :partei="item.name"
        :text="item.text"
        :num="item.num"
        :radioname="stimme"
        :selected="selectedPartei === item.num"
        :disabled="false"
        :onClick="handleBoxClick"
      />
    </form>
  </div>
</template>

<script setup>
// Import von Vue-Funktionen und Komponenten
import { reactive, ref, defineProps, computed, onMounted, watch } from "vue";
import ParteiboxComponent from "@/components/ParteiboxComponent.vue"; // Box-Komponente für die Parteien
import { useWahlStore } from "@/stores/wahlStore"; // Zugriff auf den Wahl-Store

// Zugriff auf den Wahl-Store
const store = useWahlStore();

// Definierte Props für die Komponente (Stimme und zusätzliche Info)
const props = defineProps({
  stimme: String, // Typ der Stimme (Erst- oder Zweitstimme)
  info: String, // Zusätzliche Informationen (die in Unterüberschrift angezeigt werden)
});

// Reaktive Liste der Parteien für die Zweitstimme (Zugriff auf Pinia-Store)
const parteien = reactive(store.parteien);

// Reaktive Liste der Listenplätze für die Erststimme (Zugriff auf Pinia-Store)
const listenplaetze = reactive(store.listenplaetze);

// Berechnung, welche Elemente angezeigt werden sollen (abhängig von der Art der Stimme)
const itemsToDisplay = computed(() => {
  return props.stimme === "Erststimme" ? listenplaetze : parteien;
});

// Aktuell ausgewählte Partei (initial null)
const selectedPartei = ref(null);

</script>

<style>
/* Stil für den Wahlcontainer */
#wahl {
  display: flex; /* Flexbox-Layout */
  flex-wrap: wrap; /* Zeilenumbruch erlauben */
  gap: 10px; /* Abstand zwischen den Boxen */
  justify-content: space-evenly; /* Gleichmäßige Verteilung der Boxen */
  padding: 20px; /* Abstand innen */
}

/* Stil für das Formular */
form {
  width: 100%; /* Formular nimmt die volle Breite des Containers */
  max-width: 1000px; /* Optionale maximale Breite */
}

/* Stil für den erklärenden Text */
p {
  font-size: 20px; /* Schriftgröße */
  margin-bottom: 10px; /* Abstand nach unten */
}
</style>
