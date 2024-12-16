<template>
  <div class="chart-container">
    <!-- Linker Bereich mit dem Button, zeigt den Linkspfeil für Navigation -->
    <div class="button-area left">
      <!-- Der Button 'left' navigiert zurück -->
      <ButtonSlide :buttonType="'left'" @navigate="handleNavigation" />
    </div>

    <!-- Mittlerer Bereich für das Diagramm -->
    <div class="chart-area">
      <!-- Abschnitt für das erste Diagramm (Wahlergebnisse 2021 im Balkendiagramm) -->
      <section class="chart-section" v-if="currentChart === 0">
        <h2>Wahlergebnisse 2021</h2>
        <BarChart :chartType="'ergebnisse'" />
      </section>

      <!-- Abschnitt für das zweite Diagramm (Wahlergebnisse 2021 im Kreisdiagramm) -->
      <section class="chart-section" v-else-if="currentChart === 1">
        <h2>Wahlergebnisse 2021</h2>
        <PieChart :chartType="'ergebnisse'" />
      </section>

      <!-- Abschnitt für das dritte Diagramm (Gewinne und Verluste im Balkendiagramm) -->
      <section class="chart-section" v-else-if="currentChart === 2">
        <h2>Gewinne und Verluste</h2>
        <BarChart :chartType="'gewinneUndVerluste'" />
      </section>

      <!-- Abschnitt für das vierte Diagramm (Beispiel Liniendiagramm) -->
      <section class="chart-section" v-else-if="currentChart === 3">
        <h2>Liniendiagramm Beispiel</h2>
        <LineChart />
      </section>
    </div>

    <!-- Rechter Bereich mit dem Button, zeigt den Rechtspfeil für Navigation -->
    <div class="button-area right">
      <!-- Der Button 'right' navigiert vorwärts -->
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

// Ref für den Index des aktuellen Diagramms
// 0 = erstes Diagramm, 1 = zweites Diagramm, usw.
const currentChart = ref(0);

// Anzahl der verfügbaren Diagramme (wird für die Navigation genutzt)
const totalCharts = 4;

// Funktion zur Navigation zwischen Diagrammen
const handleNavigation = (direction: 'next' | 'previous') => {
  // Navigation nach rechts (zum nächsten Diagramm)
  if (direction === 'next') {
    // Geht zum nächsten Diagramm und springt von der letzten Position wieder zur ersten
    currentChart.value = (currentChart.value + 1) % totalCharts;
  } 
  // Navigation nach links (zum vorherigen Diagramm)
  else if (direction === 'previous') {
    // Geht zum vorherigen Diagramm und springt von der ersten Position wieder zur letzten
    currentChart.value =
      (currentChart.value - 1 + totalCharts) % totalCharts; // % stellt sicher, dass der Index positiv bleibt
  }
};
</script>



<style scoped>
/* Hauptcontainer für die gesamte Chart-Komponente */
.chart-container {
  display: flex; /* Setzt flexibles Layout für Ausrichtung der Inhalte */
  align-items: center; /* Zentriert Inhalte vertikal */
  justify-content: space-between; /* Buttons und Diagramme gleichmäßig verteilen */
  width: 100%; /* Nimmt volle Breite des Elternelements ein */
  max-width: 1980px; /* Begrenzung der maximalen Breite */
  height: 600px; /* Feste Höhe für Layout-Stabilität */
  padding: 20px; /* Innenabstand */
  box-sizing: border-box; /* Inklusive Padding in die Breite/Höhe */
  position: relative; /* Ermöglicht absolute Positionierung von Buttons */
  overflow: hidden; /* Verhindert, dass Inhalte aus dem Container hinausragen */
  margin: 0 auto; /* Zentriert den Container horizontal */
}

/* Bereich für die Buttons (links und rechts) */
.button-area {
  display: flex; /* Flexibles Layout für die Buttons */
  align-items: center; /* Zentriert Buttons vertikal */
  justify-content: center; /* Zentriert Buttons horizontal */
  width: 10%; /* Feste Breite für den Button-Bereich */
}

/* Linker Button-Bereich: Buttons werden links ausgerichtet */
.left {
  justify-content: flex-start;
}

/* Rechter Button-Bereich: Buttons werden rechts ausgerichtet */
.right {
  justify-content: flex-end;
}

/* Bereich für das Diagramm */
.chart-area {
  flex-grow: 1; /* Nimmt verbleibenden Platz im Container ein */
  text-align: center; /* Zentriert Diagramme horizontal */
  display: flex; /* Flexibles Layout */
  justify-content: center; /* Zentriert Inhalte horizontal */
  align-items: center; /* Zentriert Inhalte vertikal */
}

/* Styling für die einzelnen Diagramm-Abschnitte */
.chart-section {
  width: 100%; /* Volle Breite des Diagramm-Bereichs */
  max-width: 900px; /* Begrenzung der maximalen Breite */
  transition: transform 0.3s ease; /* Sanfter Hover-Effekt */
}

/* Hover-Effekt: Vergrößert das Diagramm leicht */
.chart-section:hover {
  transform: scale(1.12);
}

/* Styling für Diagramme, die in einem Canvas gerendert werden */
.chart-container canvas {
  width: 100%; /* Volle Breite */
  max-width: 800px; /* Begrenzung der Breite */
  height: auto; /* Höhe passt sich proportional zur Breite an */
  margin-top: 20px; /* Abstand zur Überschrift */
}

/* Styling für die Überschriften der Diagramme */
.chart-section h2 {
  font-size: 1.5em; /* Größere Schrift für bessere Lesbarkeit */
  font-weight: bold; /* Fettschrift */
  margin-bottom: 10px; /* Abstand zwischen Überschrift und Diagramm */
  color: #333; /* Dunklere Schriftfarbe für Kontrast */
}

/* Anpassungen für mobile Ansichten */
@media (max-width: 600px) {
  .chart-container {
    flex-direction: column; /* Stellt Inhalte untereinander dar */
    align-items: stretch; /* Streckt den Container */
    padding: 10px; /* Reduziertes Padding */
  }

  .button-area {
    width: 100%; /* Buttons nehmen die volle Breite ein */
    margin-bottom: 10px; /* Abstand zwischen Buttons und Diagramm */
  }

  .chart-area {
    width: 100%; /* Nimmt die volle Breite des Containers ein */
    max-width: none; /* Entfernt die Begrenzung der Breite */
  }
}
</style>
