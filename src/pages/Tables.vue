<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <DataGrid 
                        title="Test DataTable" 
                        modalTitle="Test Form" 
                        :columnNames="columnNames"
                        :data="users"
                        :config="formConfig"
                        :onSubmit="handleOnSubmit "
                        :onItemDelete="deleteItem"
                        :onSearch="handleSearch">
                    </DataGrid>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DataGrid from '@components/DataGrid.vue';
import axios from 'axios';
import { FormConfig } from '../components/FormConfig';


const columnNames = ref([
    "username", "fullname", "email", "roles"
]);

const users = ref([]);

const fetchUsers = async (searchText?: String) => {
    try {
        console.log("fetch users");
        const response = await axios.get('/data/users.json');
        users.value = response.data;
        if(searchText) {
            users.value = users.value.filter(item => item.username.toLowerCase().includes(searchText))
        }
        console.log(users.value.length);
    } catch(error) {
        console.error('Error fetching users', error);
    }
};

const formConfig: FormConfig = {
  title: 'Test Form',
  fields: [
    { model: 'username', label: 'Username', type: 'text' },
    { model: 'fullname', label: 'Full Name', type: 'text' },
    { model: 'email', label: 'Email', type: 'email' },
    { model: 'ic', label: 'IC/Password', type: 'text' },
    { model: 'gender', label: 'Gender', type: 'text' },
    { model: 'dob', label: 'D.O.B', type: 'text' },
    // { model: 'role', label: 'Role', type: 'select', options: [{ value: 'admin', text: 'Admin' }, { value: 'user', text: 'User' }] },
  ],
};

const handleOnSubmit  = (data: Record<string, any>, context: any) => {
    console.log("callback ", data);
    // alert("submit successful");
    context.showToast("Submit successful");
};

const deleteItem = (item: any, context: any) => {
    console.log("delete it", item.id);    
    context.showToast("Delete successful");
};

const handleSearch = (searchText: string) => {
    const lowerSearch = searchText.toLowerCase();
    fetchUsers(lowerSearch);
};

onMounted(async () => {
    fetchUsers();
});

</script>