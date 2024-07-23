<template>
    <div class="wrapper">
      <MonthlyGrid :initial-year="2024" :initial-month="7" :records="data" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import MonthlyGrid from '@components/Attendance.vue';
  import axios from 'axios';
  
  const data = ref([]);
  onMounted(async () => {
    try {
      const response = await axios.get('/data/attendances.json');
      data.value = response.data;      
    } catch(error) {
      console.error('Error fetching', error);
    }
  });

  
  </script>
  