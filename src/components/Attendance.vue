<template>
  <div class="container-fluid">
    <div class="table-container">
      <table class="table table-bordered">
        <thead class="bg-light text-center font-weight-bold">
          <tr>
            <th class="bg-primary text-white p-2 title-column">Title</th>
            <th v-for="day in daysInMonth" :key="day" class="text-center day-column">{{ day }}</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="record in records" :key="record.title">
            <td>{{ record.title }}</td>
            <td v-for="day in daysInMonth" :key="day" class="text-center">
              <span v-if="entryForDay(record.body, day)">
                {{ truncateText(entryForDay(record.body, day).content) }}
              </span>
              <span v-else>&nbsp;</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  year: number;
  month: number;
  records: {
    title: string;
    body: { day: number; content: string }[];
  }[];
}>();

const daysInMonth = computed(() => {
  return Array.from({ length: new Date(props.year, props.month, 0).getDate() }, (_, i) => i + 1);
});

const entryForDay = (body: { day: number; content: string }[], day: number) => {
  return body.find(entry => entry.day === day) || null;
};

const truncateText = (text: string) => {
  const maxLength = 3; // Adjust the maximum length as needed
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};
</script>

<style scoped>
.container-fluid {
  padding: 20;
}


.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
}

.title-column {
  width: 180px; /* Fixed width for title column */  
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

.day-column {
  width: 50px; /* Fixed width for each day column */  
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflow text */
}

.text-center {
  text-align: center !important;
}

.font-weight-bold {
  font-weight: bold !important;
}

.table-container {
  overflow-x: auto; /* Horizontal scrollbar if needed */
}

.table-body {  
  max-height: 100px; /* Adjust max height as needed */
  overflow: scroll; /* Vertical scrollbar for tbody */
}
</style>
