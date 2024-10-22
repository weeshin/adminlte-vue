<template>
<ul class="products-list product-list-in-card pl-2 pr-2">    
    <slot v-for="item in items" :item="item" :key="item.id">
    </slot>
</ul>
</template>
  
<script setup lang="ts">
defineProps<{
    items: any[];
}>();
</script>

<style scoped>
/* Add some custom styling for your NixList if needed */
</style>
  