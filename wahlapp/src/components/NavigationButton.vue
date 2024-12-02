<template>
  <button
    @click="handleClick"
    :class="[
      'rounded p-2 pl-3 pr-3 border-2 transition duration-200 ease-in-out',
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
        return "submit-button";  // Green für submit
      } else if (props.type === "back") {
        return "bg-gray-200 text-gray-800";  // Gray für back
      }
      return "bg-white"; // weißer Hintergrund für alle anderen
    });
    const hoverClass = computed(() =>
      props.type === "back" ? "hover:bg-gray-300" : "hover:bg-gray-300"
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
button.disabled {
  background-color: #e5e7eb;
  border: 2px solid #9ca3af;
  cursor: not-allowed;
}

.submit-button {
  background-color: #d1fae5;
  border: 2px solid #10b981;
}
</style>
