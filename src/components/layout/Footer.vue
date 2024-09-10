<template>
  <footer class="main-footer">    
    <strong>
        <span>{{ $t("footer.copyright") }} &copy; {{ currentYear }}</span>
        <a :href="url" target="_blank" rel="noopener noreferrer">
            <span>&nbsp;{{ shortname }}</span>
        </a>
        <span>.</span>
    </strong>    
    <div class="float-right d-none d-sm-inline-block">
        <b>{{ $t("footer.version") }}    </b>
        <span>:&nbsp;{{ version }}</span>
    </div>    
  </footer>
    
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    version : {
        type: String,
        required: false
    },
    url: {
        type: String,
        default: ""
    },
    shortname: {
        type: String,
        default: "{{shortname}}"
    } 
});

const currentYear = new Date().getFullYear().toString();
</script>