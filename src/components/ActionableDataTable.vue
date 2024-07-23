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
                            <input type="text" id="search" class="form-control" v-model="searchText" placeholder="Search roles"></input>
                        </div>                            
                    </div>
                    <table class="table table-hover text-nowrap">
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
                                        @click="onItemDelete(item)">
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

<div class="modal fade" :class="{ show: isModalVisible, fade: !isModalVisible }" tabindex="-1" role="dialog" style="display: block;" v-if="isModalVisible">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    {{ modalTitle }}
                </h4>
                <button type="button" class="close" @click="hideModal">
                    <span arial-hidden=""true>&times;</span>
                </button>
            </div>
            <div class="modal-body overflow-hidden">
                    <div class="card card-primary">
                        <form @submit.prevent="submitForm">
                            <div class="card-body">                                
                                <div v-for="field in config.fields" :key="field.model" class="form-group">
                                    <label :for="field.model" class="h4">{{ field.label }}</label>
                                    <input
                                        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
                                        :type="field.type"
                                        v-model="formData[field.model]"
                                        :id="field.model"
                                        class="form-control"
                                    />
                                    <select v-if="field.type === 'select'" v-model="formData[field.model]" :id="field.model" class="form-control">
                                        <option v-for="option in field.options" :key="option.value" :value="option.value">
                                        {{ option.text }}
                                        </option>
                                    </select>
                                </div>                                 
                            </div>
                            <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-danger text-uppercase"
                                    style="letter-spacing: 0.1em;" @click="hideModal">
                                    Cancel 
                                </button>
                                <button type="submit" class="btn btn-info text-uppercase"
                                    style="letter-spacing: 0.1em;">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineProps, watch } from 'vue';
import Card from '@components/card.vue';
import { FormConfig, FormField } from '../components/FormConfig';

const props = defineProps<{ 
    config: FormConfig,
    title: string,
    modalTitle: string,
    columnNames: string[],
    data: Record<string, any>[],
    onSubmit: (data: Record<string, any>) => void,
    onItemDelete: (item: any) => void
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


const submitForm = () => {    
    props.onSubmit(formData);
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

// const deleteItem = (item: any) => {
//   console.log('Deleting item:', item);
// };

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
};

// Pagination and search functionality (placeholders)
const searchText = ref('');
const currentPage = ref(1);
const pageSize = 10;

const filteredItems = computed(() => {
  if (!searchText.value) {
    return props.data;
  } else {
    const lowerSearch = searchText.value.toLowerCase();
    return props.data.filter(item =>
      item.username.toLowerCase().includes(lowerSearch)
    );
  }
});

const totalEntries = computed(() => filteredItems.value.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / pageSize));
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

// Watch for changes in props.data to reset pagination
onMounted(() => {
  resetForm();
});

// Watch for changes in the config to reinitialize the form data
watch(
  () => props.config.fields,
  () => {
    initializeFormData();
  },
  { deep: true }
);
</script>