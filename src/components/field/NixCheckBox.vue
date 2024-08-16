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
  const checkBox = h('input', {
    class: 'form-check-input',
    type: 'checkbox',
    id: props.id,
    checked: props.modelValue,
    onChange: onChange,
  });
  const label = h('label', { 
    class: 'form-check-label', 
    for: props.id 
  }, props.label);

  const body = [checkBox, label];
  return h('div', { class: 'form-check' }, body);
};

</script>

<style scoped>
</style>
