<template>        
  <!-- Navbar -->
  <nav
      id="main-header"
      class="main-header navbar navbar-expand"      
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
  </nav>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const onToggleMenuSidebar = () => {    
  console.log("onToggleMenuSidebar");
};
</script>

<style scoped>
/* Style the header for better visual structure */
.navbar {
  background-color: #343a40;
  color: #fff;
}

.nav-link {
  color: #fff !important;
}

.nav-link:hover {
  color: #ddd !important;
}
</style>