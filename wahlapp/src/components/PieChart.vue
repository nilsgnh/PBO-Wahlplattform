<template>
  <div class="pie-chart-container">
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { useChartComposable } from '../composables/useChartComposable';

const props = defineProps({
  chartType: { 
    type: String as () => 'ergebnisse' | 'gewinneUndVerluste', 
    required: true, 
    default: 'ergebnisse' 
  },
});

const pieChart = ref<HTMLCanvasElement | null>(null);

const { createChart } = useChartComposable();

onMounted(() => {
  if (pieChart.value) {
    createChart(props.chartType, pieChart.value, 'pie'); // Tortendiagramm
  }
});
</script>

<style scoped>
.pie-chart-container {
  width: 80%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
