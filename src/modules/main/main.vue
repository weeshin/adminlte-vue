<template>
    <div class="wrapper">
        <app-header></app-header>
        <menu-sidebar></menu-sidebar>
        <div class="content-wrapper">        
            <router-view></router-view>
        </div>
        <app-footer version="v1.0" shortname="AdminLTE-Vue3.io"></app-footer>
    </div>
</template>

<script lang="ts">
import Header from './header/header.vue';
import Footer from '@components/Footer.vue';
import MenuSidebar from './menu-sidebar/menu-sidebar.vue';

export default {
  components: {
    'app-header': Header,
    'menu-sidebar': MenuSidebar,
    'app-footer': Footer
  },
};

</script>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed, watch} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const appElement = ref<HTMLElement | null>(null);

// Reactive reference for uiValues
const uiValues = computed(() => ({
  darkModeSelected: store.getters['ui/darkModeSelected'],
  menuSidebarCollapsed: store.getters['ui/menuSidebarCollapsed'],
  controlSidebarCollapsed: store.getters['ui/controlSidebarCollapsed'],
  screenSize: store.getters['ui/screenSize']
}));

watch(uiValues, (newValue) => {
  console.log('uiValues changed:', newValue);
  const {
    darkModeSelected,
    menuSidebarCollapsed,
    controlSidebarCollapsed,
    screenSize
  } = newValue;

  if (!appElement.value) {
    return;
  }
  appElement.value.classList.remove('dark-mode');
  appElement.value.classList.remove('sidebar-closed');
  appElement.value.classList.remove('sidebar-collapse');
  appElement.value.classList.remove('sidebar-open');
  appElement.value.classList.remove('control-sidebar-slide-open');

  if (darkModeSelected) {
    appElement.value.classList.add('dark-mode');
  }

  if (!controlSidebarCollapsed) {
    appElement.value.classList.add('control-sidebar-slide-open');
  }

  if (menuSidebarCollapsed && screenSize === 'lg') {
    appElement.value.classList.add('sidebar-collapse');
  } else if (menuSidebarCollapsed && screenSize === 'xs') {
    appElement.value.classList.add('sidebar-open');
  } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
    appElement.value.classList.add('sidebar-closed');
    appElement.value.classList.add('sidebar-collapse');
  }
});

onMounted(async ()=> {
  appElement.value = document.getElementById('app') as HTMLElement;
  appElement.value.classList.add('sidebar-mini');
  appElement.value.classList.add('layout-fixed');
});

onUnmounted(async () => {
  appElement.value = document.getElementById('app') as HTMLElement;
  appElement.value.classList.remove('sidebar-mini');
  appElement.value.classList.remove('layout-fixed');
});

// const toggleMenuSidebar = () => {
//   store.getters['ui/toggleMenuSidebar'];
// };
</script>
