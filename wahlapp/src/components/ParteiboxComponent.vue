<template>
  <div class="parteibox">
    <input type="radio" @click="handleClick" :name="radioname" :id="num">
    <div class="font-bold p-5">{{ partei }}</div>
    <p>{{ text }}</p>
    <p>{{ num }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Props
const props = defineProps({
  partei: String,
  text: String,
  num: Number,
  radioname: String,
  onClick: Function,
});

// Methods
const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>

<style scoped>
.parteibox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
</style>
