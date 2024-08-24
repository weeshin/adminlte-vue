<template>
  <NixCard>
    <component :is="renderTable" />
  </NixCard>
  <NixDataGridForm         
    :formProps="formProps"
    v-if="isCreateModalVisible || isEditModalVisible" 
    :show="isCreateModalVisible || isEditModalVisible"
    :currentRecord="currentRecord" 
    @close="hideModal" 
    @submit="handleSubmit" 
  />
</template>

<script setup lang="ts">
import { ref, defineProps, h, watch, computed, nextTick } from 'vue';
import NixColumnHeader from './NixColumnHeader.vue';
import NixColumn from './NixColumn.vue';
import NixDataGridForm from './NixDataGridForm.vue';
import NixPagination from '@/components/pagination/NixPagination.vue';
import { NixCard, NixCardHeader, NixCardFooter, NixCardBody } from '@/components/card';
import { ColumnProps, DataGridFormProps } from './types';

const props = defineProps<{
  title: string,  
  dataSource: Record<string, any>[],
  columns: ColumnProps[],
  loading?: boolean,
  bordered: boolean, 
  entriesPerPage: number,
  pagination: boolean,    
  formProps: DataGridFormProps
}>();

const slots = defineSlots();
const emit = defineEmits(['formSubmit', 'searchQuery', 'itemDelete']);

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
const searchInputRef = ref<HTMLElement | null>(null);
const searchQuery = ref('');


const emitSearchQuery = (event: any) => {
  console.log('emitSearchQuery', searchQuery.value);
  searchQuery.value = event.target.value;
  
  emit('searchQuery', event.target.value);
  
  nextTick(() => {
    searchInputRef.value?.focus();  
  });
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

const deleteItem = (record: Record<string, any>) => {
  emit('itemDelete', record);
};

const renderHeader = () => {
  // Create the title element
  const titleElement = h('div', { class: 'navbar-brand' }, props.title);

  // Create the search input element
  const searchInputElement = h('input', {
    ref: searchInputRef,
    class: 'form-control me-2',
    type: 'text',
    placeholder: 'Search...',
    value: searchQuery.value,
    onInput: emitSearchQuery, // Emit the search query on input
  });


  // Create the button element with an icon
  const buttonElement = h('button', {
    class: 'btn btn-primary',
    onClick: () => showModal('create'), // Show modal on button click
  }, [
    h('i', { class: 'fas fa-plus' }) // FontAwesome icon
  ]);

  // Wrap the search input in a container
  const searchInputContainer = h('div', { class: 'd-flex align-items-center' }, [
    searchInputElement,
    buttonElement
  ]);

  // Wrap everything in the main container div
  const containerElement  = h('div', { class: 'd-flex justify-content-between align-items-center' }, [
    titleElement,
    searchInputContainer    
  ]);

  return h(NixCardHeader, {}, containerElement );
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
  console.log("PaginatedData ", paginatedData.value);
  const rows = paginatedData.value.map(row => {
    const tds = props.columns.map(col => {
      if (col.field === 'actions') {
        return h(NixColumn, {
          autoWidth: true,
          noHover: true,
          props: col
        },{
          default: () => [
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
              onClick: () => deleteItem(row)
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
    return h('tr', { key: row.id }, tds);
  });
  
  return h('tbody', { key: currentPage.value }, rows);
};

const renderTable = () => {
  const child = [];
  const data = {
    key: paginatedData.value.length // Key changes when data changes
  };
  const header = renderHeader();
  child.push(header);
  if (props.loading === true && slots.loading !== void 0) {
    child.push(
      slots.loading()
    );
  } else {
    const table = h('table', {
      class: props.bordered === true 
        ? 'table table-sm table-hover text-nowrap table-bordered' : 'table table-hover text-nowrap'
    }, [
      h('thead', {}, getTheadTR()),
      getBody()
    ]);

    // Render the card body with the table inside
    const cardBody = h(NixCardBody, {}, {
      default: () => table // Pass the table as the default slot
    });

    child.push(cardBody);
    if (props.pagination) {
      const pagination = h(NixPagination, {
        currentPage: currentPage.value,
        totalEntries: totalEntries.value,
        entriesPerPage: props.entriesPerPage,
        'onUpdate:currentPage': (page: number) => { currentPage.value = page; }
      });
      const cardFooter = h(NixCardFooter, {}, pagination);
      child.push(cardFooter);
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
  text-align: 'left'
}
.mr-3 {
  margin-right: 1rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
