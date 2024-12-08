<script setup>
import WahlInfoBox from "@/components/WahlInfoBox.vue";
import { useWahlStore } from "@/stores/wahlStore"; // Importiere den Store

const store = useWahlStore();

</script>

<template>
  <p class="font-bold">Zusammenfassung</p>
  <p class="pb-5 text-base"> Sie haben folgende Stimmen abgegeben:</p>
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
  <br>
  <hr>
  <p class="font-bold pt-10"> Sicherheitsinformationen </p>
  <p class="pb-3 text-xs">
    <b> 1. </b> {{store.sicherheitsinformationen[2]}} {{store.sicherheitsinformationen[3]}} {{store.sicherheitsinformationen[4]}}
    ({{store.sicherheitsinformationen[0]}} {{store.sicherheitsinformationen[1]}}). <br>
    <b> 2. </b> {{store.sicherheitsinformationen[5]}}
  </p>
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="sicherheits-check"
      v-model="store.checkboxAgreed"
      class="checkbox text-xl"
    />
    <label for="sicherheits-check" class="checkbox-label text-base">
      Ich habe die Sicherheitsinformationen gelesen und stimme zu.
    </label>
  </div>
  <br>
</template>

<style scoped>
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 2px;
  cursor: pointer;
  vertical-align: middle;
}

label.checkbox-label {
  cursor: pointer;
  vertical-align: middle;
}
</style>
