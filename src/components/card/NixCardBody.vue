<template>
  <component :is="render"/>
</template>

<script setup lang="ts">
import { h, defineSlots } from 'vue';
import { hSlot } from '@/utils/render';

const slots = defineSlots();

const render = () => {
  return h('div', { class: 'card-body table-responsive' }, hSlot(slots.default))
};
</script>