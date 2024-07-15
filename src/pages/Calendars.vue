<template>
    <div class="wrapper">
      <MonthlyGrid :year="2024" :month="7" :records="data" />
    </div>
  </template>
  
  <script setup lang="ts">
  import MonthlyGrid from '@components/Attendance.vue';
  
  const data = [
    {
      title: 'Tan Ling Kwan',
      body: [
        { day: 1, content: 'm1 - absent' },
        { day: 2, content: 'm' },
        // Add more records as needed
      ],
    },
    {
      title: 'Mike Ross',
      body: [
        { day: 1, content: 'm' },
        { day: 12, content: 'm' },
        { day: 16, content: 'm' },
        { day: 28, content: 'm' },
        // Add more records as needed
      ],
    },
    {
      title: 'Hassan',
      body: [
        { day: 1, content: 'm' },
        { day: 12, content: 'm1' },
        { day: 16, content: 'm' },
        { day: 28, content: 'm' },        
      ],
    },
    {
      title: 'Hassan',
      body: [
        { day: 1, content: 'm' },
        { day: 12, content: 'm1' },
        { day: 16, content: 'm' },        
      ],
    },
    {
      title: 'Hassan',
      body: [        
        { day: 16, content: 'm1' },
        { day: 28, content: 'm' },        
      ],
    },
    {
      title: 'Hassan',
      body: [        
        { day: 12, content: 'm' },
        { day: 16, content: 'm' },
        { day: 28, content: 'm' },        
      ],
    },
    {
      title: 'Hassan',
      body: [
        { day: 2, content: 'm' },
        { day: 12, content: 'm' },
        { day: 16, content: 'm' },
        { day: 28, content: 'm' },        
      ],
    },
    {
      title: 'Hassan',
      body: [
        { day: 3, content: 'ml' },
        { day: 12, content: 'm' },
        { day: 16, content: 'm' },
        { day: 28, content: 'm' },        
      ],
    },
  ];
  </script>
  