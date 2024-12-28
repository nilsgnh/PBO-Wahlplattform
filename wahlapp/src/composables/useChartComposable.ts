import { ref } from 'vue';
import { useErgebnisStore } from '../stores/ErgebnisStore'; // Importiere den Store
import { Chart } from 'chart.js'; // Importiere die Chart.js Klasse
import { CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importiere die benötigten Chart.js Komponenten
import { PieController, ArcElement } from 'chart.js'; // Importiere die Komponenten für das Tortendiagramm

// Registrierung der Chart.js-Komponenten
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend, PieController, ArcElement);

export const useChartComposable = () => {
  const ergebnisStore = useErgebnisStore(); // Hole den ErgebnisStore

  // Funktion zur Erstellung des Diagramms
  const createChart = (chartType: 'ergebnisse' | 'gewinneUndVerluste', chartCanvas: HTMLCanvasElement, chartTypeCanvas: 'bar' | 'pie') => {
    // Wähle die Daten basierend auf dem 'chartType'
    const chartData = chartType === 'gewinneUndVerluste' ? ergebnisStore.gewinneUndVerluste : ergebnisStore.ergebnisse;

    // Erstelle das Diagramm mit Chart.js
    new Chart(chartCanvas, {
      type: chartTypeCanvas, // Setzt den Diagrammtyp dynamisch (Balken oder Torte)
      data: {
        labels: chartData.chartLabels,
        datasets: [
          {
            label: chartType === 'gewinneUndVerluste' ? 'Gewinne und Verluste (%)' : 'Ergebnisse (%)',
            data: chartData.chartData,
            backgroundColor: chartData.chartColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: chartTypeCanvas === 'pie' ? true : false }, // Zeigt die Legende nur bei Tortendiagramm
          tooltip: { enabled: true },
        },
        scales: chartTypeCanvas === 'bar' ? {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value + '%', // Fügt ein Prozentzeichen zu den Werten auf der X-Achse hinzu
            },
          },
          y: {
            beginAtZero: true,
          },
        } : undefined, // Keine Achsen für das Tortendiagramm
      },
    });
  };

  return { createChart };
};
