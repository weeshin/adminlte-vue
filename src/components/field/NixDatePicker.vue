<script setup lang="ts">
import { h, ref, defineProps } from 'vue';


const props = defineProps<{    
  modelValue: Date,
  label?: string;
  type?: string
}>();

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

const renderDatePicker = () => {
  
  return h('div', { class: 'form-group' }, [
    props.label ? h('label', {}, props.label) : h('label', {}, 'Date range:'),    
    h('div', { class: 'input-group' }, [
      h('div', { class: 'input-group-prepend' }, [
        h('span', { class: 'input-group-text' }, [
          h('i', { class: 'far fa-calendar-alt' })
        ])
      ]),
      h('input', {
        type: props.type? props.type : 'date' ,
        class: 'form-control float-right',  
        value: props.modelValue,
        onInput: onInput
      }),
            
    ])
  ]);
};

</script>

<template>  
  <component :is="renderDatePicker" />
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
