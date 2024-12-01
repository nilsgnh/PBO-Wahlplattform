<template>
    <div class="line-chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
  } from 'chart.js';
  
  // Chart.js Komponenten registrieren
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
  
  // Referenz für das Canvas-Element
  const lineChart = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (lineChart.value) {
      new Chart(lineChart.value, {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Beispielhafte Wochentagslabels
          datasets: [
            {
              label: 'Progress', // Beispielhaftes Label
              data: [10, 15, 12, 17, 20], // Beispielhafte Daten
              borderColor: '#42a5f5', // Farbe der Linie
              backgroundColor: 'rgba(66, 165, 245, 0.2)', // Hintergrundfarbe der Linie
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
        },
      });
    }
  });
  </script>
  
  <style scoped>
  .line-chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  