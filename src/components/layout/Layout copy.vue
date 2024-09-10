<template>
  <div :class="['wrapper', { 'sidebar-collapsed': !drawerVisible }]">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <button class="nav-link" role="button" @click="onToggleMenuSidebar">
            <i class="fas fa-bars"></i>
          </button>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/" class="nav-link">
            {{ $t("labels.home") }}                      
          </router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/" class="nav-link">
            {{ $t("labels.contact") }}                      
          </router-link>
        </li>
      </ul>
    </nav>

    
    <!-- <MenuSidebar v-if="drawerVisible"/>     -->
    
    <!-- Main Content -->
    <div :class="['content-wrapper', { 'expanded': !drawerVisible }]">
      <slot></slot>
    </div>

    
    <!-- <Footer version="1.0" shortname="AdminLte-vue3" url="https://example.com" /> -->
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuSidebar from '@/components/layout/MenuSidebar.vue';
import Footer from '@/components/layout/Footer.vue';

const drawerVisible = ref(true); // Control the visibility of the drawer

const onToggleMenuSidebar = () => {    
  console.log("onToggleMenuSidebar");
  drawerVisible.value = !drawerVisible.value;
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all 0.3s ease;
}

.main-header {
  z-index: 1030;
  position: fixed;
  width: 100%;
  top: 0;
}

.menu-sidebar {
  width: 250px;
  transition: width 0.3s ease, opacity 0.3s ease;
}

.content-wrapper {
  /* flex-grow: 1;
  margin-top: 56px; 
  transition: margin-left 0.3s ease; */
}

.sidebar-collapsed .menu-sidebar {
  width: 0;
  opacity: 0;
}

.sidebar-collapsed .content-wrapper {
  margin-left: 0;
}

.expanded {
  width: 100%;
}
</style>