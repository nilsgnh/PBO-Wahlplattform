<template>
  <p>Sie haben eine Stimme ({{ stimme }}):</p>
  <div class="flex flex-row" id="wahl">
    <form>
      <ParteiboxComponent
        v-for="item in itemsToDisplay"
        :key="item.id"
        :partei="item.name"
        :text="item.text"
        :num="item.num"
        :radioname="stimme"
        :selected="selectedPartei === item.num"
        :disabled="selectedPartei !== null && selectedPartei !== item.num"
        :onClick="handleBoxClick"
      />
    </form>
  </div>
</template>


<script setup>
import { reactive, ref, defineProps, computed, onMounted, watch } from "vue";
import ParteiboxComponent from "@/components/ParteiboxComponent.vue";
import { useWahlStore  } from "@/stores/wahlStore";

// Store
const store = useWahlStore();

// Props
const props = defineProps({
  stimme: String,
});

// Parteienstruktur für Zweitstimme
const parteien = reactive([
  { id: 1, name: "CDU", text: "Christlich Demokratische Union", num: 1 },
  { id: 2, name: "SPD", text: "Sozialdemokratische Partei Deutschlands", num: 2 },
  { id: 3, name: "Grüne", text: "Bündnis 90/Die Grünen", num: 3 },
  { id: 4, name: "FDP", text: "Freie Demokratische Partei", num: 4 },
  { id: 5, name: "Linke", text: "Die Linke", num: 5 },
  { id: 6, name: "AfD", text: "Alternative für Deutschland", num: 6 },
]);

// Listenplätze für Erststimme
const listenplaetze = reactive([
  { id: 1, name: "Mustermann, Max", text: "Lehrer, CDU", num: 1 },
  { id: 2, name: "Müller, Anna", text: "Ärztin, SPD", num: 2 },
  { id: 3, name: "Schmidt, Peter", text: "Umweltaktivist, Grüne", num: 3 },
  { id: 4, name: "Fischer, Lena", text: "Juristin, FDP", num: 4 },
  { id: 5, name: "Bauer, Karl", text: "Sozialpädagoge, Die Linke", num: 5 },
  { id: 6, name: "Schulze, Maria", text: "Unternehmerin, AfD", num: 6 },
]);

// Dynamische Auswahl der anzuzeigenden Elemente
const itemsToDisplay = computed(() => {
  return props.stimme === "Erststimme" ? listenplaetze : parteien;
});

// Aktuell ausgewählte Partei oder Listenplatz
const selectedPartei = ref(null); // Aktuell ausgewählte Partei

// Methods
// Methoden
function handleBoxClick(num) {
  if (selectedPartei.value === num) {
    // Auswahl zurücksetzen
    selectedPartei.value = null;
    if (props.stimme === "Erststimme") {
      store.setErststimme(null);
    } else {
      store.setZweitstimme(null);
    }
  } else {
    // Neue Auswahl setzen
    selectedPartei.value = num;
    if (props.stimme === "Erststimme") {
      store.setErststimme(num);
    } else {
      store.setZweitstimme(num);
    }
  }
}

// Store-Wert initial laden
onMounted(() => {
  if (props.stimme === "Erststimme") {
    selectedPartei.value = store.selectedErststimme || null; // Falls kein Wert im Store ist, setze null
  } else {
    selectedPartei.value = store.selectedZweitstimme || null; // Falls kein Wert im Store ist, setze null
  }
});


// Beobachten, falls der Storewert sich außerhalb der Komponente ändert
watch(
  () => (props.stimme === "Erststimme" ? store.selectedErststimme : store.selectedZweitstimme),
  (newValue) => {
    console.log("Aktuell ausgewählte Partei:", newValue);
    console.log(
      "Disabled-Status:",
      parteien.map((partei) => ({
        name: partei.name,
        disabled: selectedPartei.value !== null && selectedPartei.value !== partei.num,
      }))
    );
  }
);

</script>

<style>
#wahl {
  display: flex;
  flex-wrap: wrap; /* Zeilenumbruch erlauben */
  gap: 20px; /* Abstand zwischen den Boxen */
  justify-content: space-evenly; /* Gleichmäßige Verteilung */
  padding: 20px;
}

form {
  width: 100%; /* Formular nimmt die volle Breite des Containers */
  max-width: 1000px; /* Optionale maximale Breite */
}

</style>
