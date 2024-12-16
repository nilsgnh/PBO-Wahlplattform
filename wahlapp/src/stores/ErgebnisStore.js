// stores/ErgebnisStore.js

import { defineStore } from 'pinia';

export const useErgebnisStore = defineStore('ergebnis', {
  state: () => ({
    // Daten für die Wahlergebnisse
    ergebnisse: {
      chartLabels: ['SPD', 'Union', 'Grüne', 'FDP', 'AfD', 'Linke', 'FW', 'Tierschutz', 'Basis', 'Sonst.'],
      chartData: [25.7, 24.1, 14.8, 11.5, 10.3, 4.9, 2.4, 1.5, 1.4, 3.4],
      chartColors: [
        '#E3000F', // SPD - Rot
        '#000000', // Union (CDU/CSU) - Schwarz
        '#1DBD00', // Grüne - Grün
        '#FFCC00', // FDP - Gelb
        '#009EE0', // AfD - Blau
        '#BE3075', // Linke - Magenta
        '#2D6AA1', // FW (Freie Wähler) - Dunkelblau
        '#FF7700', // Tierschutzpartei - Orange
        '#6A5ACD', // Basis - Lila (Individuell, da keine Standardfarbe)
        '#808080', // Sonstige - Grau
      ],
    },

    // Daten für Gewinne und Verluste
    gewinneUndVerluste: {
      chartLabels: ['SPD', 'AfD', 'CDU', 'Grüne', 'Linke', 'FW', 'Andere'],
      chartData: [4.7, 5.7, -3.5, -6.6, -7.7, -2.5, -3.6],
      chartColors: [
        '#E3000F', // SPD - Rot
        '#009EE0', // AfD - Blau
        '#000000', // CDU - Schwarz
        '#1DBD00', // Grüne - Grün
        '#BE3075', // Linke - Magenta
        '#2D6AA1', // FW (Freie Wähler) - Dunkelblau
        '#808080', // Andere - Grau
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
