<template>
  <div class="bar-chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
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

// Props definieren
const props = defineProps({
  labels: { type: Array, required: true },
  data: { type: Array, required: true },
  backgroundColors: { type: Array, required: true },
});

const barChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (barChart.value) {
    new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: props.labels, // Dynamische Labels
        datasets: [
          {
            data: props.data, // Dynamische Daten
            backgroundColor: props.backgroundColors, // Dynamische Farben
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
