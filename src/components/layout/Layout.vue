<template>
  <div :class="['wrapper']">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li v-for="item in topbarMenuItems" class="nav-item d-none d-sm-inline-block">
          <router-link :to="item.path" class="nav-link">
            {{ item.name }}
          </router-link>
        </li>
        
      </ul>
    </nav>

    
    <MenuSidebar :menu-items="menuItems" v-if="drawerVisible"/>    
    
    <!-- Main Content -->
    <div :class="['content-wrapper']">
      <slot></slot>  
    </div>
    
    <Footer version="1.0" shortname="AdminLte-vue3" url="https://example.com" />
    
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import MenuSidebar from '@/components/layout/MenuSidebar.vue';
import Footer from '@/components/layout/Footer.vue';

defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  topbarMenuItems: {
    type: Array<any>,
    required: false
  }
});

const drawerVisible = ref(true); // Control the visibility of the drawer

// const topbarMenuItems = [
//   {
//     name: 'Main',
//     path: 'dashboard'
//   }
// ];

</script>

<style scoped>

</style>