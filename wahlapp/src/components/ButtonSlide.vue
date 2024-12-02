<template>
    <div class="button-slide-container">
      <!-- Linker Pfeil, nur anzeigen, wenn buttonType 'left' ist -->
      <button
        v-if="buttonType === 'left'"
        @click="goToPrevious"
        class="button-slide left"
      >
        <img src="@/assets/arrow-left.png" alt="Previous" />
      </button>
    
      <!-- Rechter Pfeil, nur anzeigen, wenn buttonType 'right' ist -->
      <button
        v-if="buttonType === 'right'"
        @click="goToNext"
        class="button-slide right"
      >
        <img src="@/assets/arrow-right.png" alt="Next" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  // Prop für den Button-Typ (left oder right)
  const props = defineProps({
    buttonType: {
      type: String,
      required: true,
      validator: (value: string) => ['left', 'right'].includes(value), // Nur 'left' oder 'right' erlauben
    }
  });
  
  // Emit für die Navigation
  const emit = defineEmits<{
    (e: 'navigate', direction: 'next' | 'previous'): void;
  }>();
  
  // Methoden, um zwischen den Diagrammen zu wechseln
  const goToPrevious = () => {
    emit('navigate', 'previous');
  };
  
  const goToNext = () => {
    emit('navigate', 'next');
  };
  </script>
  
  <style scoped>
  .button-slide-container {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Zentriert die Pfeile */
    width: 100%;
    max-width: 900px;
    position: relative;
  }
  
  .button-slide {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 15px; /* Größere Buttons */
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .button-slide img {
    width: 40px; /* Größere Pfeile */
    height: 40px;
  }
  
  .button-slide:hover {
    transform: scale(1.2); /* Vergrößert die Buttons bei Hover */
  }
  
  /* Positionierung der Pfeile */
  .left {
    position: absolute;
    left: 0;
  }
  
  .right {
    position: absolute;
    right: 0;
  }
  </style>
  