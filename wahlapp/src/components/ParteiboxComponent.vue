<template>
  <div
    class="parteibox"
    :class="{ selected: isSelected, disabled: isDisabled }"
    @click="handleBoxClick"
  >
    <!-- Linke Spalte: Parteiname und Beschreibung -->
    <div class="parteibox-left">
      <div class="partei-name text-2xl">{{ partei }}</div>
      <div class="partei-text text-xl">{{ text }}</div>
    </div>
    <!-- Rechte Spalte: Nummer -->
    <div class="parteibox-right">
      <div class="partei-num">{{ num }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useWahlStore } from "@/stores/wahlStore";

// eslint-disable-next-line no-unused-vars
const store = useWahlStore();

const props = defineProps({
  partei: String,
  text: String,
  num: Number,
  selected: Boolean,
  disabled: Boolean,
  onClick: Function,
});

</script>

<style scoped>
.parteibox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Breite anpassbar */
  padding: 20px;
  margin: 10px auto;
  background-color: #f3f4f6;
  /*border-radius: 20px;*/
  border: 1px solid #d1d5db;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  cursor: pointer;
}

.parteibox:hover {
  background-color: #f0fff4; /* Grünlich für Hover */
  transform: scale(1.02);
}

.parteibox.disabled:hover {
  background-color: #e5e7eb; /* Grau für deaktiviert */
  transform: scale(1);
}

.parteibox.selected {
  background-color: #d1fae5; /* Grünlich für ausgewählt */
  border: 2px solid #10b981;
}

.parteibox.disabled {
  background-color: #e5e7eb; /* Grau für deaktiviert */
  opacity: 0.6;
  cursor: not-allowed;
}

/* Linke Spalte */
.parteibox-left {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1;
  padding-right: 100px;
}

.partei-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 5px;
}

.partei-text {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.4;
}

/* Rechte Spalte */
.parteibox-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #374151;
}
</style>
