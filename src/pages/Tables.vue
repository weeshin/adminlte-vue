<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ActionableDataTable 
                        title="Test DataTable" 
                        modalTitle="Test Form" 
                        :columnNames="columnNames"
                        :data="users"
                        :config="formConfig">
                    </ActionableDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ActionableDataTable from '@components/ActionableDataTable.vue';
import axios from 'axios';
import { userFormConfig } from '../components/FormConfig';

const formConfig = userFormConfig;

const columnNames = ref([
    "username", "fullname", "email", "roles"
]);

const users = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('/data/users.json');
        users.value = response.data;
    } catch(error) {
        console.error('Error fetching users', error);
    }
});

</script>