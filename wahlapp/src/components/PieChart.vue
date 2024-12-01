<template>
    <div class="pie-chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, defineProps } from 'vue';
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
  
  // Definiere eine Property, um zu entscheiden, welche Daten verwendet werden
  const props = defineProps({
    chartType: { type: String, required: true, default: 'ergebnisse' }, // 'ergebnisse' oder 'gewinneUndVerluste'
  });
  
  // Referenz für das Canvas-Element
  const pieChart = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    // Dynamische Auswahl der Daten basierend auf der `chartType` Property
    const chartData = props.chartType === 'gewinneUndVerluste'
      ? ergebnisStore.gewinneUndVerluste
      : ergebnisStore.ergebnisse;
  
    if (pieChart.value) {
      new Chart(pieChart.value, {
        type: 'pie',
        data: {
          labels: chartData.chartLabels, // Labels aus dem Store
          datasets: [
            {
              data: chartData.chartData, // Daten aus dem Store
              backgroundColor: chartData.chartColors, // Farben aus dem Store
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
    width: 80%; /* 80% der Containerbreite */
    height: 500px; /* Größere Höhe für das Diagramm */
    display: flex;
    justify-content: center; /* Horizontal zentrieren */
    align-items: center; /* Vertikal zentrieren */
    margin: 0 auto; /* Zentrieren des Containers auf der Seite */
  }
  
  canvas {
    max-width: 100%; /* Sicherstellen, dass das Diagramm nicht überläuft */
    max-height: 100%; /* Sicherstellen, dass das Diagramm nicht überläuft */
  }
  </style>
  