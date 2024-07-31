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
                <div class="form-group">
                  <label for="first-name">First Name</label>
                  <input type="text" id="first-name" class="form-control" v-model="formData.firstName" />
                </div>
                <div class="form-group">
                  <label for="last-name">Last Name</label>
                  <input type="text" id="last-name" class="form-control" v-model="formData.lastName" />
                </div>
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

const showModal = ref(false);

const formData = ref({
	firstName: '',
	lastName: '',
	address: '',
	country: '',
  state: '',
  city: ''
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
    city: ''
  };
};

const handleValidationSuccess = () => {
  console.log('Validation successful');
};

const handleValidationError = () => {
  console.log('Validation error');
};
</script>
  
<style scoped>
.form-component {
	margin-bottom: 1rem;
}
</style>
  