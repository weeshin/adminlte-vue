<template>  
  <component :is="renderModal" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, h, getCurrentInstance, watch } from 'vue';
import NixModal from '@/components/modal/NixModal.vue';
import { NixTextField, NixDropDown, NixOptionGroup, NixDatePicker, NixCheckBox } from '@/components/field';
import NixFormGroup from '../form/NixFormGroup.vue';
import { DataGridFormProps } from './types';

const props = defineProps<{
  show: boolean;    
  currentRecord: Record<string, any> | null;  
  formProps: DataGridFormProps;
}>();

const emit = defineEmits(['close', 'submit']);
const formData = ref<Record<string, any>>({});

const initializeFormData = () => {
  console.log(props.formProps.formGroups);
  if (props.currentRecord) {
    formData.value = { ...props.currentRecord };
  } else {
    props.formProps.formGroups.forEach(group => {
      group.fields.forEach(field => {
        formData.value[field.field] = null;
      });    
    });
  }
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    initializeFormData();
  }
}, { immediate: true });


const closeModal = () => {
  emit('close');  
};

const handleSubmit = () => {
  // Perform validation here
  const isValid = true; // Replace with actual validation logic

  if (isValid) {    
    emit('submit', formData.value);    
  } else {
    // Handle validation error
  }
};


const renderFormBody = () => {  
  const body = h('div', {}, props.formProps.formGroups.map(group => {
    const formGroupProps = {
      columns: 2,
      caption: group.groupName
    };

  return h(NixFormGroup, formGroupProps, 
    group.fields.map(field => {      

      if (field.type === 'text') {
        const fieldProps = {
          id: field.field,
          modelValue: formData.value[field.field],
          'onUpdate:modelValue': (value: any) => {
            formData.value[field.field] = value;
          },
          label: field.label,
          validateField: () => { return null }  
        };

        return h(NixTextField, fieldProps);
      }

      if (field.type === 'radio-options' || field.type === 'checkbox-options') {
        const optionFieldProps = {
          modelValue: formData.value[field.field],
          'onUpdate:modelValue': (value: any) => formData.value[field.field] = value,
          options: field.options ?? [],
          label: field.label,
          type: (field.type === 'radio-options') ? 'radio' : 'checkbox',
          name: field.field,
          validateField: () => null
        };
        return h(NixOptionGroup, optionFieldProps);
      }
      
      if (field.type === 'select') {
        const dropdownFieldProps = {
          modelValue: formData.value[field.field],
          'onUpdate:modelValue': (value: any) => formData.value[field.field] = value,
          options: field.options ?? [],
          label: field.label,
          validateField: () => null
        };
        return h(NixDropDown, dropdownFieldProps);
      }

      if (field.type === 'date' || field.type === 'month') {
        const datepickerProps = {
          modelValue: formData.value[field.field],
          'onUpdate:modelValue': (value: any) => formData.value[field.field] = value,
          label: field.label,
          type: field.type
        };

        return h(NixDatePicker, datepickerProps);
      }

      if (field.type === 'checkbox') {
        const checkboxProps = {
          modelValue: formData.value[field.field],
          'onUpdate:modelValue': (value: any) => formData.value[field.field] = value,
          label: field.label
        };

        return h(NixCheckBox, checkboxProps);
      }
    }));
  }));

  return body;
};

const renderModal = () => {
  const body = renderFormBody();
  return h(NixModal, {
    show: props.show,
    title: (props.currentRecord === null) ? props.formProps['modalCreationTitle'] : props.formProps['modalUpdateTitle'],
    onClose: closeModal
  }, {
    header: () => h('h5', { class: 'modal-title' }, 'Create Record'),
    body: () => h('div', {}, [body]),
    footer: () => [
      h('button', { class: 'btn btn-secondary', onClick: closeModal }, 'Close'),
      h('button', { class: 'btn btn-primary', onClick: handleSubmit }, 'Save changes')
    ]
  });
};
</script>
