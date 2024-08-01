<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">

    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <Card :title="title">
                    <template #card-tools>
                        <div class="card-tools">
                            <button type="button" class="btn btn-info text-uppercase" style="letter-spacing: 0.1em" @click="showCreateModal">
                                <i class="fas fa-cog"></i> {{ $t('actionableDataTable.create') }}
                            </button>
                        </div>                        
                    </template>
                    <div class="mb-3 d-flex align-items-center justify-content-end">
                        <label for="search" class="form-label mb-0"> {{ $t('actionableDataTable.search') }}: </label>
                        <div class="ml-1">
                            <input type="text" id="search" class="form-control" v-model="searchText" :placeholder="$t('actionableDataTable.search')"></input>
                        </div>                            
                    </div>
                    <table class="table table-hover text-nowrap table-bordered">
                        <thead>
                            <tr>
                                <th class="text-capitalize" v-for="(colName, index) in columnNames" :key="index">
                                    {{ $t("actionableDataTable."+colName) }}
                                </th>                                
                                <th class="text-capitalize text-right">{{ $t('actionableDataTable.action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paginatedItems" :key="item.id">
                                <td v-for="(colName, colIndex) in columnNames" :key="colIndex">
                                    {{ item[colName] }}
                                </td>                                
                                <td class="text-right">
                                    <button class="btn btn-primary text-uppercase" style="letter-spacing: 0.1em;"
                                        @click="showEditModal(item)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger text-uppercase ml-1" style="letter-spacing: 0.1em;"
                                        @click="confirmDelete(item)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
        </div>
    </div>
</section>

<!-- Create/Edit Modal -->
<Modal :title="modalTitle" :isVisible="isModalVisible" @hide="hideModal" @submit="submitForm">
    <div class="card card-primary">
        <form @submit.prevent="submitForm">
            <div class="card-body">
                <div v-for="field in config.fields" :key="field.model" class="form-group">
                    <label :for="field.model">{{ field.label }}</label>
                    <input v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'" :type="field.type" v-model="formData[field.model]" :id="field.model" class="form-control" />
                    <select v-if="field.type === 'select'" v-model="formData[field.model]" :id="field.model" class="form-control">
                        <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</Modal>


<!-- Delete Confirmation Modal -->
<Modal :title="$t('actionableDataTable.confirmDelete')" :isVisible="isDeleteModalVisible" @hide="hideDeleteModal" @submit="deleteConfirmed">
    <div>
      <p>{{ $t('actionableDataTable.confirmDeleteMessage') }}</p>
    </div>
    <template #footer>
      <button type="button" class="btn btn-secondary text-uppercase" @click="hideDeleteModal">{{ $t('actionableDataTable.cancel') }}</button>
      <button type="button" class="btn btn-danger text-uppercase" @click="deleteConfirmed">{{ $t('actionableDataTable.delete') }}</button>
    </template>
</Modal>

</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineProps, watch } from 'vue';
import Card from '@components/card.vue';
import Modal from '@components/Modal.vue';
import { useToast } from 'vue-toastification';
import { FormConfig, FormField } from './FormConfig';

const props = defineProps<{ 
    config: FormConfig,
    title: string,
    modalTitle: string,
    columnNames: string[],
    data: Record<string, any>[],
    onSubmit: (data: Record<string, any>, context: any) => void,
    onItemDelete: (item: any, context: any) => void,
    onSearch?: (searchText: string) => void
}>();

const formData = reactive<Record<string, any>>({});


// Initialize formData with default values from config
const initializeFormData = () => {
  props.config.fields.forEach((field: FormField) => {
    formData[field.model] = '';
  });
};

initializeFormData();

const getComponent = (type: string) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
      return 'input';
    case 'select':
      return 'select';
    default:
      return 'input';
  }
};

const toast = useToast();
const showToast = (message: string) => {      
      toast.success(message);      
      console.log("ActionableDatable showToast");
};

const submitForm = () => {    
    props.onSubmit(formData, { showToast });
    hideModal();
};


const isModalVisible = ref(false);
const modalTitle = ref(props.modalTitle);

const showModal = (title: string) => {
    modalTitle.value = title;
    isModalVisible.value = true;
};

const hideModal = () => {
    isModalVisible.value = false;
    resetForm();
};

const showCreateModal = () => {
  resetForm();
  showModal('Create New Entry');
};

const showEditModal = (item: Record<string, any>) => {
  Object.keys(item).forEach((key) => {
    formData[key] = item[key];
  });
  showModal('Edit Entry');
};

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
};

// Delete confirmation logic
const isDeleteModalVisible = ref(false);
const itemToDelete = ref<Record<string, any> | null>(null);

const confirmDelete = (item: Record<string, any>) => {
  itemToDelete.value = item;
  isDeleteModalVisible.value = true;
};

const hideDeleteModal = () => {
  isDeleteModalVisible.value = false;
  itemToDelete.value = null;
};

const deleteConfirmed = () => {
  if (itemToDelete.value) {
    props.onItemDelete(itemToDelete.value, { showToast });
    hideDeleteModal();
  }
};

// Pagination and search functionality (placeholders)
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalEntries = computed(() => props.data.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.data.slice(start, end);
});

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

const startEntry = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endEntry = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalEntries.value));


const searchText = ref('');
const searchItems = () => {
  if (props.onSearch) {
    props.onSearch(searchText.value);
  }
};

watch(searchText, searchItems);

onMounted(() => {
  searchItems();
});
</script>

<style scoped>
.card-body {
    overflow-y: auto;
    max-height: 60vh; /* Adjust as needed to control the scrollable area within the modal */
}
</style>