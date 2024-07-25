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
import { ref, onMounted } from 'vue';
import DataGrid from '@components/DataGrid.vue';
import axios from 'axios';
import { FormConfig } from '../components/FormConfig';

// const formConfig = userFormConfig;

const columnNames = ref([
    "username", "fullname", "email", "roles"
]);

const users = ref(
    [
    {
        "id": "1",
        "username": "ali",
        "fullname": "ali bin hassan",
        "email": "ali@knk.com.my",
        "mobile_no": "01763231234",
        "roles": ["1", "3"]
    },
    {
        "id": "2",
        "username": "kwan",
        "fullname": "Tan Ling Kwan",
        "email": "kwan@knk.com.my",
        "mobile_no": "017-7721234",
        "roles": ["3"]
    },
    {
        "id": "3",
        "username": "john",
        "fullname": "John Doe",
        "email": "john@knk.com.my",
        "mobile_no": "017-8123456",
        "roles": ["2"]
    },
    {
        "id": "4",
        "username": "jane",
        "fullname": "Jane Doe",
        "email": "jane@knk.com.my",
        "mobile_no": "017-9123456",
        "roles": ["1", "2"]
    },
    {
        "id": "5",
        "username": "mike",
        "fullname": "Mike Ross",
        "email": "mike@knk.com.my",
        "mobile_no": "017-5623456",
        "roles": ["2", "3"]
    },
    {
        "id": "6",
        "username": "susan",
        "fullname": "Susan White",
        "email": "susan@knk.com.my",
        "mobile_no": "017-6623456",
        "roles": ["1"]
    },
    {
        "id": "7",
        "username": "anna",
        "fullname": "Anna Smith",
        "email": "anna@knk.com.my",
        "mobile_no": "017-7623456",
        "roles": ["3"]
    },
    {
        "id": "8",
        "username": "david",
        "fullname": "David Brown",
        "email": "david@knk.com.my",
        "mobile_no": "017-8623456",
        "roles": ["2"]
    },
    {
        "id": "9",
        "username": "lisa",
        "fullname": "Lisa Green",
        "email": "lisa@knk.com.my",
        "mobile_no": "017-9623456",
        "roles": ["1", "2"]
    },
    {
        "id": "10",
        "username": "peter",
        "fullname": "Peter Black",
        "email": "peter@knk.com.my",
        "mobile_no": "017-1623456",
        "roles": ["3"]
    },
    {
        "id": "11",
        "username": "nancy",
        "fullname": "Nancy Gold",
        "email": "nancy@knk.com.my",
        "mobile_no": "017-2634567",
        "roles": ["2"]
    },
    {
        "id": "12",
        "username": "tom",
        "fullname": "Tom White",
        "email": "tom@knk.com.my",
        "mobile_no": "017-3634567",
        "roles": ["1"]
    },
    {
        "id": "13",
        "username": "sara",
        "fullname": "Sara Blue",
        "email": "sara@knk.com.my",
        "mobile_no": "017-4634567",
        "roles": ["3"]
    },
    {
        "id": "14",
        "username": "harry",
        "fullname": "Harry Potter",
        "email": "harry@knk.com.my",
        "mobile_no": "017-5634567",
        "roles": ["1", "3"]
    },
    {
        "id": "15",
        "username": "ron",
        "fullname": "Ron Weasley",
        "email": "ron@knk.com.my",
        "mobile_no": "017-6634567",
        "roles": ["2"]
    }
]

);

// onMounted(async () => {
//     try {
//         const response = await axios.get('/data/users.json');
//         users.value = response.data;
//     } catch(error) {
//         console.error('Error fetching users', error);
//     }
// });

const formConfig: FormConfig = {
  title: 'Test Form',
  fields: [
    { model: 'username', label: 'Username', type: 'text' },
    { model: 'fullname', label: 'Full Name', type: 'text' },
    { model: 'email', label: 'Email', type: 'email' },
    // { model: 'role', label: 'Role', type: 'select', options: [{ value: 'admin', text: 'Admin' }, { value: 'user', text: 'User' }] },
  ],
};

const handleOnSubmit  = (data: Record<string, any>, context: any) => {
    console.log("callback ", data);
    // alert("submit successful");
    context.showToast("Submit successful");
}

const deleteItem = (item: any, context: any) => {
    console.log("delete it", item.id);    
    context.showToast("Delete successful");
}

const handleSearch = (searchText: string) => {
    users.value = [
    {
        "id": "1",
        "username": "ali handler",
        "fullname": "ali bin hassan",
        "email": "ali@knk.com.my",
        "mobile_no": "01763231234",
        "roles": ["1", "3"]
    },
    {
        "id": "11",
        "username": "nancy",
        "fullname": "Nancy Gold",
        "email": "nancy@knk.com.my",
        "mobile_no": "017-2634567",
        "roles": ["2"]
    },];
}
</script>