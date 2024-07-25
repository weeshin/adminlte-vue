<template>
    <div class="modal fade" :class="{ show: isVisible, fade: !isVisible }" tabindex="-1" role="dialog" style="display: block;" v-if="isVisible">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
            <button type="button" class="close" @click="hide">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body overflow-hidden">
            <slot></slot>
          </div>
          <div class="modal-footer justify-content-between">
            <slot name="footer">
                <button type="button" class="btn btn-danger text-uppercase" style="letter-spacing: 0.1em;" @click="hide">Cancel</button>
                <button type="button" class="btn btn-info text-uppercase" style="letter-spacing: 0.1em;" @click="$emit('submit')">Submit</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{ title: string, isVisible: boolean }>();
const emit = defineEmits(['submit', 'hide']);

const hide = () => {
emit('hide');
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
  