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
import { computed, defineProps, defineExpose } from 'vue';


defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});


const sidebarSkin = computed(() => 'sidebar-dark-primary');

const onCollapse = () => {
  document.body.classList.add('sidebar-collapse');
};

const offCollapse = () => {
  document.body.classList.remove('sidebar-collapse');
};

const onShow = () => {  
  document.body.classList.add('sidebar-open');  
};

const onHide = () => {  
  document.body.classList.remove('sidebar-open');
};

// Use expose() to make onShow accessible to the parent component
defineExpose({
  onShow, onHide, onCollapse, offCollapse
});
</script>

<style scoped>
/* Ensures the sidebar has a visible outline when focused */
.main-sidebar {
  outline: none;
}

.main-sidebar:focus {
  outline: 2px solid rgba(75, 192, 192, 0.5);
}
</style>