<template>
    <li class="nav-item">
        <div class="nav-link" @click="toggleSearch">
            <i class="fas fa-search"></i>
        </div>
        <div v-if="isSearchVisible" class="navbar-search-block">
            <form class="form-inline" @submit.prevent="handleSubmit">
                <div class="input-group input-group-sm">
                    <input
                        v-model="searchQuery" 
                        class="form-control form-control-navbar" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                    />
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="btn btn-outline-primary" type="button"  @click="toggleSearch">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSearchVisible = ref(false);
const searchQuery = ref('');

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

const handleSubmit = () => {
  console.log('Search query:', searchQuery.value);
  // Add your search handling logic here
};
</script>

<style scoped>
.navbar-search-block {
  display: flex;  
  background: #ffffff;
}
</style>