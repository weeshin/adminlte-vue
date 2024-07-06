<template>

<div class="row">
    <div class="col-md-8">
        <div class="chart-responsive">
            <canvas ref="chart" height="150"></canvas>
        </div>
        <!-- ./chart-responsive -->
    </div>

    <div class="col-md-4">
        <ul class="chart-legend clearfix">
            <li v-for="(label, index) in props.labels" :key="label">
                <i class="far fa-circle" :style="{ color: props.backgroundColors[index] }"></i> {{ label }}
            </li>
        </ul>
    </div>
</div>

</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Define props
const props = defineProps({
  labels: Array,
  data: Array,
  backgroundColors: Array
});

const chart = ref(null);

onMounted(async () => {
    await nextTick();

    if (chart.value) {

        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: props.labels,
                datasets: [{
                    data: props.data,
                    backgroundColor: props.backgroundColors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }   else {
        console.error('Canvas element not found.');
    }

});

</script>

<style scoped>
.chart-responsive {
  position: relative;
  height: 150px;
}
</style>