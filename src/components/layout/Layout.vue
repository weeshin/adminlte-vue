<template>
  <div :class="['wrapper']">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
            <button class="nav-link" role="button" @click="onToggleMenuSidebar">
                <i class="fas fa-bars"></i>
            </button>
        </li>
        <li v-for="item in topbarMenuItems" class="nav-item d-none d-sm-inline-block">
          <router-link :to="item.path" class="nav-link">
            {{ item.name }}
          </router-link>
        </li>
        
      </ul>
    </nav>

    
    <MenuSidebar :menu-items="menuItems" />    
    
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

const onToggleMenuSidebar = () => {  
  drawerVisible.value = !drawerVisible.value;

  // Toggle the class on the body
  if (drawerVisible.value) {
    document.body.classList.remove('sidebar-collapse');
  } else {
    document.body.classList.add('sidebar-collapse');
  }
};


</script>

<style scoped>

</style>