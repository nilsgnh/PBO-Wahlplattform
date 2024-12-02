import { defineStore } from 'pinia';
import { ref } from "vue";

export const useStatesStore = defineStore('states', {
  state: () => ({
    verifiziert: ref(false),
    gewaehlt: ref(false),
  }),
  actions: {
    submitWahl() { /* Hier könnten Stimmen an Server gesendet werden */
      this.gewaehlt = true;
      /* erweitertes todo: Eintragen der Stimmen in eine Datenbank */
    }
  }
});
