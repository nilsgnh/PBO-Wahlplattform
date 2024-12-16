<template>
  <div class="pie-chart-container">
    <!-- Canvas-Element für das Tortendiagramm -->
    <canvas ref="pieChart"></canvas> <!-- Ref für Zugriff auf das Canvas im Script -->
  </div>
</template>

  
<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { useErgebnisStore } from '../stores/ErgebnisStore'; // Import des ErgebnisStores zur Verwaltung der Diagrammdaten
import {
  Chart, // Hauptklasse für Diagramme
  PieController, // Steuerung für Tortendiagramme
  ArcElement, // Elemente für die Tortendiagrammsegmente
  Title, // Titel des Diagramms
  Tooltip, // Tooltip für Interaktivität
  Legend, // Legende des Diagramms
} from 'chart.js';

// Registrierung der benötigten Chart.js-Komponenten
Chart.register(PieController, ArcElement, Title, Tooltip, Legend);

// Zugriff auf den ErgebnisStore, der die Daten und Farben für die Diagramme enthält
const ergebnisStore = useErgebnisStore();

// Definiert die Eingabe-Property für die Komponente
// chartType entscheidet, ob die 'ergebnisse' oder 'gewinneUndVerluste' verwendet werden
const props = defineProps({
  chartType: { type: String, required: true, default: 'ergebnisse' }, // Standard: 'ergebnisse'
});

// Referenz für das Canvas-Element, in dem das Tortendiagramm dargestellt wird
const pieChart = ref<HTMLCanvasElement | null>(null);

// Lifecycle-Hook: Wird ausgeführt, nachdem die Komponente ins DOM gemountet wurde
onMounted(() => {
  // Dynamisches Laden der Daten basierend auf der übergebenen `chartType`-Property
  const chartData =
    props.chartType === 'gewinneUndVerluste'
      ? ergebnisStore.gewinneUndVerluste // Daten für Gewinne und Verluste
      : ergebnisStore.ergebnisse; // Daten für die Wahlergebnisse

  if (pieChart.value) { // Prüfen, ob das Canvas-Element verfügbar ist
    // Erstellen eines neuen Tortendiagramms mit Chart.js
    new Chart(pieChart.value, {
      type: 'pie', // Typ: Tortendiagramm
      data: {
        labels: chartData.chartLabels, // Beschriftungen aus dem Store
        datasets: [
          {
            data: chartData.chartData, // Werte aus dem Store
            backgroundColor: chartData.chartColors, // Farben aus dem Store
          },
        ],
      },
      options: {
        responsive: true, // Diagramm passt sich der Containergröße an
        plugins: {
          legend: { position: 'bottom' }, // Legende wird am unteren Rand angezeigt
          tooltip: { enabled: true }, // Tooltip wird aktiviert
        },
      },
    });
  }
});
</script>

  
<style scoped>
/* Hauptcontainer für das Tortendiagramm */
.pie-chart-container {
  width: 80%; /* Nimmt 80% der übergeordneten Breite ein */
  height: 500px; /* Feste Höhe für das Diagramm */
  display: flex; /* Flexbox zur Zentrierung */
  justify-content: center; /* Horizontale Zentrierung */
  align-items: center; /* Vertikale Zentrierung */
  margin: 0 auto; /* Container wird auf der Seite zentriert */
}

/* Canvas-Element für das Diagramm */
canvas {
  max-width: 100%; /* Verhindert, dass das Diagramm breiter als der Container wird */
  max-height: 100%; /* Verhindert, dass das Diagramm höher als der Container wird */
}
</style>
