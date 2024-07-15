<template>
    <li class="nav-item">
      <a class="nav-link" href="#" @click.prevent="toggleFullscreen" role="button">
        <i class="fas fa-expand-arrows-alt"></i>
      </a>
    </li>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
  
    const isFullscreen = ref(false);
  
    const toggleFullscreen = () => {
        if (!isFullscreen.value) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };
  
    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
                .then(() => {
                    isFullscreen.value = true;
                })
                .catch(error => {
                    console.error('Failed to enter fullscreen:', error);
                });
        } 
        isFullscreen.value = true;
    };
  
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } 
        isFullscreen.value = false;
    };
</script>
  
  