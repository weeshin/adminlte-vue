<template>
  <div :class="['wrapper']" @click="handleOutsideClick">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
            <button class="nav-link" role="button" @click.stop="onToggleMenuSidebar">
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

    
    <MenuSidebar ref="menuSidebar" :menu-items="menuItems" :class="['main-sidebar']"/>    
    
    <!-- Main Content -->
    <div :class="['content-wrapper']">
      <slot></slot>  
    </div>
    
    <Footer version="1.0" shortname="AdminLte-vue3" url="https://example.com" />
    
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import MenuSidebar from '@/components/layout/MenuSidebar.vue';
import Footer from '@/components/layout/Footer.vue';

const menuSidebar = ref();

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

onMounted(async () => {
  document.body.classList.add('sidebar-mini');  
  document.body.classList.add('layout-fixed');    
  drawerVisible.value = true;
  menuSidebar.value?.offCollapse();      
  menuSidebar.value?.onShow();     
});

const onToggleMenuSidebar = () => {  
  drawerVisible.value = !drawerVisible.value;
  // console.log("onToggleMenuSidebar click ", drawerVisible.value);
  // Toggle the class on the body
  if (drawerVisible.value) {    
    menuSidebar.value?.offCollapse();      
    menuSidebar.value?.onShow();   
  } else {    
    menuSidebar.value?.onCollapse();    
    menuSidebar.value?.onHide();
  }
};

// Handle clicks outside the sidebar
const handleOutsideClick = (event: MouseEvent) => {
  const sidebar = menuSidebar.value?.$el;
  if (sidebar && !sidebar.contains(event.target as Node)) {
    // If the click is outside the sidebar, hide it
    if (drawerVisible.value) {
      drawerVisible.value = false;
      // document.body.classList.add('sidebar-collapse');
      menuSidebar.value?.onHide(); // Hide the sidebar
    }
  }
};
</script>

<style scoped>

</style>