<template>
  <div class="bar-chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

// Referenz für das Canvas-Element
const barChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (barChart.value) {
    new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: ergebnisStore.chartLabels, // Labels aus dem Store
        datasets: [
          {
            data: ergebnisStore.chartData, // Daten aus dem Store
            backgroundColor: ergebnisStore.chartColors, // Farben aus dem Store
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
