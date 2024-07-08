<template>
  <div class="row">
    <div class="col-5 col-lg-4 col-md-5">
      <Card :title="availableItemTitle" tools-btn="off">        
        <input type="text" v-model="availableFilter" placeholder="Filter items..." class="form-control mb-2"/>
        <div class="list-group listbox-content">
          <a href="#" v-for="(v, index) in filteredAvailableItems" :key="index"
            class="list-group-item list-group-item-action"               
              @click="selectAvailableItem(v)">
              {{ v }}
          </a>
        </div>
        
      </Card>
    </div>
    <div class="col-2 col-lg-1 col-md-2 d-flex flex-column justify-content-center align-items-center">
      <button class="btn btn-primary mb-2" @click="moveToSelected">
        <i class="fas fa-angle-right"></i>
      </button>      
      <button class="btn btn-primary" @click="moveToAvailable">
        <i class="fas fa-angle-left"></i>
      </button>
    </div>    
    <div class="col-5 col-lg-4 col-md-5">
      <Card :title="selectedItemTitle" tools-btn="off">        
        <div class="list-group listbox-content">
          <a href="#" v-for="(item, index) in selectedItems" :key="index"
            class="list-group-item list-group-item-action" 
            :class="{ active: selectedSelectedItems.includes(item) }"
            @click="selectSelectedItem(item)">
              {{ item }}
          </a>
        </div>        
      </Card>
    </div>
  </div>

</template>
  
<script setup lang="ts">
  import { ref, defineProps, defineEmits, toRefs, computed } from 'vue';
  import Card from './card.vue';

  const props = defineProps({
    availableItemTitle: {
      type: String,
      required: true
    },
    selectedItemTitle: {
      type: String,
      required: true
    },
    availableItems: {
      type: Array<string>,
      required: true
    },
    selectedItems: {
      type: Array<string>,
      required: true
    }
  });

  
  const emit = defineEmits(['update:availableItems', 'update:selectedItems']);

  const { availableItems, selectedItems } = toRefs(props);
  const selectedAvailableItems = ref<string[]>([]);
  const selectedSelectedItems = ref<string[]>([]);

  const availableFilter = ref('');

  const filteredAvailableItems = computed(() => {
    return availableItems.value.filter(item => 
      item.toLowerCase().includes(availableFilter.value.toLowerCase())
    );
  });

  const selectAvailableItem = (item: string) => {
    if (selectedAvailableItems.value.includes(item)) {
      selectedAvailableItems.value = selectedAvailableItems.value.filter(i => i !== item);
    } else {
      selectedAvailableItems.value.push(item);
    }
  };

  const selectSelectedItem = (item: string) => {
    if (selectedSelectedItems.value.includes(item)) {
      selectedSelectedItems.value = selectedSelectedItems.value.filter(i => i !== item);
    } else {
      selectedSelectedItems.value.push(item);
    }
  };

  const moveToSelected = () => {
    emit('update:selectedItems', [...selectedItems.value, ...selectedAvailableItems.value]);
    emit('update:availableItems', availableItems.value.filter(item => !selectedAvailableItems.value.includes(item)));
    selectedAvailableItems.value = [];
  };

  const moveToAvailable = () => {
    emit('update:availableItems', [...availableItems.value, ...selectedSelectedItems.value]);
    emit('update:selectedItems', selectedItems.value.filter(item => !selectedSelectedItems.value.includes(item)));
    selectedSelectedItems.value = [];
  };

</script>
  
<style scoped>
.listbox-content {
  max-height: 200px;
  min-height: 200px;
  overflow-y: auto;
}

.list-group-item.active {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
  