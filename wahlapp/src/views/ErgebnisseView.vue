<template>
  <div id="ergebnisse">
    <h1 class="title">Wahlergebnisse</h1>

    <!-- Bar Chart -->
    <div class="chart-container">
      <canvas id="barChart"></canvas>
    </div>

    <!-- Line Chart -->
    <div class="chart-container">
      <canvas id="lineChart"></canvas>
    </div>

    <!-- Pie Chart -->
    <div class="chart-container">
      <canvas id="pieChart"></canvas>
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
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Votes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['#4caf50', '#2196f3', '#f44336', '#ffc107', '#9c27b0'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
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
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            label: 'Results',
            data: [30, 50, 20],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
          },
        ],
      },
      options: {
        responsive: true,
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
