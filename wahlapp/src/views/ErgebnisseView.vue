<template>
  <div class="chart-container">


    <h2>Wahlstimmen (Balkendiagramm)</h2>
    <BarChart />


    <h2>Wochentagsfortschritt (Liniendiagramm)</h2>
    <canvas id="lineChart"></canvas>


    <h2>Landtagwahl Brandenburg 2024 (Kreisdiagramm)</h2>
    <PieChart />
    <h2>Gewinne und Verluste (Balkendiagramm)</h2>
    <canvas id="barChart2"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useErgebnisStore } from '../stores/ErgebnisStore';
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
// Store verwenden
const ergebnisStore = useErgebnisStore();

// Zugriff auf die Daten aus dem Store
const chartLabels = ergebnisStore.chartLabels;
const chartData = ergebnisStore.chartData;
const chartColors = ergebnisStore.chartColors;
import { onMounted } from 'vue';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController, // Hinzufügen
  BarElement,
  LineController, // Hinzufügen
  LineElement,
  PointElement,
  PieController, // Hinzufügen
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController, // Registrieren
  BarElement,
  LineController, // Registrieren
  LineElement,
  PointElement,
  PieController, // Registrieren
  ArcElement,
  Title,
  Tooltip,
  Legend
);


onMounted(() => {
  // Stimmenverteilung (Horizontal Balkendiagramm)
 

  // Wochentagsfortschritt (Liniendiagramm)
  const lineChartCtx = document.getElementById('lineChart') as HTMLCanvasElement;
  if (lineChartCtx) {
    new Chart(lineChartCtx, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
          {
            label: 'Progress',
            data: [10, 15, 12, 17, 20],
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
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


  // Gewinne und Verluste (Balkendiagramm)
  const barChartCtx2 = document.getElementById('barChart2') as HTMLCanvasElement;
  if (barChartCtx2) {
    new Chart(barChartCtx2, {
      type: 'bar',
      data: {
        labels: ['SPD', 'AfD', 'CDU', 'Grüne', 'Linke', 'BVB/FW', 'BSW', 'Andere'],
        datasets: [
          {
            label: 'Gewinne und Verluste (%)',
            data: [4.7, 5.7, -3.5, -6.6, -7.7, -2.5, 13.5, -3.6],
            backgroundColor: [
              '#ff9999', '#5dd9c1', '#000000', '#5fbc34', '#ff4444', '#ffa500', '#9a59b5', '#808080',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5,
            },
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center; /* Zentriere die Charts */
}

.chart-container canvas {
  width: 80%; /* Passe die Breite flexibel an */
  max-width: 800px; /* Maximalbreite setzen */
  height: auto; /* Höhe automatisch bestimmen */
}
</style>

