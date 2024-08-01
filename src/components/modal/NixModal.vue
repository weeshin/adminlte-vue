<template>
  <component :is="renderModal" />
</template>

<script setup lang="ts">
import { ref, h, Transition } from 'vue';
import { hSlot } from '@/utils/render';

const props = defineProps<{
  show: boolean;
  title: string;
  width?: string;
}>();

const slots = defineSlots();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const renderModal = () => {
  if (!props.show) return null;

  const modalTitle = h('div', { class: 'modal-title' }, props.title);
  const closeButton = h('button', { class: 'close', onClick: closeModal }, '×');
  const modalHeader = h('div', { class: 'modal-header' }, [modalTitle, closeButton]);
  const modalBody = h('div', { class: 'modal-body overflow-hidden' }, hSlot(slots.body, slots.default));
  const modalFooter = h('div', { class: 'modal-footer justify-content-between' }, hSlot(slots.footer));
  const modalContent = h('div', { class: 'modal-content' }, [modalHeader, modalBody, modalFooter]);
  const modalDialog = h('div', { class: 'modal-dialog modal-lg modal-dialog-centered', role: 'document'}, [modalContent])


  return h('div', { 
    class: 'modal ' + (props.show ? 'show' : 'fade'), 
    tabindex: '-1', 
    role: 'dialog', 
    style: 'display: block;' 
  }, 
  modalDialog);

};


</script>

<script lang="ts">
export default {
  name: 'NixModal',
  render() {
    return h(Transition, { name: 'modal' }, renderModal);
  }
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}
.modal-dialog {
  max-height: 90vh; /* Adjust the max height to control the modal size */
}
.modal-body {
  overflow-y: auto;
  max-height: 60vh; /* Adjust the max height to control the scrollable area */
}

.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
}
</style>
