<template>
    <component :is="renderField" />
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, h, ref, watch } from 'vue';
  
  const props = defineProps<{
    modelValue: string;
    label: string;
    id: string;
    validateField: (value: string) => string | null;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const validationError = ref<string | null>(null);
  
  const validate = () => {
    validationError.value = props.validateField(props.modelValue);
  };
  
  watch(() => props.modelValue, validate);
  
  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  };
  
  const renderField = () => {
    return h('div', { class: 'form-group' }, [
      h('label', { for: props.id }, props.label),
      h('input', {
        type: 'text',
        id: props.id,
        class: ['form-control', { 'is-invalid': validationError.value }],
        value: props.modelValue,
        onInput: onInput        
      }),
      validationError.value ? h('div', { class: 'invalid-feedback' }, validationError.value) : null
    ]);
  };
  </script>
  
  <style scoped>
  .is-invalid {
    border-color: #dc3545;
  }
  
  .invalid-feedback {
    color: #dc3545;
  }
  </style>
  