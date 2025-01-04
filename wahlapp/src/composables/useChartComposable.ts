import { ref } from 'vue'; // Importiert ref aus Vue für reaktive Daten
import { useErgebnisStore } from '../stores/ErgebnisStore'; // Importiert den ErgebnisStore, um auf die gespeicherten Daten zuzugreifen
import { Chart } from 'chart.js'; // Importiert die Chart.js-Klasse, um Diagramme zu erstellen
import { CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importiert spezifische Chart.js-Komponenten für Balkendiagramme
import { PieController, ArcElement } from 'chart.js'; // Importiert spezifische Komponenten für Tortendiagramme

// Registriert die Chart.js-Komponenten, damit sie in Diagrammen verwendet werden können
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend, PieController, ArcElement);

export const useChartComposable = () => {
  const ergebnisStore = useErgebnisStore(); // Holt den ErgebnisStore, um Daten für das Diagramm abzurufen

  // Funktion zur Erstellung eines Diagramms
  const createChart = (chartType: 'ergebnisse' | 'gewinneUndVerluste', chartCanvas: HTMLCanvasElement, chartTypeCanvas: 'bar' | 'pie') => {
    // Wählt die Daten basierend auf dem übergebenen 'chartType'
    const chartData = chartType === 'gewinneUndVerluste' ? ergebnisStore.gewinneUndVerluste : ergebnisStore.ergebnisse;

    // Erstellt das Diagramm mit Chart.js
    new Chart(chartCanvas, {
      type: chartTypeCanvas, // Bestimmt den Diagrammtyp (Balken oder Torte) basierend auf chartTypeCanvas
      data: {
        labels: chartData.chartLabels, // Setzt die Bezeichner der Daten
        datasets: [
          {
            label: chartType === 'gewinneUndVerluste' ? 'Gewinne und Verluste (%)' : 'Ergebnisse (%)', // Label für die Datenreihe
            data: chartData.chartData, // Setzt die eigentlichen Diagrammdaten
            backgroundColor: chartData.chartColors, // Setzt die Farben der Balken oder Tortenstücke
          },
        ],
      },
      options: {
        responsive: true, // Macht das Diagramm responsiv
        plugins: {
          legend: { 
            display: chartTypeCanvas === 'pie' ? true : false, // Zeigt die Legende nur bei Tortendiagramm an
          },
          tooltip: { enabled: true }, // Aktiviert die Tooltipps
        },
        // Setzt die Achsen nur für Balkendiagramme
        scales: chartTypeCanvas === 'bar' ? {
          x: {
            beginAtZero: true, // Startet die X-Achse bei 0
            ticks: {
              callback: (value) => value + '%', // Fügt ein Prozentzeichen zu den Werten auf der X-Achse hinzu
            },
          },
          y: {
            beginAtZero: true, // Startet die Y-Achse bei 0
          },
        } : undefined, // Keine Achsen für das Tortendiagramm
      },
    });
  };

  return { createChart }; // Gibt die Funktion 'createChart' zurück, um sie in der Komponente zu verwenden
};
