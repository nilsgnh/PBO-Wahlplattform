<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,        // Titel (z. B. "Erststimme")
  description: String,  // Beschreibung (z. B. Kandidat oder Partei)
  detail: String,       // Detail (z. B. Name oder Nummer)
});
</script>

<template>
  <div class="infobox">
    <div class="infobox-left">
      <div class="info-title">{{ props.title }}</div>
      <div class="info-description">{{ props.description }}</div>
    </div>
    <div class="infobox-right">
      <div class="info-detail">{{ props.detail }}</div>
    </div>
  </div>
</template>


<style scoped>
.infobox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: 10px auto;
  background-color: #f3f4f6;
  border-radius: 15px;
  border: 1px solid #d1d5db;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.infobox:hover {
  background-color: #f0fff4; /* Grünlich für Hover */
  transform: scale(1.02);
}

.infobox-left {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1;
  padding-right: 50px;
}

.info-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 10px;
}

.info-description {
  font-size: 1rem;
  color: #6b7280;
}

.infobox-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #10b981; /*light green*/
}
</style>

