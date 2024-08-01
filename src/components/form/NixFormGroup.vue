<template>
  <component :is="renderGroup" />
</template>
  
<script setup lang="ts">
  
import { defineProps, h, defineSlots, useSlots } from 'vue';
  
const props = defineProps<{
  columns?: number;
  caption?: string;
}>();

const slots = useSlots();
// const slots = defineSlots();

const renderGroup = () => {
  const children = [];

  if (props.caption) {
    children.push(h('h4', props.caption));
  }

  const slotContent = slots.default ? slots.default() : [];
  const wrappedChildren: any = [];

  slotContent.forEach((v, index) => {
    wrappedChildren.push(h('div', { class: 'col col-6', key: index}, v));
  });

  children.push(h('div', { class: 'row' }, wrappedChildren));

  return h('div', children);
};
</script>
  
  