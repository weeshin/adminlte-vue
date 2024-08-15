<template>
    <component :is="renderCheckbox" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, h } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  label: string;
  id?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.checked);
};

const renderCheckbox = () => {
  return h('div', { class: 'form-check' }, [
    h('input', {
      class: 'form-check-input',
      type: 'checkbox',
      id: props.id,
      checked: props.modelValue,
      onChange: onChange,
    }),
    h('label', { 
      class: 'form-check-label', 
      for: props.id 
    }, props.label)
  ]);
};

</script>

<style scoped>
.form-check-input {
  margin-right: 0.5rem;
}
</style>
