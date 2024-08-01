<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <NixDataGrid 
                        :columns="columnNames"
                        :entriesPerPage="10"
                        :dataSource="users"
                        :bordered="true"
                        :pagination="true"                        
                        :formGroups="formFieldGroups"
                        v-slot:edit="{ row }"
                        v-slot:delete="{ row }">      
                        <button class="btn btn-primary text-uppercase" style="letter-spacing: 0.1em;"
                             @click="editRow(row)"><i class="fas fa-edit"></i></button>                  
                        <button class="btn btn-danger text-uppercase ml-1" style="letter-spacing: 0.1em;"
                             @click="deleteRow(row)"><i class="fas fa-trash"></i></button>
                    </NixDataGrid>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { FormConfig } from '../components/FormConfig';
import { NixDataGrid, NixColumn } from '@/components/datagrid';


const columnNames = ref([
    { field: "username", header: "Username", headerBold: true}, 
    { field: "fullname", header: "Fullname"}, 
    { field: "email", header: "Email"}, 
    { field: "roles", header: "Roles", textAlign: 'right' },
    { header: 'Actions', field: 'actions', headerBold: true, textAlign: 'right' }  
]);


const formFieldGroups = ref([
    {
        groupName: "Personal Information",
        fields: [
            { field: "username", label: "Username", type: "text" }, 
            { field: "email", label: "Email", type: "email" }
        ]
    },
    {
        groupName: "Contact Information",
        fields: [
            { field: "address", label: "Address", type: "text" },
            { field: "state", label: "State", type: "text" },
            { field: "city", label: "City", type: "text" },
            { field: "country", label: "Country", type: "text" }
        ]
    }
]);

const users = ref([]);

const fetchUsers = async (searchText?: string) => {
    try {        
        const response = await axios.get('/data/users.json');
        users.value = response.data;
        // if(searchText) {
        //     users.value = users.value.filter(item => item.username.toLowerCase().includes(searchText))
        // }
        console.log("fetch users total records ", users.value.length);
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


const editRow = (row: Record<string, any>) => {
  console.log('Edit row:', row);
};

const deleteRow = (row: Record<string, any>) => {
  console.log('Delete row:', row);
};


// const handleSearch = (searchText: string) => {
//     const lowerSearch = searchText.toLowerCase();
//     fetchUsers(lowerSearch);
// };

onMounted(async () => {
    fetchUsers();
});

</script>