<template>
  <div class="line-chart-container">
    <!-- Canvas-Element für das Liniendiagramm -->
    <canvas ref="lineChart"></canvas> <!-- Ref wird verwendet, um das Canvas im Script zu referenzieren -->
  </div>
</template>

  
<script setup lang="ts">
import { onMounted, ref } from 'vue'; // Vue-Hooks für Lifecycle-Methoden und Reaktivität importieren
import {
  Chart, // Hauptklasse für Diagrammerstellung
  LineController, // Steuerung für Liniendiagramme
  LineElement, // Linienkomponenten für das Diagramm
  PointElement, // Punkte auf der Linie
  Title, // Diagrammtitel
  Tooltip, // Tooltip für Interaktivität
  Legend, // Legende für das Diagramm
  CategoryScale, // Skala für Kategorien (X-Achse)
  LinearScale // Skala für lineare Werte (Y-Achse)
} from 'chart.js';

// Chart.js Komponenten global registrieren
Chart.register(
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

// Referenz für das Canvas-Element, in dem das Diagramm gezeichnet wird
const lineChart = ref<HTMLCanvasElement | null>(null);

// Lifecycle-Methode: Wird ausgeführt, nachdem die Komponente ins DOM gemountet wurde
onMounted(() => {
  if (lineChart.value) { // Prüfen, ob die Referenz existiert
    // Erstellung eines neuen Chart.js-Diagramms
    new Chart(lineChart.value, {
      type: 'line', // Typ des Diagramms: Liniendiagramm
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Beschriftung für die X-Achse
        datasets: [
          {
            label: 'Progress', // Beschriftung für die Legende
            data: [10, 15, 12, 17, 20], // Werte für die Y-Achse
            borderColor: '#42a5f5', // Farbe der Linie
            backgroundColor: 'rgba(66, 165, 245, 0.2)', // Transparente Hintergrundfarbe unter der Linie
            fill: true, // Bereich unter der Linie ausfüllen
          },
        ],
      },
      options: {
        responsive: true, // Diagramm passt sich an die Größe des Containers an
        plugins: {
          legend: { display: true }, // Legende anzeigen
        },
      },
    });
  }
});
</script>

  
<style scoped>
/* Container für das Liniendiagramm */
.line-chart-container {
  width: 100%; /* Breite des Containers auf 100% des übergeordneten Elements setzen */
  height: 400px; /* Feste Höhe für das Diagramm */
}
</style>

  