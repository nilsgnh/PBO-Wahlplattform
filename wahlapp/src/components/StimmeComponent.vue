<template>
  <p> Sie haben eine Stimme ({{ stimme }}): </p>
  <div class="flex flex-row" id="wahl">
    <form>
      <ParteiboxComponent
        v-for="partei in parteien"
        :key="partei.id"
        :partei="partei.name"
        :text="partei.text"
        :num="partei.num"
        :radioname="stimme"
        @onClick="handleClick"
      />
    </form>
  </div>
</template>

<script setup>
import { reactive, defineProps } from "vue";
import ParteiboxComponent from "@/components/ParteiboxComponent.vue";

// Props
defineProps({
  stimme: String,
});

const parteien = reactive([
  {
    id: 1,
    name: "CDU",
    text: "Christlich Demokratische Union",
    num: 1,
  },
  {
    id: 2,
    name: "SPD",
    text: "Sozialdemokratische Partei Deutschlands",
    num: 2,
  },
  {
    id: 3,
    name: "Grüne",
    text: "Bündnis 90/Die Grünen",
    num: 3,
  },
  {
    id: 4,
    name: "FDP",
    text: "Freie Demokratische Partei",
    num: 4,
  },
  {
    id: 5,
    name: "Linke",
    text: "Die Linke",
    num: 5,
  },
  {
    id: 6,
    name: "AfD",
    text: "Alternative für Deutschland",
    num: 6,
  },
]);

// Methods
const handleClick = () => {
  console.log("clicked");
};
</script>

<style>
#wahl {
  padding: 10px;
  justify-content: center;
  align-items: center;
}
</style>
