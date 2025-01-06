<script setup>
import WahlInfoBox from "@/components/WahlInfoBox.vue";
import { useWahlStore } from "@/stores/wahlStore"; // Importiere den Store

const store = useWahlStore();

</script>

<template>
  <p class="font-bold text-2xl">{{ $t('summary') }}</p>
  <p class="pb-5 text-base">{{ $t('summaryinfo') }}</p>
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
  <p class="font-bold pt-8 text-2xl"> {{ $t('securityinfo') }} </p>
  <p class="pb-3 text-xs">
    <b> 1. </b>
    {{ $t('sicherheitsinformationen[2]') }}
    {{ $t('sicherheitsinformationen[3]') }}
    {{ $t('sicherheitsinformationen[4]') }}
    ({{ $t('sicherheitsinformationen[0]') }} {{ $t('sicherheitsinformationen[1]') }}). <br>
    <b> 2. </b>
    {{ $t('sicherheitsinformationen[5]') }}
  </p>

  <div class="checkbox-container">
    <input
      type="checkbox"
      id="sicherheits-check"
      v-model="store.checkboxAgreed"
      class="checkbox text-xl"
    />
    <label for="sicherheits-check" class="checkbox-label text-base">
      {{ $t('securitycheck') }}
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
