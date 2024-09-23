<template>
  <NixCard>
    <canvas :id="props.id" :width=width :height=height></canvas>
  </NixCard>
</template>


<script setup lang="ts">
import { onMounted, defineProps } from 'vue';
import { Chart, registerables, ChartType, ChartData, ChartOptions } from 'chart.js';
import NixCard from '../card/NixCard.vue';

const props = defineProps<{
  id: string,
  type?: ChartType,
  options?: ChartOptions,
  data: ChartData,
  width: string,
  height: string
}>();

// Register all components including scales
Chart.register(...registerables);

onMounted(() => {
  const ctx = document.getElementById(props.id) as HTMLCanvasElement;
  
  new Chart(ctx, {
    type: props.type || 'bar', // or 'line', 'pie', 'doughnut', etc.
    data: props.data,
    options: props.options
  });

});
</script>

<style scoped>
canvas {  
  max-width: 100%;
  max-height: 100%;
}
</style>