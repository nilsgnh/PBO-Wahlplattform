<template>
  <div class="chart-container">
    <h2>Stimmenverteilung (Horizontal Balkendiagramm)</h2>
    <canvas id="barChart"></canvas>

    <div>
    <h2>Stimmenverteilung (Horizontal Balkendiagramm)</h2>
    <BarChart
      :labels="chartLabels"
      :data="chartData"
      :backgroundColors="chartColors"
    />
  </div>

    <h2>Wochentagsfortschritt (Liniendiagramm)</h2>
    <canvas id="lineChart"></canvas>

    <h2>Landtagwahl Brandenburg 2024 (Kreisdiagramm)</h2>
    <canvas id="pieChart"></canvas>

    <h2>Gewinne und Verluste (Balkendiagramm)</h2>
    <canvas id="barChart2"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useErgebnisStore } from '../stores/ErgebnisStore';
import BarChart from '../components/BarChart.vue';
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
  const barChartCtx = document.getElementById('barChart') as HTMLCanvasElement;
  if (barChartCtx) {
    new Chart(barChartCtx, {
      type: 'bar',
      data: {
        labels: ['SPD', 'Union', 'Grüne', 'FDP', 'AfD', 'Linke', 'FW', 'Tierschutz', 'Basis', 'Sonst.'],
        datasets: [
          {
            data: [25.7, 24.1, 14.8, 11.5, 10.3, 4.9, 2.4, 1.5, 1.4, 3.4],
            backgroundColor: [
              '#e4002b', '#000000', '#5fbc34', '#ffcd00', '#e60012', '#ff5d97', '#00b0d1', '#f7b500', '#b53f5f', '#808080',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

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

  // Landtagwahl Brandenburg 2024 (Kreisdiagramm)
  const pieChartCtx = document.getElementById('pieChart') as HTMLCanvasElement;
  if (pieChartCtx) {
    new Chart(pieChartCtx, {
      type: 'pie',
      data: {
        labels: ['SPD', 'AFD', 'CDU', 'Grüne', 'Linke', 'BVB/FW', 'BSW', 'Andere'],
        datasets: [
          {
            label: 'Landtagwahl Brandenburg 2024',
            data: [30.9, 29.2, 12.1, 4.1, 3.0, 2.6, 13.5, 4.6],
            backgroundColor: [
              '#ff6384', '#36a2eb', '#000000', '#4bc0c0', '#ffcd56', '#ff7f00', '#9b59b6', '#808080',
            ],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: 'bottom' },
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

