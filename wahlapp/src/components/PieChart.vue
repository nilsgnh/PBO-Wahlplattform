<template>
    <div class="pie-chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useErgebnisStore } from '../stores/ErgebnisStore'; // Store importieren
  import {
    Chart,
    PieController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Chart.js Komponenten registrieren
  Chart.register(PieController, ArcElement, Title, Tooltip, Legend);
  
  // Zugriff auf den ErgebnisStore
  const ergebnisStore = useErgebnisStore();
  
  // Referenz für das Canvas-Element
  const pieChart = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (pieChart.value) {
      new Chart(pieChart.value, {
        type: 'pie',
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
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true },
          },
        },
      });
    }
  });
  </script>
  
  <style scoped>
  .pie-chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  