<template>
  <aside v-if="menuItems" class="main-sidebar elevation-4" :class="sidebarSkin">
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <MenuItem v-for="item in menuItems" :menuItem="item"></MenuItem>
        </ul>
      </nav>
    </div>
  </aside>
</template>


<script setup lang="ts">
import MenuItem from '@/components/layout/MenuItem.vue';
import { computed, defineProps } from 'vue';

defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});


const sidebarSkin = computed(() => 'sidebar-dark-primary');
</script>