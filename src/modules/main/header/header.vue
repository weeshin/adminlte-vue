<template>        
    <!-- Navbar -->
    <nav
        id="main-header"
        class="main-header navbar navbar-expand"
        :class="navbarVariant"
    >
        <ul class="navbar-nav">
            <li class="nav-item">
                <button class="nav-link" role="button" @click="onToggleMenuSidebar">
                    <i class="fas fa-bars"></i>
                </button>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/" class="nav-link">
                    <!-- {{ $t("labels.home") }} -->
                      Home
                </router-link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/" class="nav-link">
                    <!-- {{ $t("labels.contact") }} -->
                      Contact
                </router-link>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">            
            <messages></messages>
            <notifications ></notifications>        
            <!--<languages-dropdown></languages-dropdown>-->
            <user></user> 
            <li class="nav-item">
                <button class="nav-link" @click="onToggleControlSidebar">
                    <i class="fas fa-th-large"></i>
                </button>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Messages from './messages.vue';
import notifications from './notifications.vue';
import User from './user.vue';

const store = useStore();

const headerElement = ref<HTMLElement | null>(null);

const onToggleMenuSidebar = () => {
    store.dispatch('ui/toggleMenuSidebar');
    console.log("onToggleMenuSidebar");
};

const onToggleControlSidebar = () => {
    store.dispatch('ui/toggleControlSidebar');
    console.log("onToggleControlSidebar");
};

const darkModeSelected = computed(() => store.getters['ui/darkModeSelected']);
const navbarVariant = computed(() => store.getters['ui/nabarVariant']);

onMounted(async ()=> {
    headerElement.value = document.getElementById('main-header') as HTMLElement;
});
</script>