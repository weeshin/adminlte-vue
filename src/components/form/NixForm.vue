<!-- <template>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <slot></slot>
    </form>
</template> -->
<template>
  <component :is="renderForm" />
</template>

<script setup lang="ts">
import { h, defineEmits } from 'vue';
import { hSlot } from '@/utils/render';
  
const slots = defineSlots();

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'reset'): void;
  (e: 'validation-success'): void;
  (e: 'validation-error'): void;
}>();

const onSubmit = (event: Event) => {
    event.preventDefault();
    // Perform validation
    const isValid = true; // Replace with actual validation logic

    if (isValid) {
        emit('validation-success');
        emit('submit');
        resetFields(event);
    } else {
        emit('validation-error');
    }
};

const onReset = (event: Event) => {
    event.preventDefault();
    emit('reset');
    resetFields(event);
};

// Function to reset form fields
const resetFields = (event: Event) => {
  const form = event?.target as HTMLFormElement;
  if (form) {
    form.reset();
  }
};

const renderForm = () => {
  return h(
    'form',
    {
      onSubmit,
      onReset,
    },
    [hSlot(slots.default)]
  );
};
</script>
  