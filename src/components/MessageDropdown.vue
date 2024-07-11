<template>

<pf-dropdown hideArrow >
    <div slot="head">
        <i class="far fa-comments"></i>
        <span class="badge badge-danger navbar-badge">{{ totalMessages }}</span>
    </div>
    <div slot="body">
        <div v-for="(message, index) in messages" :key="index">
            <a href="#" class="dropdown-item" >
                <div class="media">
                    <pf-image
                        :src="message.image"
                        alt="User Avatar"
                        width="50"
                        height="50"
                        class="mr-2"
                        rounded
                    ></pf-image>
                    <div class="media-body">
                        <h3 class="dropdown-item-title">
                            {{ message.caller }}
                            <span class="float-right text-sm text-danger"
                                ><i class="fas fa-star"></i
                            ></span>
                        </h3>
                        <p class="text-sm">{{ message.short_message }}</p>
                        <p class="text-sm text-muted">
                            <i class="far fa-clock mr-1"></i> {{ message.time }}
                        </p>
                    </div>
                </div>                    
            </a>    
            <div class="dropdown-divider"></div>
        </div>           
        <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
    </div>
    
</pf-dropdown>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
   totalMessages: {
    type: String,
    required: true
   },
   messages: {
    type: Array,
    required: false
   }
});

</script>

<style scoped>

pf-dropdown {
    border: none;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    --pf-dropdown-menu-min-width: 18rem;

    .dropdown-item {
        padding: 0.5rem 1rem;
    }

    .text-sm {
        margin-bottom: 0;
    }
    .dropdown-divider {
        margin: 0;
    }
}


</style>