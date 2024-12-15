<template>
  <div class="bar-chart-container">
    <!-- Canvas-Element für das Balkendiagramm -->
    <canvas ref="barChart"></canvas> <!-- Referenziert im Script für die Diagrammerstellung -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { useErgebnisStore } from '../stores/ErgebnisStore'; // Store für die Diagrammdaten importieren
import {
  Chart, // Hauptklasse für Diagrammerstellung
  CategoryScale, // Skalierung für die X-Achse (Kategorien)
  LinearScale, // Skalierung für die Y-Achse (lineare Werte)
  BarController, // Steuerung für Balkendiagramme
  BarElement, // Balkenelemente
  Title, // Titel des Diagramms
  Tooltip, // Tooltip für Interaktivität
  Legend, // Legende für das Diagramm
} from 'chart.js';

// Registrierung der Chart.js-Komponenten
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// Zugriff auf den ErgebnisStore, der die Labels, Daten und Farben bereitstellt
const ergebnisStore = useErgebnisStore();

// Eingabe-Property (Props) für die Komponente
// 'chartType' entscheidet, ob die 'ergebnisse' oder 'gewinneUndVerluste' verwendet werden
const props = defineProps({
  chartType: { 
    type: String, // Typ der Eingabe: String
    required: true, // Die Property ist erforderlich
    default: 'ergebnisse', // Standardwert: 'ergebnisse'
  },
});

// Referenz für das Canvas-Element, in dem das Diagramm gerendert wird
const barChart = ref<HTMLCanvasElement | null>(null);

// Lifecycle-Hook: Wird ausgeführt, nachdem die Komponente ins DOM gemountet wurde
onMounted(() => {
  // Auswahl der Daten basierend auf der 'chartType'-Property
  const chartData = props.chartType === 'gewinneUndVerluste'
    ? ergebnisStore.gewinneUndVerluste // Daten für Gewinne und Verluste
    : ergebnisStore.ergebnisse; // Daten für die Wahlergebnisse

  if (barChart.value) { // Prüfen, ob das Canvas-Element existiert
    // Erstellung eines neuen Balkendiagramms mit Chart.js
    new Chart(barChart.value, {
      type: 'bar', // Typ des Diagramms: Balkendiagramm
      data: {
        labels: chartData.chartLabels, // Beschriftungen der Y-Achse aus dem Store
        datasets: [
          {
            label: props.chartType === 'gewinneUndVerluste' 
              ? 'Gewinne und Verluste (%)' // Label für Gewinne und Verluste
              : 'Ergebnisse (%)', // Label für Wahlergebnisse
            data: chartData.chartData, // Datenwerte aus dem Store
            backgroundColor: chartData.chartColors, // Farben für die Balken aus dem Store
          },
        ],
      },
      options: {
        responsive: true, // Diagramm passt sich der Größe des Containers an
        indexAxis: 'y', // Horizontale Balkendiagramme
        plugins: {
          legend: { display: false }, // Legende wird ausgeblendet
          tooltip: { enabled: true }, // Tooltip wird aktiviert
        },
        scales: {
          x: {
            beginAtZero: true, // X-Achse beginnt bei 0
            ticks: {
              // Fügt '%' zu den Werten auf der X-Achse hinzu
              callback: (value) => value + '%',
            },
          },
          y: {
            beginAtZero: true, // Y-Achse beginnt bei 0
          },
        },
      },
    });
  }
});
</script>

<style scoped>
/* Container für das Balkendiagramm */
.bar-chart-container {
  width: 100%; /* Nimmt die volle Breite des übergeordneten Elements ein */
  height: 400px; /* Feste Höhe für das Diagramm */
}
</style>
