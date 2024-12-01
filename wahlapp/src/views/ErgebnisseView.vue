<template>
  <div class="chart-container">
    <!-- Wahlstimmen Balkendiagramm -->
    <section class="chart-section">
      <h2>Wahlstimmen (Balkendiagramm)</h2>
      <BarChart :chartType="'ergebnisse'" />
    </section>

    <!-- Landtagwahl Brandenburg 2024 Kreisdiagramm -->
    <section class="chart-section">
      <h2>Landtagwahl Brandenburg 2024 (Kreisdiagramm)</h2>
      <PieChart :chartType="'ergebnisse'" />
    </section>

    <!-- Gewinne und Verluste Balkendiagramm -->
    <section class="chart-section">
      <h2>Gewinne und Verluste (Balkendiagramm)</h2>
      <BarChart :chartType="'gewinneUndVerluste'" />
    </section>

    <!-- Wochentagsfortschritt Liniendiagramm -->
    <section class="chart-section">
      <h2>Wochentagsfortschritt (Liniendiagramm)</h2>
      <LineChart />
    </section>
  </div>
</template>

<script setup lang="ts">
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
</script>

<style scoped>
/* Container für alle Diagramme */
.chart-container {
  display: flex;
  flex-direction: column;
  gap: 40px; /* Größere Abstände zwischen den Diagrammen */
  align-items: center;
  padding: 20px; /* Etwas Innenabstand für das Layout */
}

/* Abschnitt für jedes Diagramm */
.chart-section {
  width: 100%;
  max-width: 900px; /* Maximalbreite für Diagramme */
  text-align: center; /* Zentriert die Überschrift */
  transition: transform 0.3s ease; /* Sanfter Übergang für den Hover-Effekt */
}

.chart-section:hover {
  transform: scale(1.12); /* Leichtes Vergrößern bei Hover */
}

/* Canvas Styling */
.chart-container canvas {
  width: 100%;
  max-width: 800px; /* Maximalbreite für das Canvas */
  height: auto;
  margin-top: 20px; /* Abstand zwischen Diagramm und Überschrift */
}

/* Stil für die Diagrammüberschriften */
.chart-section h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px; /* Abstand zwischen Überschrift und Diagramm */
  color: #333; /* Dunklere Farbe für bessere Lesbarkeit */
}

/* Media Query für mobile Ansicht */
@media (max-width: 600px) {
  .chart-container {
    padding: 10px; /* Weniger Innenabstand auf kleinen Geräten */
  }
  .chart-section h2 {
    font-size: 1.2em; /* Kleinere Schrift auf mobilen Geräten */
  }
}
</style>
