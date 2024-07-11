<template>        
    <!-- Navbar -->
    <nav
        id="main-header"
        class="main-header navbar navbar-expand"
        :class="navbarVariant"
    >
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

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <!-- <search></search> -->
            <MessageDropdown 
                :totalMessages="messages.total" 
                :messages="messages.messages">                
            </MessageDropdown>
            <!-- <notifications ></notifications>         -->
            <!--<languages-dropdown></languages-dropdown>-->
            <!-- <user></user>  -->
            <!-- <li class="nav-item">
                <button class="nav-link" @click="onToggleControlSidebar">
                    <i class="fas fa-th-large"></i>
                </button>
            </li> -->
            <fullscreen></fullscreen>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import MessageDropdown from '@components/MessageDropdown.vue';
import notifications from './notifications.vue';
import User from './user.vue';
import Search from './search.vue';
import Fullscreen from '@components/FullscreenButton.vue';
import axios from 'axios';

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

// const darkModeSelected = computed(() => store.getters['ui/darkModeSelected']);
const navbarVariant = computed(() => store.getters['ui/nabarVariant']);

interface Message {
  total: string;
  messages: any[];  
}
const messages = ref<Message>({
    total: '',
    messages: []
});
onMounted(async ()=> {
    headerElement.value = document.getElementById('main-header') as HTMLElement;

    try {
        const response = await axios.get('/data/messages.json');
        console.log("messages", response.data);
        messages.value = response.data;
        
    } catch(error) {
        console.error('Error fetching users', error);
    }
});
</script>