<template>
    <div>
      <p>{{ someProp }}</p>
      <button @click="handleUpdate">Update</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    someProp: string;
  }>();
  
  const emit = defineEmits<{
    (event: 'update'): void;
  }>();
  
  const handleUpdate = () => {
    emit('update');
  };
  </script>
  