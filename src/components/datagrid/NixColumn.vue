<template>
  <component :is="renderTd" />
</template>

<script setup lang="ts">
import { h, computed, defineProps, defineSlots } from 'vue';
import { ColumnProps } from './types';
import { hSlot } from '@/utils/render';

const props = defineProps<{
  props: ColumnProps,
  autoWidth: boolean,
  noHover: boolean
}>();

const slots = defineSlots();

const classes = computed(() => {
  let alignmentClass = '';
  if (props.props.textAlign) {
    alignmentClass = `text-${props.props.textAlign}`;
  }

  return 'td' + (props.autoWidth === true ? ' table--col-auto-width' : '')
    + (props.noHover === true ? ' td--no-hover' : '')
    + ` ${alignmentClass}`;
});

const renderTd = () => {  
  const data = {
    class: classes.value
  };
  

  // return h('td', data, hSlot(slots.default));
  return h('td', data, slots.default ? slots.default() : []);
};

</script>
