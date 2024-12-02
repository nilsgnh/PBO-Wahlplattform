<template>
  <p class="font-bold"> {{ stimme }} </p>
  <p class="text-base pb-3">Sie haben eine Stimme{{info}}.</p>
  <hr>
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
  info: String,
});

// Parteienstruktur für Zweitstimme
const parteien = reactive(store.parteien);

// Listenplätze für Erststimme
const listenplaetze = reactive(store.listenplaetze);

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
  gap: 10px; /* Abstand zwischen den Boxen */
  justify-content: space-evenly; /* Gleichmäßige Verteilung */
  padding: 20px;
}

form {
  width: 100%; /* Formular nimmt die volle Breite des Containers */
  max-width: 1000px; /* Optionale maximale Breite */
}

p {
  font-size: 20px;
  margin-bottom: 10px;
}

</style>
