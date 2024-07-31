<template>
    <div>
      <button @click="showModal = true">Open Modal</button>
  
      <NixModal 
				:show="showModal"
				title="My Form"
				@close="showModal = false"
			>
        <template v-slot:default>
          <NixForm
							@submit="handleSubmit"
              @reset="handleReset" 
              @validation-success="handleValidationSuccess" 
              @validation-error="handleValidationError">
            <NixFormGroup :columns="2" caption="Personal Information">
              <template #default>
                <NixTextField
                  :modelValue="formData.firstName"
                  @update:modelValue="formData.firstName = $event"
                  label="First Name"
                  id="first-name"
                  :validateField="validateFirstName"
                />
                <NixTextField 
                  :modelValue="formData.lastName"
                  @update:modelValue="formData.lastName = $event"
                  label="Last Name"
                  id="last-name"
                  :validate-field="validateLastName"/>
              </template>
            </NixFormGroup>
						<NixFormGroup :columns="2" caption="Contact Information">
              <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" class="form-control" v-model="formData.address" />
              </div>
              <div class="form-group">
                <label for="country">Country</label>
                <input type="text" id="country" class="form-control" v-model="formData.country" />
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <input type="text" id="state" class="form-control" v-model="formData.state" />
              </div>              
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" class="form-control" v-model="formData.city" />
              </div>
            </NixFormGroup>
            <NixOptionGroup
              :modelValue="formData.selectedOption"
              @update:modelValue="(value: any) => formData.selectedOption = value"
              :options="radioOptions"
              label="Choose an option"
              type="radio"
              name="exampleRadio"
              :validateField="validateSelection"
            />
            <NixOptionGroup
              :modelValue="formData.selectedCheckboxes"
              @update:modelValue="(value: any) => formData.selectedCheckboxes = value"
              :options="checkboxOptions"
              label="Choose multiple options"
              type="checkbox"
              name="exampleCheckbox"
              :validateField="validateSelection"
            />

            <NixDropDown
              :modelValue="formData.dropdownOption"
              @update:modelValue="(value: any) => formData.dropdownOption = value"
              :options="dropdownOptions"
              label="Choose an option"
              :validateField="validateSelection"
            />
            <div class="text-right">
						  <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </NixForm>
        </template>

				<!-- <template v-slot:footer>
					<div>
						<button class="btn btn-secondary" @click="showModal = false">Close</button>
          </div>
				</template> -->
      </NixModal>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import NixForm from '@/components/form/NixForm.vue';
import NixFormGroup from '@/components/form/NixFormGroup.vue';
import NixModal from '@/components/modal/NixModal.vue';
import NixTextField from '@/components/field/NixTextField.vue';
import NixOptionGroup from '@/components/field/NixOptionGroup.vue';
import NixDropDown from '@/components/field/NixDropDown.vue';

const showModal = ref(false);

const formData = ref({
	firstName: '',
	lastName: '',
	address: '',
	country: '',
  state: '',
  city: '',
  selectedOption: '',
  selectedCheckboxes: [] as string[],
  dropdownOption: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  showModal.value = false;
};

const handleReset = () => {
  console.log('Form reset');
  formData.value = {
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    selectedOption: '',
    selectedCheckboxes: [],
    dropdownOption: ''
  };
};

const handleValidationSuccess = () => {
  console.log('Validation successful');
};

const handleValidationError = () => {
  console.log('Validation error');
};

const validateFirstName = (value: string) => {
  if (!value) {
    return 'First name is required';
  }
  if (value.length < 2) {
    return 'First name must be at least 2 characters';
  }
  return null;
};

const validateLastName = (value: string) => {
  if (!value) {
    return 'Last name is required';
  }
  if (value.length < 3) {
    return 'Last name must be at least 3 characters';
  }
  return null;  
};

const radioOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const checkboxOptions = [
  { value: 'checkbox1', label: 'Checkbox 1' },
  { value: 'checkbox2', label: 'Checkbox 2' },
  { value: 'checkbox3', label: 'Checkbox 3' },
  { value: 'checkbox4', label: 'Checkbox 4' },
];

const dropdownOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const validateSelection = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? null : 'At least one option must be selected';
  } else {
    return value ? null : 'An option must be selected';
  }
};
</script>
  
<style scoped>
.form-component {
	margin-bottom: 1rem;
}
</style>
  