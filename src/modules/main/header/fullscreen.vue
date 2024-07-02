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
        elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
        }
        isFullscreen.value = true;
    };
  
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
        }
        isFullscreen.value = false;
    };
</script>
  
  