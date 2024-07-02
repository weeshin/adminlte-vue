<template>  
  <router-view v-if="!isAppLoading" />
  <div v-if="isAppLoading">Loading</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';


const isAppLoading = ref(true);

const checkSession = async () => {
  isAppLoading.value = false;
};

onMounted(async () => {
  await checkSession();
});
</script>


