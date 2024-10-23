<template>
  <button type="button" class="btn" :class="[buttonStyle, buttonBlock, buttonSize, flatButton, disabledButton]" >
    <i v-if="icon" :class="icon"></i>
    <slot></slot>      
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const props = defineProps<{
    btnStyle?: string,
    block?: boolean,
    flat?: boolean,
    disabled?: boolean,
    size?: string,
    icon?: string,
}>();

const buttonStyle = computed(() => {
  switch (props.btnStyle) {
    case 'primary':
      return 'btn-primary';
    case 'success':
      return 'btn-success';
    case 'info':
      return 'btn-info';
    case 'danger':
      return 'btn-danger';
    case 'warning':
      return 'btn-warning';
    default:
      return 'btn-default';
  }
});

const buttonBlock = computed(() => {
  if (props.block) {
    return "btn-block";
  }
  return '';
});

const buttonSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 'btn-lg';
    case 'small':
      return 'btn-sm';
    case 'x-small':
      return "btn-xs";
    default:
      return '';
  }
});

const flatButton = computed(() => {
    if (props.flat) {
        return 'btn-flat';
    }
    return '';
});

const disabledButton = computed(() => {
  if (props.disabled) {
    return 'disabled';
  }
  return '';
});
</script>