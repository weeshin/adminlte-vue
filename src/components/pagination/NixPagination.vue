<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      {{ showingEntries }}
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click.prevent="previousPage">{{ $t('actionableDataTable.previous') }}</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click.prevent="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click.prevent="nextPage">{{ $t('actionableDataTable.next') }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  currentPage: number;
  totalEntries: number;
  entriesPerPage: number;
}>();

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void;
}>();

const { t } = useI18n();

const totalPages = computed(() => Math.ceil(props.totalEntries / props.entriesPerPage));
const startEntry = computed(() => (props.currentPage - 1) * props.entriesPerPage + 1);
const endEntry = computed(() => Math.min(props.currentPage * props.entriesPerPage, props.totalEntries));

const showingEntries = computed(() =>
  t('actionableDataTable.showingEntries', {
    startEntry: startEntry.value,
    endEntry: endEntry.value,
    totalEntries: props.totalEntries,
  })
);

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
};
</script>

<style scoped>
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}

.page-item.active .page-link {
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
