<template>
    <div class="form-group">
      <label v-if="label">{{ label }}</label>
      <div v-for="option in options" :key="option.value" class="form-check">
        <input
          :type="type"
          :id="option.value"
          :name="name"
          :value="option.value"
          :checked="isChecked(option.value)"
          @change="onChange"
          class="form-check-input"
        />
        <label :for="option.value" class="form-check-label">{{ option.label }}</label>
      </div>
      <div v-if="validationError" class="invalid-feedback">{{ validationError }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  
  const props = defineProps<{
    modelValue: string | string[];
    options: { value: string; label: string }[];
    label?: string;
    type: 'radio' | 'checkbox';
    name: string;
    validateField: (value: string | string[]) => string | null;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const validationError = ref<string | null>(null);
  
  const validate = () => {
    validationError.value = props.validateField(props.modelValue);
  };
  
  watch(() => props.modelValue, validate);
  
  const isChecked = (value: string) => {
    if (props.type === 'radio') {
      return props.modelValue === value;
    }
    return Array.isArray(props.modelValue) && props.modelValue.includes(value);
  };
  
  const onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    if (props.type === 'radio') {
      emit('update:modelValue', value);
    } else {
      const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
      if ((event.target as HTMLInputElement).checked) {
        currentValue.push(value);
      } else {
        const index = currentValue.indexOf(value);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      }
      emit('update:modelValue', currentValue);
    }
  };
  </script>
  
  <style scoped>
  .is-invalid {
    border-color: #dc3545;
  }
  
  .invalid-feedback {
    color: #dc3545;
  }
  
  .form-check {
    margin-bottom: 0.5rem;
  }
  </style>
  