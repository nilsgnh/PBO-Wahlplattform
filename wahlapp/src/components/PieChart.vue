<template>
  <div class="pie-chart-container">
    <!-- Canvas für das Tortendiagramm, das mit Chart.js gerendert wird -->
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'; // Vue hooks für das Lebenszyklusmanagement und die Definition von Reaktivität
import { useChartComposable } from '../composables/useChartComposable'; // Importiert eine benutzerdefinierte Funktion zum Erstellen des Diagramms

// Definiert die Props für diese Komponente, damit der Diagrammtyp ('ergebnisse' oder 'gewinneUndVerluste') übergeben werden kann
const props = defineProps({
  chartType: { 
    type: String as () => 'ergebnisse' | 'gewinneUndVerluste', // Nur diese beiden Werte sind zulässig
    required: true, // Diese Eigenschaft ist erforderlich
    default: 'ergebnisse' // Standardwert ist 'ergebnisse'
  },
});

// Referenz auf das HTML-Canvas-Element, in dem das Diagramm gezeichnet wird
const pieChart = ref<HTMLCanvasElement | null>(null);

// Importierte Funktion, die den Chart erstellt
const { createChart } = useChartComposable();

// Der onMounted Hook wird verwendet, um den Chart zu erstellen, sobald die Komponente gemountet wurde
onMounted(() => {
  if (pieChart.value) { // Sicherstellen, dass das Canvas-Element vorhanden ist
    // Ruft die Funktion zum Erstellen des Charts auf, je nach übergebenem 'chartType'
    createChart(props.chartType, pieChart.value, 'pie'); // Erstellt ein Tortendiagramm
  }
});
</script>

<style scoped>
/* Styling für den Container des Diagramms */
.pie-chart-container {
  width: 80%; /* Container nimmt 80% der Breite ein */
  height: 500px; /* Höhe des Containers auf 500px setzen */
  display: flex; /* Flexbox-Layout für zentrierte Ausrichtung */
  justify-content: center; /* Horizontale Zentrierung */
  align-items: center; /* Vertikale Zentrierung */
  margin: 0 auto; /* Automatische horizontale Ränder für Zentrierung */
}

/* Canvas innerhalb des Containers soll die maximal verfügbare Breite und Höhe einnehmen */
canvas {
  max-width: 100%; /* Maximale Breite auf 100% setzen */
  max-height: 100%; /* Maximale Höhe auf 100% setzen */
}
</style>
