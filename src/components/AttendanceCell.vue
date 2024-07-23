<template>
    <div @click="toggleModal">
        <div>{{ truncatedData }}</div>

        <!-- Modal -->
        <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block;">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-body">
                    <p>{{ props.data }}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const props = defineProps<{
    data: string
}>();

const showModal = ref(false);

const toggleModal = () => {
    showModal.value = !showModal.value;
}

const truncatedData = computed(() => {
  return props.data.length > 3 ? `${props.data.substring(0, 3)}...` : props.data;
});
</script>

<style scoped>
.popover-content {
  position: fixed;
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 200px;
}
.popover-header {
  font-weight: bold;
  margin-bottom: 5px;
}
.popover-body {
  font-size: 14px;
}
</style>