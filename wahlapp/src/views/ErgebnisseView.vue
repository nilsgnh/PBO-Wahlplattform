<template>
  <div class="chart-container">
    <!-- Linker Bereich mit dem Button, nur Linkspfeil wird angezeigt -->
    <div class="button-area left">
      <ButtonSlide :buttonType="'left'" @navigate="handleNavigation" />
    </div>

    <!-- Mittlerer Bereich für das Diagramm -->
    <div class="chart-area">
      <section class="chart-section" v-if="currentChart === 0">
        <h2>Wahlergebnisse 2021</h2>
        <BarChart :chartType="'ergebnisse'" />
      </section>

      <section class="chart-section" v-if="currentChart === 1">
        <h2>Wahlergebnisse 2021</h2>
        <PieChart :chartType="'ergebnisse'" />
      </section>

      <section class="chart-section" v-if="currentChart === 2">
        <h2>Gewinne und Verluste</h2>
        <BarChart :chartType="'gewinneUndVerluste'" />
      </section>

      <section class="chart-section" v-if="currentChart === 3">
        <h2>Liniendiagramm Beispiel</h2>
        <LineChart />
      </section>
    </div>

    <!-- Rechter Bereich mit dem Button, nur Rechtspfeil wird angezeigt -->
    <div class="button-area right">
      <ButtonSlide :buttonType="'right'" @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
import ButtonSlide from '@/components/ButtonSlide.vue';

const currentChart = ref(0); // Index des aktuellen Diagramms
const totalCharts = 4; // Gesamtzahl der Diagramme

// Navigation zwischen den Diagrammen
const handleNavigation = (direction: 'next' | 'previous') => {
  if (direction === 'next') {
    currentChart.value = (currentChart.value + 1) % totalCharts;
  } else if (direction === 'previous') {
    currentChart.value =
      (currentChart.value - 1 + totalCharts) % totalCharts; // Sicherstellen, dass der Index positiv bleibt
  }
};
</script>


<style scoped>
/* Container für alle Diagramme */
/* Container für alle Diagramme */
.chart-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* Volle Breite des übergeordneten Elements */
  max-width: 1980px; /* Maximale Breite */
  height: 800px; /* Feste Höhe für Stabilität */
  padding: 20px; /* Etwas Innenabstand für das Layout */
  box-sizing: border-box; /* Sicherstellen, dass Padding berücksichtigt wird */
  position: relative; /* Wichtig, um absolute Positionierung der Buttons zu ermöglichen */
  background-color: #f9f9f9; /* Optional: Hintergrundfarbe für bessere Sichtbarkeit */
  overflow: hidden; /* Verhindert, dass Inhalte außerhalb des Containers angezeigt werden */
  margin: 0 auto; /* Zentriert den Container horizontal */
}


/* Bereich für die Buttons */
.button-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%; /* Feste Breite für den Button-Bereich */
}

.left {
  justify-content: flex-start; /* Linksbündig */
}

.right {
  justify-content: flex-end; /* Rechtsbündig */
}

/* Bereich für das Diagramm */
.chart-area {
  flex-grow: 1;
  text-align: center; /* Zentriert die Diagramme */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Abschnitt für jedes Diagramm */
.chart-section {
  width: 100%;
  max-width: 900px; /* Maximalbreite für Diagramme */
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
    flex-direction: column;
    align-items: stretch;
    padding: 10px; /* Weniger Innenabstand auf kleinen Geräten */
  }

  .button-area {
    width: 100%; /* Volle Breite auf mobilen Geräten */
    margin-bottom: 10px; /* Abstand zwischen Buttons und Diagramm */
  }

  .chart-area {
    width: 100%;
    max-width: none; /* Maximale Breite auf kleinen Geräten anpassen */
  }
}
</style>
