<template>  
  <component :is="renderModal" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, h, getCurrentInstance, watch } from 'vue';
import NixModal from '@/components/modal/NixModal.vue';
import NixTextField from '@/components/field/NixTextField.vue';
import NixFormGroup from '../form/NixFormGroup.vue';
import { FormGroupProps } from './types';

const props = defineProps<{
  show: boolean;  
  formGroups: FormGroupProps[]
}>();

const vm = getCurrentInstance();
const formData = ref<Record<string, any>>({});

const initializeFormData = () => {
  console.log(props.formGroups);
  props.formGroups.forEach(group => {
    group.fields.forEach(field => {
      formData.value[field.field] = '';
    });    
  });
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    initializeFormData();
  }
}, { immediate: true });


const closeModal = () => {
  // emit('close');
  vm?.emit('close');
};

const handleSubmit = () => {
  // Perform validation here
  const isValid = true; // Replace with actual validation logic

  if (isValid) {
    vm?.emit('submit', formData.value);
  } else {
    // Handle validation error
  }
};


const renderFormBody = () => {  
  const body = h('div', {}, props.formGroups.map(group => {
    const formGroupProps = {
      columns: 2,
      caption: group.groupName
    };

    return h(NixFormGroup, formGroupProps, 
      group.fields.map(field =>{
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
    }));
  }));

  return body;
};

const renderModal = () => {
  const body = renderFormBody();
  return h(NixModal, {
    show: props.show,
    title: "Create title",
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
