// stores/ErgebnisStore.js

import { defineStore } from 'pinia';

export const useErgebnisStore = defineStore('ergebnis', {
  state: () => ({
    chartLabels: ['SPD', 'Union', 'Grüne', 'FDP', 'AfD', 'Linke', 'FW', 'Tierschutz', 'Basis', 'Sonst.'],
    chartData: [25.7, 24.1, 14.8, 11.5, 10.3, 4.9, 2.4, 1.5, 1.4, 3.4],
    chartColors: [
      '#e4002b', '#000000', '#5fbc34', '#ffcd00', '#e60012',
      '#ff5d97', '#00b0d1', '#f7b500', '#b53f5f', '#808080',
    ],
  }),
  actions: {
    setChartData(data) {
      this.chartData = data;
    },
    setChartLabels(labels) {
      this.chartLabels = labels;
    },
    setChartColors(colors) {
      this.chartColors = colors;
    },
  },
});
