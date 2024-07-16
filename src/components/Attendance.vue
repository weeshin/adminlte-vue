<template>
  <div class="excel-container">
    <Card title="">
      <template #card-tools>
        <div class="header-container">
          <div class="current-date">{{ currentMonthYear }}</div>
          <div class="btn-group">
            <button type="button" class="btn btn-primary" @click="goToPreviousMonth">
              <i class="fa fa-chevron-left"></i>
            </button>
            <button type="button" class="btn btn-primary" @click="goToNextMonth">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
          <button type="button" class="btn btn-primary" @click="goToCurrentMonth">Current Month</button>          
        </div>
      </template>
      <div class="table-container">
        <table class="excel-table">
          <thead>
            <tr>            
              <th class="fixed-header">Name</th>            
              <th v-for="day in daysInMonth" :key="day" class="scrollable-header sticky-header">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in records" :key="rowIndex">            
              <td class="fixed-cell">{{ row.title }}</td>
              <td v-for="day in daysInMonth" :key="day" class="scrollable-cell">
                <span v-if="entryForDay(row.body, day)">
                  {{ entryForDay(row.body, day).content }}
                </span>
                <span v-else>
                  &nbsp; <!-- Empty space for days without content -->
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="footer-container">
          Total Records: {{ totalRecords }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from '@components/card.vue';

const props = defineProps<{
  initialYear: number;
  initialMonth: number;
  records: {
    title: string;
    body: { day: number; content: string }[];
  }[];
}>();

const year = ref(props.initialYear);
const month = ref(props.initialMonth);

const daysInMonth = computed(() => {
  return Array.from({ length: new Date(year.value, month.value, 0).getDate() }, (_, i) => i + 1);
});
const entryForDay = (body: { day: number; content: string }[], day: number) => {
  return body.find(entry => entry.day === day) || null;
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentMonthYear = computed(() => {
  return `${monthNames[month.value - 1]} ${year.value}`;
});

const totalRecords = computed(() => {
  return props.records.length;
});

const goToPreviousMonth = () => {
  if (month.value === 1) {
    month.value = 12;
    year.value -= 1;
  } else {
    month.value -= 1;
  }
};

const goToNextMonth = () => {
  if (month.value === 12) {
    month.value = 1;
    year.value += 1;
  } else {
    month.value += 1;
  }
};

const goToCurrentMonth = () => {
  const currentDate = new Date();
  year.value = currentDate.getFullYear();
  month.value = currentDate.getMonth() + 1;
};
// const columns = Array.from({ length: 25 }, (_, i) => String.fromCharCode(66 + i)); // B to Z
// const data = ref([
//   ['Row 1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1', 'W1', 'X1', 'Y1', 'Z1', 
//             '1B1', '1C1', '1D1', '1E1', '1F1', '1G1', '1H1', '1I1', '1J1', '1K1', '1L1', '1M1', '1N1', '1O1', '1P1', '1Q1', '1R1', '1S1', '1T1', '1U1', '1V1', '1W1', 
//             '1X1', '1Y1', '1Z1'],
//   ['Row 2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2', 'K2', 'L2', 'M2', 'N2', 'O2', 'P2', 'Q2', 'R2', 'S2', 'T2', 'U2', 'V2', 'W2', 'X2', 'Y2', 'Z2',
//             'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1', 'W1', 'X1', 'Y1', 'Z1'
//   ],
//   // Add more rows as needed
// ]);
</script>

<style scoped>
.excel-container {
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  justify-content: flex-end; /* Align to the right */
  align-items: center;
  margin-bottom: 10px;
  gap: 10px; /* Space between elements */
}

.current-date {
  font-size: 18px;
  font-weight: bold;
}

.table-container {
  display: flex;
  flex-direction: column;
  max-height: 400px; /* Adjust height as needed */
  overflow: auto;
}

.excel-table {
  border-collapse: collapse;
  width: 100%;
}

.fixed-header {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #f1f1f1;
  z-index: 4;
  width: 150px;
  min-width: 150px;
  max-width: 300px;
}

.fixed-cell {
  position: sticky;
  left: 0;
  background-color: #ffffff;
  z-index: 2;
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: #f1f1f1;
  z-index: 3;
}

.scrollable-header, .scrollable-cell {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
}

th, td {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 8px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
