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
      <div class="mb-3 d-flex align-items-center justify-content-end">
          <label for="search" class="form-label mb-0"> {{ $t('actionableDataTable.search') }}: </label>
          <div class="ml-1">
              <input type="text" id="search" class="form-control" v-model="searchText" :placeholder="$t('actionableDataTable.search')"></input>
          </div>                            
      </div>      
      <div class="table-container">
        <table class="excel-table">
          <thead>
            <tr>            
              <th class="fixed-header">Name</th>            
              <th v-for="day in daysInMonth" :key="day" class="scrollable-header sticky-header">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedItems" :key="rowIndex">            
              <td class="fixed-cell">{{ row.title }}</td>
              <td v-for="day in daysInMonth" :key="day" class="scrollable-cell">
                <span v-if="entryForDay(row.body, day)">                  
                  <AttendanceCell :data="entryForDay(row.body, day).content"></AttendanceCell>
                </span>
                <span v-else>
                  &nbsp;
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="d-flex justify-content-between align-items-center">
            <div>                                
                {{ $t('actionableDataTable.showingEntries', { startEntry: startEntry, endEntry: endEntry, totalEntries: totalEntries }) }}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="previousPage">{{ $t('actionableDataTable.previous') }}</a>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="nextPage">{{ $t('actionableDataTable.next') }}</a>
                    </li>
                </ul>
            </nav>
          </div>  
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from '@components/card.vue';
import AttendanceCell from '@components/AttendanceCell.vue';

const props = defineProps<{
  initialYear: number;
  initialMonth: number;
  records: {
    title: string;
    body: { day: string; content: string }[];
  }[];
}>();

const year = ref(props.initialYear);
const month = ref(props.initialMonth);
const searchText = ref('');
const currentPage = ref(1);
const pageSize = 10; // Adjust as needed

const daysInMonth = computed(() => {
  return Array.from({ length: new Date(year.value, month.value, 0).getDate() }, (_, i) => i + 1);
});

const entryForDay = (body: { day: string; content: string }[], day: number) => {
  const formattedMonth = String(month.value).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedDate = `${year.value}-${formattedMonth}-${formattedDay}`;
  console.log("formattedDate "+formattedDate);
  return body.find(entry => entry.day === formattedDate) || { content: "" };
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentMonthYear = computed(() => {
  return `${monthNames[month.value - 1]} ${year.value}`;
});

const filteredItems = computed(() => {
  if (!searchText.value) {
    return props.records;
  } else {
    const lowerSearch = searchText.value.toLowerCase();
    return props.records.filter(item => 
      item.title.toLowerCase().includes(lowerSearch)
    );
  }
});

const totalEntries = computed(() => filteredItems.value.length);
const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize));
const startEntry = computed(() => (currentPage.value - 1) * pageSize + 1);
const endEntry = computed(() => Math.min(currentPage.value * pageSize, totalEntries.value));
const paginatedItems = computed(() => filteredItems.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize));

const changePage = (page: any) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// const visibleRecords = computed(() => {
//   const startIndex = (currentPage.value - 1) * pageSize;
//   return props.records.slice(startIndex, startIndex + pageSize);
// });

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

</script>

<style scoped>
.excel-container {
  display: flex;
  flex-direction: column;
  padding: 5px;
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
