<template>
  <div class="button-slide-container">
    <!-- Linker Pfeil-Button: Wird nur angezeigt, wenn der Typ 'left' ist -->
    <button
      v-show="buttonType === 'left'"
      @click="goToPrevious"
      class="button-slide left"
    >
      <!-- Bild für den linken Pfeil -->
      <img src="@/assets/arrow-left.png" alt="Previous" />
    </button>

    <!-- Rechter Pfeil-Button: Wird nur angezeigt, wenn der Typ 'right' ist -->
    <button
      v-show="buttonType === 'right'"
      @click="goToNext"
      class="button-slide right"
    >
      <!-- Bild für den rechten Pfeil -->
      <img src="@/assets/arrow-right.png" alt="Next" />
    </button>
  </div>
</template>


  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Eigenschaften (Props) des Buttons
// buttonType: Gibt an, ob der Button 'left' oder 'right' ist
const props = defineProps({
  buttonType: {
    type: String, // Typ der Eigenschaft: String
    required: true, // Diese Eigenschaft ist erforderlich
    validator: (value: string) => ['left', 'right'].includes(value), // Nur 'left' oder 'right' sind erlaubt
  }
});

// Events für die Navigation
// 'navigate': Wird ausgelöst, wenn ein Button geklickt wird
const emit = defineEmits<{
  (e: 'navigate', direction: 'next' | 'previous'): void;
}>();

// Methode zum Navigieren zum vorherigen Element
const goToPrevious = () => {
  emit('navigate', 'previous'); // Event auslösen mit Richtung 'previous'
};

// Methode zum Navigieren zum nächsten Element
const goToNext = () => {
  emit('navigate', 'next'); // Event auslösen mit Richtung 'next'
};
</script>

  
<style scoped>
/* Container für die Buttons */
.button-slide-container {
  display: flex; /* Flexibles Layout für gleichmäßige Verteilung */
  justify-content: space-between; /* Buttons links und rechts positionieren */
  align-items: center; /* Buttons vertikal zentrieren */
  width: 100%; /* Volle Breite des Containers */
  max-width: 900px; /* Maximale Breite des Containers */
  position: relative; /* Relativer Kontext für absolute Positionierung der Buttons */
}

/* Allgemeines Styling für beide Buttons */
.button-slide {
  width: 60px; /* Feste Breite des Buttons */
  height: 60px; /* Feste Höhe des Buttons */
  background: transparent; /* Kein Hintergrund, um das Bild sichtbar zu machen */
  border: none; /* Entfernt den Standardrahmen des Buttons */
  cursor: pointer; /* Ändert den Mauszeiger beim Hover */
  padding: 0; /* Kein Padding, um Layout-Sprünge zu vermeiden */
  display: flex; /* Flexibles Layout für zentriertes Bild */
  align-items: center; /* Zentriert das Bild vertikal */
  justify-content: center; /* Zentriert das Bild horizontal */
}

/* Styling für das Bild im Button */
.button-slide img {
  width: 40px; /* Breite des Pfeils */
  height: 40px; /* Höhe des Pfeils */
}

/* Hover-Effekt für die Buttons */
.button-slide:hover {
  transform: scale(1.2); /* Vergrößert den Button beim Hover */
}

/* Styling für den linken Button */
.left {
  position: absolute; /* Absolute Positionierung relativ zum Container */
  left: 0; /* Linksbündig */
}

/* Styling für den rechten Button */
.right {
  position: absolute; /* Absolute Positionierung relativ zum Container */
  right: 0; /* Rechtsbündig */
}
</style>
