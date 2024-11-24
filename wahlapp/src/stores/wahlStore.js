import { defineStore } from 'pinia';

export const useWahlStore = defineStore('wahl', {
  state: () => ({
    selectedErststimme: null, // Speichert die Erststimme
    selectedZweitstimme: null, // Speichert die Zweitstimme
    parteien: [
      { id: 1, name: "CDU", text: "Christlich Demokratische Union", num: 1 },
      { id: 2, name: "SPD", text: "Sozialdemokratische Partei Deutschlands", num: 2 },
      { id: 3, name: "Grüne", text: "Bündnis 90/Die Grünen", num: 3 },
      { id: 4, name: "FDP", text: "Freie Demokratische Partei", num: 4 },
      { id: 5, name: "Linke", text: "Die Linke", num: 5 },
      { id: 6, name: "AfD", text: "Alternative für Deutschland", num: 6 },
    ],
    listenplaetze: [
      { id: 1, name: "Mustermann, Max", text: "Lehrer, CDU", num: 1 },
      { id: 2, name: "Müller, Anna", text: "Ärztin, SPD", num: 2 },
      { id: 3, name: "Schmidt, Peter", text: "Umweltaktivist, Grüne", num: 3 },
      { id: 4, name: "Fischer, Lena", text: "Juristin, FDP", num: 4 },
      { id: 5, name: "Bauer, Karl", text: "Sozialpädagoge, Die Linke", num: 5 },
      { id: 6, name: "Schulze, Maria", text: "Unternehmerin, AfD", num: 6 },
    ]
  }),
  actions: {
    setErststimme(stimme) {
      this.selectedErststimme = stimme;
    },
    setZweitstimme(stimme) {
      this.selectedZweitstimme = stimme;
    },
    resetStimmen() {
      this.selectedErststimme = null;
      this.selectedZweitstimme = null;
    },
    getErststimmebyId(id) {
        return this.listenplaetze.find((stimme) => stimme.id === id);
    },
    getZweitstimmebyId(id) {
        return this.parteien.find((stimme) => stimme.id === id);
    },
  }
});
