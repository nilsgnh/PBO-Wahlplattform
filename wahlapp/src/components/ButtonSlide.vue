<template>
  <div class="button-slide-container">
    <!-- Linker Pfeil-Button: Wird nur angezeigt, wenn der Typ 'left' ist -->
    <button
      v-if="buttonType === 'left'"  
      @click="goToPrevious"
      class="button-slide left"
    >
      <img src="@/assets/arrow-left.png" alt="Previous" />
    </button>

    <!-- Rechter Pfeil-Button: Wird nur angezeigt, wenn der Typ 'right' ist -->
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

// Eigenschaften (Props) des Buttons
const props = defineProps({
  buttonType: {
    type: String,
    required: true,
    validator: (value: string) => ['left', 'right'].includes(value),
  },
});

// Ereignisse für die Navigation
const emit = defineEmits<{
  (e: 'navigate', direction: 'next' | 'previous'): void;
}>();

// Methoden zum Navigieren
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
  align-items: center;
  width: 100%;
  max-width: 900px;
  position: relative;
}

.button-slide {
  width: 60px;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-slide img {
  width: 40px;
  height: 40px;
}

.button-slide:hover {
  transform: scale(1.2);
}

.left {
  position: absolute;
  left: 0;
}

.right {
  position: absolute;
  right: 0;
}
</style>
