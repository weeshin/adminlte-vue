<template>
    <Layout :menu-items="menu" :topbar-menu-items="topbarMenuItems">
      <router-view></router-view>
    </Layout>
    <!-- <div class="wrapper">
        <app-header></app-header>
        <menu-sidebar></menu-sidebar>
        <div class="content-wrapper">        
            <router-view></router-view>
        </div>
        <app-footer version="v1.0" shortname="AdminLTE-Vue3.io"></app-footer>
    </div> -->
</template>

<script lang="ts">
import Layout from '@/components/layout/Layout.vue';
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
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();

const menu = [
    {
        name: t('labels.dashboard'),
        path: '/',
        children: [
            {
                name: t('labels.dashboard1'),
                path: 'dashboard'
            },
            {
                name: t('labels.dashboard2'),
                path: 'dashboard2'
            }
        ]
    }, 
    {
        name: t('labels.widgets'),
        children: [
            {
                name: t('labels.calendars'),
                path: '/calendars'
            },
            {
                name: t('labels.maps'),
                path: '/maps'
            }, 
            {
                name: t('labels.tables'),
                path: '/tables'
            },  
            {
                name: 'Tables 2',
                path: '/tables2'
            },
            {
                name: 'Modals',
                path: '/modals'
            },
            {
                name: 'DatePickers',
                path: 'datepickers'
            },
            {
                name: 'Cards',
                path: 'cards'
            },
            {
                name: t('labels.charts'),
                path: 'charts'
            },
            {
              name: 'Typography',
              path: 'typography'
            }
        ]
    },
    {
        name: t('labels.layout'),
        children: [
            {
                name: t('labels.layout'),
                path: '/layout'
            }
        ]
    }
];

const topbarMenuItems = [
  {
    name: t("labels.home"),
    path: 'dashboard'
  }
];

// const appElement = ref<HTMLElement | null>(null);

// // Reactive reference for uiValues
// const uiValues = computed(() => ({
//   darkModeSelected: store.getters['ui/darkModeSelected'],
//   menuSidebarCollapsed: store.getters['ui/menuSidebarCollapsed'],
//   controlSidebarCollapsed: store.getters['ui/controlSidebarCollapsed'],
//   screenSize: store.getters['ui/screenSize']
// }));

// watch(uiValues, (newValue) => {
//   console.log('uiValues changed:', newValue);
//   const {
//     darkModeSelected,
//     menuSidebarCollapsed,
//     controlSidebarCollapsed,
//     screenSize
//   } = newValue;

//   if (!appElement.value) {
//     return;
//   }
//   appElement.value.classList.remove('dark-mode');
//   appElement.value.classList.remove('sidebar-closed');
//   appElement.value.classList.remove('sidebar-collapse');
//   appElement.value.classList.remove('sidebar-open');
//   appElement.value.classList.remove('control-sidebar-slide-open');

//   if (darkModeSelected) {
//     appElement.value.classList.add('dark-mode');
//   }

//   if (!controlSidebarCollapsed) {
//     appElement.value.classList.add('control-sidebar-slide-open');
//   }

//   if (menuSidebarCollapsed && screenSize === 'lg') {
//     appElement.value.classList.add('sidebar-collapse');
//   } else if (menuSidebarCollapsed && screenSize === 'xs') {
//     appElement.value.classList.add('sidebar-open');
//   } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
//     appElement.value.classList.add('sidebar-closed');
//     appElement.value.classList.add('sidebar-collapse');
//   }
// });

// onMounted(async ()=> {
//   appElement.value = document.getElementById('app') as HTMLElement;
//   appElement.value.classList.add('sidebar-mini');
//   appElement.value.classList.add('layout-fixed');
// });

// onUnmounted(async () => {
//   appElement.value = document.getElementById('app') as HTMLElement;
//   appElement.value.classList.remove('sidebar-mini');
//   appElement.value.classList.remove('layout-fixed');
// });

// const toggleMenuSidebar = () => {
//   store.getters['ui/toggleMenuSidebar'];
// };
</script>
