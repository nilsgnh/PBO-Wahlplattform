<template>
  <div class="bar-chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { useChartComposable } from '../composables/useChartComposable';

const props = defineProps({
  chartType: { 
    type: String as () => 'ergebnisse' | 'gewinneUndVerluste', 
    required: true, 
    default: 'ergebnisse', 
  },
});

const barChart = ref<HTMLCanvasElement | null>(null);

const { createChart } = useChartComposable();

onMounted(() => {
  if (barChart.value) {
    createChart(props.chartType, barChart.value, 'bar'); // Balkendiagramm
  }
});
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 400px;
}
</style>
