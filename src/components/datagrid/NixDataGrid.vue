<template>
  <div class="d-flex justify-content-end mb-2">
    <button class="btn btn-primary" @click="showCreateModal"><i class="fas fa-plus"></i></button>
  </div>
  <component :is="renderTable" />
  <NixDataGridForm :formGroups="formGroups" v-if="isCreateModalVisible" :show="isCreateModalVisible" @close="hideCreateModal" @submit="handleCreate" />
</template>

<script setup lang="ts">
import { ref, defineProps, h, getCurrentInstance, watch, computed } from 'vue';
import NixColumnHeader from './NixColumnHeader.vue';
import NixColumn from './NixColumn.vue';
import NixDataGridForm from './NixDataGridForm.vue';
import NixPagination from '@/components/pagination/NixPagination.vue';
import { ColumnProps, FormFieldProps, FormGroupProps } from './types';

const props = defineProps<{
  dataSource: Record<string, any>[],
  columns: ColumnProps[],
  loading?: boolean,
  bordered: boolean, 
  entriesPerPage: number,
  pagination: boolean,  
  formGroups: FormGroupProps[],
}>();

const slots = defineSlots();

const vm = getCurrentInstance()
const $q = vm?.appContext.config.globalProperties.$q;

const currentPage = ref(1);
const totalEntries = computed(() => props.dataSource.length);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.entriesPerPage;
  const end = start + props.entriesPerPage;
  return props.dataSource.slice(start, end);
});

watch(() => props.dataSource, () => {
  currentPage.value = 1;
}, { deep: true });

const isCreateModalVisible = ref(false);

const showCreateModal = () => {
  isCreateModalVisible.value = true;
};

const hideCreateModal = () => {
  isCreateModalVisible.value = false;
};

const handleCreate = (newRecord: Record<string, any>) => {
  props.dataSource.push(newRecord);
  hideCreateModal();
};

const getTheadTR = () => {
  const headers = props.columns.map(col => 
    h(NixColumnHeader, {      
      autoWidth: true,
      props: col
    }, {
      default: () => col.header
    }));
  return h('tr', {}, headers);  
};

const getBody = () => {  
  const rows = paginatedData.value.map((row) => {
    const tds = props.columns.map(col => {
      if (col.field === 'actions') {
        return h(NixColumn, {
          autoWidth: true,
          noHover: true,
          props: col
        },{
          default: () => [
            slots.edit ? slots.edit({ row }) : null,
            slots.delete ? slots.delete({ row }) : null
          ]
        });
      }
      return h(NixColumn, {
        autoWidth: true,
        noHover: true,
        props: col
      }, {
        default: () => row[col.field]
      });
    });
    return h('tr', {}, tds);
  });
  console.log(paginatedData.value);
  console.log(rows);
  
  return h('tbody', { key: currentPage.value }, rows);
};

const renderTable = () => {
  const child = [];
  const data = {};

  if (props.loading === true && slots.loading !== void 0) {
    child.push(
      slots.loading()
    );
  } else {
    const table = h('table', {
      class: props.bordered === true 
        ? 'table table-hover text-nowrap table-bordered' : 'table table-hover text-nowrap'
    }, [
      h('thead', {}, getTheadTR()),
      getBody()
    ]);
    child.push(table);
    if (props.pagination) {
      child.push(h(NixPagination, {
        currentPage: currentPage.value,
        totalEntries: totalEntries.value,
        entriesPerPage: props.entriesPerPage,
        'onUpdate:currentPage': (page: number) => { currentPage.value = page; }
      }));
    }
  }

  return h('div', data, child);
};
</script>

<style scoped>
.child-element {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px;
}
.d-flex {
  display: flex;
}
.justify-content-end {
  justify-content: flex-end;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
