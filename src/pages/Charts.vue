<template>
<section class="content">
  <h1>Charts</h1>
  <div class="row">
    <div class="col-lg-3 col-6">            
      <NixChart id="lineChart" 
                type="line"
                :data="lineData"
                :options="options"                
                :height="400">        
      </NixChart>
    </div>
    <div class="col-lg-3 col-6">      
      <NixChart id="barChart" 
            type="bar" 
            :data="barData"
            :options="options">        
      </NixChart>      
    </div>
    <div class="col-lg-3 col-6">      
      <NixChart id="pieChart" 
          type="pie" 
          :data="doughnutData"
          :options="options">        
      </NixChart>      
    </div> 
    <div class="col-lg-3 col-6">      
      <NixChart id="doughnutChart" 
          type="doughnut" 
          :data="doughnutData">        
      </NixChart>              
    </div>
  </div>

</section>





</template>

<script setup>
import { ref } from 'vue';
import NixChart from '@/components/chart/NixChart.vue';
import NixCard from '@/components/card/NixCard.vue';

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
};

const options = ref();
options.value = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const doughnutData = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
</script>