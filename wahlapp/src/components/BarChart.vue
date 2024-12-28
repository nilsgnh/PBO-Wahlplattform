<template>
  <div class="bar-chart-container">
    <!-- Canvas für das Balkendiagramm, das mit Chart.js gerendert wird -->
    <canvas ref="barChart"></canvas>
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
    default: 'ergebnisse', // Standardwert ist 'ergebnisse'
  },
});

// Referenz auf das HTML-Canvas-Element, in dem das Diagramm gezeichnet wird
const barChart = ref<HTMLCanvasElement | null>(null);

// Importierte Funktion, die den Chart erstellt
const { createChart } = useChartComposable();

// Der onMounted Hook wird verwendet, um den Chart zu erstellen, sobald die Komponente gemountet wurde
onMounted(() => {
  if (barChart.value) { // Sicherstellen, dass das Canvas-Element vorhanden ist
    // Ruft die Funktion zum Erstellen des Charts auf, je nach übergebenem 'chartType'
    createChart(props.chartType, barChart.value, 'bar'); // Erstellt ein Balkendiagramm
  }
});
</script>

<style scoped>
/* Styling für den Container des Diagramms */
.bar-chart-container {
  width: 100%; /* Breite des Containers auf 100% setzen */
  height: 400px; /* Höhe des Containers auf 400px setzen */
}
</style>
