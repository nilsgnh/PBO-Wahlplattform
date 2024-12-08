// stores/ErgebnisStore.js

import { defineStore } from 'pinia';

export const useErgebnisStore = defineStore('ergebnis', {
  state: () => ({
    // Daten für die Wahlergebnisse
    ergebnisse: {
      chartLabels: ['SPD', 'Union', 'Grüne', 'FDP', 'AfD', 'Linke', 'FW', 'Tierschutz', 'Basis', 'Sonst.'],
      chartData: [25.7, 24.1, 14.8, 11.5, 10.3, 4.9, 2.4, 1.5, 1.4, 3.4],
      chartColors: [
        '#e4002b', '#000000', '#5fbc34', '#ffcd00', '#e60012',
        '#ff5d97', '#00b0d1', '#f7b500', '#b53f5f', '#808080',
      ],
    },
    
    // Daten für Gewinne und Verluste
    gewinneUndVerluste: {
      chartLabels: ['SPD', 'AfD', 'CDU', 'Grüne', 'Linke', 'BVB/FW', 'BSW', 'Andere'],
      chartData: [4.7, 5.7, -3.5, -6.6, -7.7, -2.5, 13.5, -3.6],
      chartColors: [
        '#ff9999', '#5dd9c1', '#000000', '#5fbc34', '#ff4444', '#ffa500', '#9a59b5', '#808080',
      ],
    },
  }),

  actions: {
    // Methode zum Setzen der Wahlergebnisse
    setErgebnisse(data) {
      this.ergebnisse.chartData = data.chartData;
      this.ergebnisse.chartLabels = data.chartLabels;
      this.ergebnisse.chartColors = data.chartColors;
    },

    // Methode zum Setzen der Gewinne und Verluste
    setGewinneUndVerluste(data) {
      this.gewinneUndVerluste.chartData = data.chartData;
      this.gewinneUndVerluste.chartLabels = data.chartLabels;
      this.gewinneUndVerluste.chartColors = data.chartColors;
    },

    // Methode zum Exportieren der Wahlergebnisse
    exportErgebnisse() {
      return {
        labels: this.ergebnisse.chartLabels,
        data: this.ergebnisse.chartData,
        colors: this.ergebnisse.chartColors,
      };
    },

    // Methode zum Exportieren der Gewinne und Verluste
    exportGewinneUndVerluste() {
      return {
        labels: this.gewinneUndVerluste.chartLabels,
        data: this.gewinneUndVerluste.chartData,
        colors: this.gewinneUndVerluste.chartColors,
      };
    },
  },
});
