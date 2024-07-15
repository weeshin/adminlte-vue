<template>
    <aside v-if="menu" class="main-sidebar elevation-4" :class="sidebarSkin">
        <router-link to="/" class="brand-link">
            <image
                src="assets/img/logo.png"
                alt="AdminLTE Logo"
                class="brand-image"
                height="33"
                width="33"
                rounded
                style="opacity: 0.8"
            ></image>
            <span class="brand-text font-weight-light">AdminLTE 3</span>
        </router-link>

        <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <image
                        :src="currentUser?.photoURL"
                        fallbackSrc="assets/img/default-profile.png"
                        class="img-circle"
                        alt="User Image"
                        width="34"
                        height="34"
                        rounded
                    ></image>
                </div>
                <div class="info">
                    <router-link to="/profile" class="d-block">
                        {{ currentUser?.email }}
                    </router-link>
                </div>
            </div>

            <div class="form-inline">
                <app-sidebar-search :menu="menu"></app-sidebar-search>
            </div>

            <nav class="mt-2">
                <ul
                    class="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview"
                    role="menu"
                    data-accordion="false"
                >
                    <app-menu-item
                        v-for="item in menu"
                        :menuItem="item"
                    ></app-menu-item>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script lang="ts">
import MenuItem from '@/components/menu-item.vue';
import {Image} from '@profabric/vue-components';

export default {
  components: {
    'app-menu-item': MenuItem,
    'pf-image': Image
  },
};

</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

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
        name: t('labels.maps'),
        path: '/maps'
    },    
    {
        name: t('labels.tables'),
        path: '/tables'
    },
    {
        name: t('labels.calendars'),
        path: '/calendars'
    },
    {
        name: 'Layout Options',
        children: [
            {
                name: 'sub-menu',
                path: '/sub-menu-1'
            },
            {
                name: 'sub-blank',
                path: '/sub-menu-2'
            }
        ]
    }
];

const currentUser = computed(() => {    
    return {"email": "Alexander Pierce", "photoURL": ""};
});

const sidebarSkin = computed(() => store.getters['ui/sidebarSkin']);
</script>