<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, h } from 'vue';

const props = defineProps<{
  modelValue: string | string[];
  options: { value: string; label: string }[];
  label?: string;
  type: string;  
  name: string;
  validateField: (value: string | string[]) => string | null;
  colCount?: number;
}>();

const colCount = ref(props.colCount ?? 2);  // Default to 2 if not provided

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

const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  if (props.type === 'radio') {
    emit('update:modelValue', value);
  } else {    
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

// Function to render the component using h()
const renderComponent = () => {
  const formGroup = h('div', { class: 'form-group' }, [
    props.label ? h('label', props.label) : null,
    h('div', { class: 'row' }, 
      props.options.map(option => 
        h('div', { class: `col col-${12 / colCount.value} form-check`, key: option.value }, [
          h('input', {
            type: props.type,
            id: option.value,
            name: props.name,
            value: option.value,
            checked: isChecked(option.value),
            onChange,
            class: 'form-check-input'
          }),
          h('label', { for: option.value, class: 'form-check-label' }, option.label)
        ])
      )
    ),
    validationError.value ? h('div', { class: 'invalid-feedback' }, validationError.value) : null
  ]);

  return formGroup;
};
</script>

<template>
  <component :is="renderComponent" />
</template>

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
