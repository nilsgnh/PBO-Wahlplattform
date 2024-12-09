<template>
  <button
    @click="handleClick"
    :class="[
      'p-2 pl-3 pr-3 border-2 transition duration-200 ease-in-out',
      baseClass,
      hoverClass,
      { disabled: isDisabled }
    ]"
    :disabled="isDisabled"
  >
    <slot name="buttonText"></slot>
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  name: "NavigationButton",
  props: {
    type: {
      type: String,
      required: true, // "back" oder "next"
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    // Dynamische Klassen für verschiedene Button-Typen
    const baseClass = computed(() => {
      if (props.type === "submit") {
        return "submit-button h-11";  // Green für submit
      } else if (props.type === "back") {
        return "bg-gray-200 text-gray-800 h-11 buttonnext";  // Gray für back
      } else if (props.type === "dashboard") {
        return "bg-white h-16 h-16 primaryBtn";
      }
      return "bg-white h-11 primaryBtn"; // weißer Hintergrund für alle anderen
    });
    const hoverClass = computed(() =>
      props.type === "back" ? "hover:bg-gray-300" : "hover:bg-gray-200"
    );

    // Click-Handler
    const handleClick = () => {
      if (!props.isDisabled) {
        emit("click"); // Nur Event auslösen
      }
    };

    return {
      baseClass,
      hoverClass,
      handleClick,
    };
  },
};
</script>

<style scoped>
button {
  width: 150px; /* Einheitliche Breite für alle Buttons */
  display: flex;
  justify-content: center; /* Zentriert den Inhalt horizontal */
  align-items: center; /* Zentriert den Inhalt vertikal */
  text-align: center; /* Stellt sicher, dass der Text zentriert ist */
}

.buttonnext{
  border: 2px solid #9ca3af;
}

button.disabled {
  background-color: #e5e7eb;
  border: 2px solid #9ca3af;
  cursor: not-allowed;
}

.submit-button {
  background-color: #d1fae5;
  border: 2px solid #10b981;
}

.submit-button:hover{
  background-color: #a7e3c5;
}
</style>

