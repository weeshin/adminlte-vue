<template>
  <component :is="renderTh" />
</template>
  
<script setup lang="ts">
import { hSlot } from '@/utils/render';
import { ColumnProps } from './types';
import { h, computed, getCurrentInstance, defineProps, defineSlots, defineEmits } from 'vue';

const props = defineProps<{
  props: ColumnProps,
  autoWidth: boolean
}>();

const slots = defineSlots();

const emit = defineEmits(['click']);

const vm = getCurrentInstance();

const $q = vm?.appContext.config.globalProperties.$q;

const onClick = (evt: Event) => {
  emit('click', evt);
};

const headerClass = computed(() => {
  let alignmentClass = '';
  if (props.props.textAlign) {
    alignmentClass = `text-${props.props.textAlign}`;
  }

  return 'nix-table-col-auto-width'
  + (props.props.headerBold === true ? ' nix-col-header-bold' : '')
  + ` ${alignmentClass}`;
});



const renderTh = () => {
  const col: ColumnProps = props.props;  

  // console.log(headerClass);

  const data = {
    class: headerClass.value,
    style: col.headerStyle,
    onClick: (evt: Event) => {
      if (col.sortable === true) {
        col.sort && col.sort(col);
        onClick(evt);
      }
    }
  }

  return h('th', data, hSlot(slots.default));
};
</script>

<style scoped>
.nix-table-col-auto-width {
  width: auto;
}

.nix-col-header-bold {
  font-weight: bold;
}
</style>