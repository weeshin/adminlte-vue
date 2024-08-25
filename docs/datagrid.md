# DataGrid

The **DataGrid** component is a versatile, highly customizable table component designed for displaying tabular data with advanced functionalities. It is suitable for a variety of use cases, including dashboards, admin panels, and any interface requiring data presentation with interaction capabilities.

## Key Features
- **Customizable Columns:** Users can define the structure and content of columns, allowing for flexible display of different types of data.
- **Pagination:** Built-in pagination controls to handle large datasets efficiently. The component dynamically updates when pagination data changes.
- **Search and Filtering:** Integrated search functionality allows users to quickly find records by typing into a search box, with results updating in real-time.
- **Loading State:** Visual indicators for loading states, making it clear when data is being fetched or processed.
- **Actionable Rows:** Supports action buttons (like edit, delete) for each row, making it easy to perform operations on individual data entries.
Responsive Design: The DataGrid component is responsive, ensuring usability across different screen sizes.

### Props
- **data (Array):** The dataset to be displayed in the grid.
- **columns (Array):** Configuration for columns, including titles, keys, and custom renderers.
- **loading (Boolean):** Indicates whether the data is currently being loaded.
- **pagination (Object):** Configuration object for pagination, including current page, total entries, and entries per page.
- **searchQuery (String):** The current search term to filter the displayed data.
- **actions (Object):** Configuration for row actions, such as edit, delete, etc.

### Slots
- **default:** Slot for rendering the table body, typically used to customize how each row and cell is rendered.
- **loading:** Slot for displaying custom loading indicators when data is being fetched.
- **pagination:** Slot for customizing the pagination controls.

### Methods
- **emitSearchQuery:** Emits the search query event when the user types in the search box, allowing for real-time filtering of data.
- **showModal(type):** Triggers a modal dialog (e.g., for creating new entries), with the type specifying the action.

## Example Usage
````vue
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <NixDataGrid
            title="Test Report"
            :columns="columnNames"
            :entriesPerPage="10"
            :dataSource="users"
            :bordered="true"
            :pagination="true"
            :formGroups="formFieldGroups"
            :formProps="formProps"
            @formSubmit="onSubmit"
            @searchQuery="handleSearch"
            @itemDelete="onDelete"
          >
          </NixDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { FormConfig } from "../components/FormConfig";
import { NixDataGrid, NixColumn } from "@/components/datagrid";

const columnNames = ref([
  { field: "username", header: "Username", headerBold: true },
  { field: "fullname", header: "Fullname" },
  { field: "email", header: "Email" },
  { field: "roles", header: "Roles", textAlign: "right" },
  { header: "Actions", field: "actions", headerBold: true, textAlign: "right" },
]);

const formFieldGroups = ref([
  {
    groupName: "Personal Information",
    fields: [
      { field: "username", label: "Username", type: "text" },
      { field: "email", label: "Email", type: "text" },
      { field: "fullname", label: "Fullname", type: "text" },
      {
        field: "role",
        label: "Role",
        type: "checkbox-options",
        options: [
          { value: "role_1", label: "Role 1" },
          { value: "role_2", label: "Role 2" },
          { value: "role_3", label: "Role 3" },
          { value: "role_4", label: "Role 4" },
        ],
      },
      {
        field: "gender",
        label: "Gender",
        type: "radio-options",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "female" },
        ],
      },
      { field: "married", label: "Married", type: "checkbox" },
    ],
  },
  {
    groupName: "Contact Information",
    fields: [
      { field: "address", label: "Address", type: "text" },
      { field: "state", label: "State", type: "text" },
      { field: "city", label: "City", type: "text" },
      { field: "country", label: "Country", type: "text" },
    ],
  },
  {
    groupName: "Career",
    fields: [
      { field: "company", label: "Company", type: "text" },
      { field: "startDate", label: "Start date", type: "date" },
      { field: "endDate", label: "End date", type: "month" },
    ],
  },
  {
    groupName: "Education",
    fields: [
      { field: "education", label: "Education", type: "text" },
      { field: "startDate", label: "Start date", type: "date" },
      { field: "endDate", label: "End date", type: "date" },
    ],
  },
]);

const formProps = ref({
  modalCreationTitle: "N Create form",
  modalUpdateTitle: "N Update form",
  formGroups: formFieldGroups,
});
const users = ref([]);

const fetchUsers = async (searchText?: string) => {
  try {
    const response = await axios.get("/data/users.json");
    users.value = response.data;    
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const formConfig: FormConfig = {
  title: "Test Form",
  fields: [
    { model: "username", label: "Username", type: "text" },
    { model: "fullname", label: "Full Name", type: "text" },
    { model: "email", label: "Email", type: "email" },
    { model: "ic", label: "IC/Password", type: "text" },
    { model: "gender", label: "Gender", type: "text" },
    { model: "dob", label: "D.O.B", type: "text" },    
  ],
};

const editRow = (row: Record<string, any>) => {
  console.log("Edit row:", row);
};

const onDelete = (row: Record<string, any>) => {
  console.log("Delete row:", row);
};

const handleSearch = (searchText: string) => {  
  const lowerSearch = searchText.toLowerCase();
  users.value = users.value.filter((v: any) =>
    v.username.toLowerCase().startsWith(searchText.toLowerCase())
  );
  if (searchText === "") {
    fetchUsers(lowerSearch);
  }  
};

const onSubmit = (formdData: any) => {
  console.log("Tables: form data", JSON.stringify(formdData));
};

onMounted(async () => {
  fetchUsers();
});
</script>

````