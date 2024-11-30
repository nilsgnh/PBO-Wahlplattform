<script setup>
import WahlInfoBox from "@/components/WahlInfoBox.vue";
import { useWahlStore } from "@/stores/wahlStore"; // Importiere den Store

const store = useWahlStore();

</script>

<template>
  <p class="pb-5">Bitte bestätigen Sie Ihre Wahl</p>
  <hr>
  <p class="pt-5"> Sie haben folgende Stimmen abgegeben:</p>
  <!-- Erststimme -->
  <WahlInfoBox
    title="Erststimme"
    :description="store.getErststimmebyId(store.selectedErststimme)?.text || 'Keine Stimme ausgewählt'"
    :detail="store.getErststimmebyId(store.selectedErststimme)?.name || '-'"
  />

  <!-- Zweitstimme -->
  <WahlInfoBox
    title="Zweitstimme"
    :description="store.getZweitstimmebyId(store.selectedZweitstimme)?.text || 'Keine Stimme ausgewählt'"
    :detail="store.getZweitstimmebyId(store.selectedZweitstimme)?.name || '-'"
  />
  <p class="font-bold pt-10 pb-5"> Sicherheitsinformationen </p>
  <p class="pb-5 pt-5"> Ihr Wahl wird sicher und anonym verarbeitet. Mit dem Klick auf "Bestätigen" ist die getroffene Auswahl nicht mehr änderbar. </p>
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="sicherheits-check"
      v-model="store.checkboxAgreed"
      class="checkbox"
    />
    <label for="sicherheits-check" class="checkbox-label">
      Ich habe die Sicherheitsinformationen gelesen und stimme zu.
    </label>
  </div>
</template>

<style scoped>

</style>
