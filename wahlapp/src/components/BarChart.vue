<template>
  <div class="bar-chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { useErgebnisStore } from '../stores/ErgebnisStore'; // Store importieren
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js Komponenten registrieren
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

// Zugriff auf den ErgebnisStore
const ergebnisStore = useErgebnisStore();

// Definiere eine Property, um zu entscheiden, welche Daten verwendet werden
const props = defineProps({
  chartType: { type: String, required: true, default: 'ergebnisse' }, // 'ergebnisse' oder 'gewinneUndVerluste'
});

// Referenz für das Canvas-Element
const barChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  // Dynamische Auswahl der Daten basierend auf der `chartType` Property
  const chartData = props.chartType === 'gewinneUndVerluste'
    ? ergebnisStore.gewinneUndVerluste
    : ergebnisStore.ergebnisse;

  if (barChart.value) {
    new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: chartData.chartLabels, // Labels aus dem Store
        datasets: [
          {
            label: props.chartType === 'gewinneUndVerluste' ? 'Gewinne und Verluste (%)' : 'Ergebnisse (%)',
            data: chartData.chartData, // Daten aus dem Store
            backgroundColor: chartData.chartColors, // Farben aus dem Store
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y', // Horizontale Balkendiagramme
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value + '%',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 400px;
}
</style>
