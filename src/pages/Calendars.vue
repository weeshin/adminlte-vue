<template>
    <div class="wrapper">
      <MonthlyGrid :initial-year="2024" :initial-month="5" :records="data" />
    </div>
  </template>
  
  <script setup lang="ts">
  import MonthlyGrid from '@components/Attendance.vue';
  
  // Sample records
const data = [
  { title: 'Tan Ling Kwan', body: [ { day: 1, content: 'm1 - absent' }, { day: 2, content: 'm' } ] },
  { title: 'Mike Ross', body: [ { day: 1, content: 'm - Late' }, { day: 12, content: 'm' }, { day: 16, content: 'm' }, { day: 28, content: 'm' } ] },
  { title: 'Jessica Pearson', body: [ { day: 3, content: 'm' }, { day: 14, content: 'm' }, { day: 15, content: 'm' } ] },
  { title: 'Harvey Specter', body: [ { day: 5, content: 'm' }, { day: 19, content: 'm' } ] },
  { title: 'Rachel Zane', body: [ { day: 7, content: 'm' }, { day: 22, content: 'm' } ] },
  { title: 'Louis Litt', body: [ { day: 4, content: 'm' }, { day: 23, content: 'm' } ] },
  { title: 'Donna Paulsen', body: [ { day: 6, content: 'm' }, { day: 10, content: 'm' }, { day: 30, content: 'm' } ] },
  { title: 'Katrina Bennett', body: [ { day: 2, content: 'm' }, { day: 20, content: 'm' }, { day: 29, content: 'm' } ] },
  { title: 'Robert Zane', body: [ { day: 11, content: 'm' }, { day: 17, content: 'm' } ] },
  { title: 'Samantha Wheeler', body: [ { day: 8, content: 'm' }, { day: 24, content: 'm' } ] },
  { title: 'Sheila Sazs', body: [ { day: 9, content: 'm' }, { day: 21, content: 'm' } ] },
  { title: 'Jack Soloff', body: [ { day: 13, content: 'm' }, { day: 25, content: 'm' } ] },
  { title: 'Gretchen Bodinski', body: [ { day: 18, content: 'm' }, { day: 26, content: 'm' } ] },
  { title: 'Benjamin', body: [ { day: 1, content: 'm' }, { day: 5, content: 'm' } ] },
  { title: 'Megan', body: [ { day: 2, content: 'm' }, { day: 6, content: 'm' } ] },
  { title: 'Hannah', body: [ { day: 3, content: 'm' }, { day: 7, content: 'm' } ] },
  { title: 'James', body: [ { day: 4, content: 'm' }, { day: 8, content: 'm' } ] },
  { title: 'Oliver', body: [ { day: 9, content: 'm' }, { day: 13, content: 'm' } ] },
  { title: 'Sophia', body: [ { day: 10, content: 'm' }, { day: 15, content: 'm' } ] },
  { title: 'Isabella', body: [ { day: 12, content: 'm' }, { day: 18, content: 'm' } ] },
  { title: 'Mason', body: [ { day: 11, content: 'm' }, { day: 20, content: 'm' } ] },
  { title: 'Logan', body: [ { day: 14, content: 'm' }, { day: 21, content: 'm' } ] },
  { title: 'Aiden', body: [ { day: 16, content: 'm' }, { day: 23, content: 'm' } ] },
  { title: 'Lucas', body: [ { day: 17, content: 'm' }, { day: 24, content: 'm' } ] },
  { title: 'Ethan', body: [ { day: 19, content: 'm' }, { day: 25, content: 'm' } ] },
  { title: 'Emma', body: [ { day: 22, content: 'm' }, { day: 26, content: 'm' } ] },
  { title: 'Chloe', body: [ { day: 27, content: 'm' }, { day: 28, content: 'm' } ] },
  { title: 'Lily', body: [ { day: 29, content: 'm' }, { day: 30, content: 'm' } ] },
  { title: 'Grace', body: [ { day: 31, content: 'm' } ] },
];
  </script>
  