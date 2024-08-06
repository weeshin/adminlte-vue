<template>
  <div class="d-flex justify-content-end align-items-center mb-2">
    <div class="title-container">
      <h3>{{ title }}</h3>
    </div>
    <div class="d-flex align-items-center">      
      <input 
        v-model="searchQuery" 
        class="form-control" 
        type="text" 
        placeholder="Search..." 
        @input="emitSearchQuery"
      />
    </div>
    <div>
      <button class="btn btn-primary" @click="showModal('create')"><i class="fas fa-plus"></i></button>
    </div>
  </div>
  <component :is="renderTable" />
  <NixDataGridForm 
    :formGroups="formGroups" 
    v-if="isCreateModalVisible || isEditModalVisible" 
    :show="isCreateModalVisible || isEditModalVisible"
    :currentRecord="currentRecord" 
    @close="hideModal" 
    @submit="handleSubmit" 
  />
</template>

<script setup lang="ts">
import { ref, defineProps, h, getCurrentInstance, watch, computed } from 'vue';
import NixColumnHeader from './NixColumnHeader.vue';
import NixColumn from './NixColumn.vue';
import NixDataGridForm from './NixDataGridForm.vue';
import NixPagination from '@/components/pagination/NixPagination.vue';
import { ColumnProps, FormFieldProps, FormGroupProps } from './types';

const props = defineProps<{
  title: string,
  dataSource: Record<string, any>[],
  columns: ColumnProps[],
  loading?: boolean,
  bordered: boolean, 
  entriesPerPage: number,
  pagination: boolean,  
  formGroups: FormGroupProps[],
}>();

const slots = defineSlots();
const emit = defineEmits(['formSubmit', 'searchQuery']);

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
const isEditModalVisible = ref(false);
const currentRecord = ref<Record<string, any> | null>(null);
const searchQuery = ref('');

const emitSearchQuery = () => {
  emit('searchQuery', searchQuery.value);
};

const showModal = (type: 'create' | 'edit', record: Record<string, any> | null = null) => {
  if (type === 'create') {
    isCreateModalVisible.value = true;
    isEditModalVisible.value = false;
    currentRecord.value = null;
  } else if (type === 'edit' && record) {
    isCreateModalVisible.value = false;
    isEditModalVisible.value = true;
    currentRecord.value = { ...record }; // Make a copy of the record
  }
};

const hideModal = () => {
  isCreateModalVisible.value = false;
  isEditModalVisible.value = false;
};

const handleSubmit = (submittedRecord: Record<string, any>) => {
  if (isEditModalVisible.value && currentRecord.value) {
    // Edit the existing record
    const index = props.dataSource.findIndex(item => item.id === currentRecord.value!.id);
    if (index !== -1) {
      props.dataSource[index] = submittedRecord;
    }
  } else {
    // Add a new record
    props.dataSource.push(submittedRecord);
  }
  hideModal();
  emit('formSubmit', submittedRecord);
};

// const showCreateModal = () => {
//   isCreateModalVisible.value = true;
// };

// const hideCreateModal = () => {
//   isCreateModalVisible.value = false;
// };

// const handleCreate = (newRecord: Record<string, any>) => {
//   props.dataSource.push(newRecord);
//   hideCreateModal();  
//   emit('formSubmit', newRecord);
// };

const deleteItem = () => {

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
            // slots.edit ? slots.edit({ row }) : null,
            // slots.edit ? slots.edit({ row, onEdit: () => showModal('edit', row) }) : null,
            // slots.delete ? slots.delete({ row }) : null
            h('button', { 
              class: 'btn btn-primary text-uppercase', 
              style: 'letter-spacing: 0.1em;',  
              onClick: () => showModal('edit', row)
            }, [
              h('i', {class: "fas fa-edit"})
            ]),
            h('button', { 
              class: 'btn btn-danger text-uppercase', 
              style: 'letter-spacing: 0.1em;', 
              onClick: deleteItem 
            }, [
              h('i', {class: "fas fa-trash"})
            ])            
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
.align-items-center {
  align-items: center;
}
.title-container {
  flex: 1;
}
.mr-3 {
  margin-right: 1rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
