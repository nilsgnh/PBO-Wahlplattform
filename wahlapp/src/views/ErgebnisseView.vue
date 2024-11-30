<template>
  <div id="ergebnisse">
    <h1 class="title">Wahlergebnisse 2021</h1>

    <!-- Bar Chart -->
    <div class="chart-container">
      <h2>Stimmenverteilung der Parteien</h2>
      <canvas id="barChart"></canvas>
    </div>

    <!-- Pie Chart -->
    <div class="chart-container">
      <h2>Wahlverteilung nach Parteien</h2>
      <canvas id="pieChart"></canvas>
    </div>

    <!-- Bar Chart 2 -->
    <div class="chart-container">
      <h2>Gewinne und Verluste der Parteien</h2>
      <canvas id="barChart2"></canvas>
    </div>

        <!-- Line Chart -->
        <div class="chart-container">
      <h2>Täglicher Fortschritt</h2>
      <canvas id="lineChart"></canvas>
    </div>
  </div>
</template>



<script setup lang="ts">
import { onMounted } from 'vue';
import { Chart } from 'chart.js';

onMounted(() => {
  // Bar Chart
  const barChartCtx = document.getElementById('barChart') as HTMLCanvasElement;
if (barChartCtx) {
  new Chart(barChartCtx, {
    type: 'bar',
    data: {
      labels: ['SPD', 'Union', 'Grüne', 'FDP', 'AfD', 'Linke', 'FW', 'Tierschutz', 'Basis', 'Sonst.'], // Party names as labels
      datasets: [
        {
          data: [25.7, 24.1, 14.8, 11.5, 10.3, 4.9, 2.4, 1.5, 1.4, 3.4], // Vote percentages
          backgroundColor: [
            '#e4002b', '#000000', '#5fbc34', '#ffcd00', '#e60012', '#ff5d97', '#00b0d1', '#f7b500', '#b53f5f', '#808080'
          ], // Party colors
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y', // Horizontal bars, so we use the y-axis for labels
      plugins: {
        legend: { display: false }, // Hide the legend
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          beginAtZero: true, // Ensure the x-axis starts at 0
          ticks: {
            callback: function(value) {
              return value + '%'; // Display percentages on x-axis
            }
          }
        },
        y: {
          beginAtZero: true, // Start the y-axis at 0
        },
      },
    },
  });
}





  // Line Chart
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

// Pie Chart
const pieChartCtx = document.getElementById('pieChart') as HTMLCanvasElement;
if (pieChartCtx) {
  new Chart(pieChartCtx, {
    type: 'pie',
    data: {
      labels: ['SPD', 'AFD', 'CDU', 'Grüne', 'Linke', 'BVB/FW', 'BSW', 'Andere'], // Party names
      datasets: [
        {
          label: 'Landtagwahl Brandenburg 2024', // Label for the chart
          data: [30.9, 29.2, 12.1, 4.1, 3.0, 2.6, 13.5, 4.6], // Vote percentages
          backgroundColor: [
            '#ff6384', // SPD - Pink
            '#36a2eb', // AFD - Blue
            '#000000', // CDU - Black
            '#4bc0c0', // Grüne - Teal
            '#ffcd56', // Linke - Yellow
            '#ff7f00', // BVB/FW - Orange
            '#9b59b6', // BSW - Purple
            '#grey'     // Andere - Grey
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }, // Position legend at the bottom
      },
    },
  });
}

const barChartCtx2 = document.getElementById('barChart2') as HTMLCanvasElement;
if (barChartCtx2) {
  new Chart(barChartCtx2, {
    type: 'bar',
    data: {
      labels: ['SPD', 'AfD', 'CDU', 'Grüne', 'Linke', 'BVB/FW', 'BSW', 'Andere'], // Parteien als Labels
      datasets: [
        {
          label: 'Gewinne und Verluste (%)',
          data: [4.7, 5.7, -3.5, -6.6, -7.7, -2.5, 13.5, -3.6], // Gewinne und Verluste
          backgroundColor: [
            '#ff9999', // SPD
            '#5dd9c1', // AfD
            '#000000', // CDU
            '#5fbc34', // Grüne
            '#ff4444', // Linke
            '#ffa500', // BVB/FW
            '#9a59b5', // BSW
            '#808080', // Andere
          ],
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'x', // Horizontale Darstellung
      plugins: {
        legend: { display: false }, // Keine Legende
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          beginAtZero: true, // Werte bei 0 beginnen
          ticks: {
            autoSkip: false, // Alle Labels anzeigen
          },
        },
        y: {
          beginAtZero: true, // Y-Achse bei 0 beginnen
          ticks: {
            stepSize: 5, // Schrittweite 5
          },
        },
      },
    },
  });
}



});




</script>

<style scoped>
#ergebnisse {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  height: 100%;
}

.chart-container {
  width: 80%;
  max-width: 600px;
}
</style>
