<template>

    <li v-if="menuItem" class="nav-item" :class="{'menu-open': isMenuExtended}">
        <a
            class="nav-link"
            :class="{'active': isMainActive || isOneOfChildrenActive}"
            @click="handleMainMenuAction"
        >
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
                {{ menuItem.name }}
                <i v-if="isExpandable" class="right fas fa-angle-left"></i>
            </p>
        </a>
        <ul class="nav nav-treeview" v-for="item in menuItem.children">
            <li class="nav-item">
                <router-link
                    :to="item.path"
                    class="nav-link"
                    exact
                    exact-active-class="active"
                >
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ item.name }}</p>
                </router-link>
            </li>
        </ul>
    </li>
    
    
    </template>
    
    <script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    
    // Define props
    const props = defineProps<{ menuItem: any }>();
    
    const isMenuExtended = ref(false)
    const isExpandable = ref(false)
    const isMainActive = ref(false)
    const isOneOfChildrenActive = ref(false)
    
    const router = useRouter();
    const route = useRoute();
    
    onMounted(() => {    
        isExpandable.value = 
            props.menuItem && 
            props.menuItem.children &&
            props.menuItem.children.length > 0;    
        if (route.path) {
            calculateIsActive(route.path);
        }
        router.afterEach((to) => {
            calculateIsActive(to.path);
        });
    });
    
    const handleMainMenuAction = () => {
        if (isExpandable.value) {
            toggleMenu()
            return        
        }
        router.replace(props.menuItem.path);
    }
    
    const toggleMenu = () => {
        isMenuExtended.value = !isMenuExtended.value;
    }
    
    const calculateIsActive = (url: string) => {
        isMainActive.value = false;
        isOneOfChildrenActive.value = false;
        if (isExpandable.value && props.menuItem.children) {
            props.menuItem.children.forEach((item: any) => {
                if (item.path === url) {
                    isOneOfChildrenActive.value = true;
                    isMenuExtended.value = true;
                }
            });
        } else if (props.menuItem?.path === url) {
            isMainActive.value = true;
        }
        if (!isMainActive.value && !isOneOfChildrenActive.value) {
            isMenuExtended.value = false;
        }
    }
    </script>