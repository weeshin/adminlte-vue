<template>
    <div :class="['info-box mb-3']">
        <span :class="[bgClass, 'info-box-icon elevation-1']">
            <i :class=[icon]></i>
        </span>

        <div class="info-box-content">
            <span class="info-box-text">{{ message }}</span>
            <span class="info-box-number">{{ number }}</span>
        </div>
        <!-- /.info-box-content -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps, withDefaults } from 'vue';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

const props = withDefaults(
    defineProps<{
        message: string;
        number: string;
        variant: Variant;
        icon: string;
    }>(),
    {
        message: "Default message",
        number: '0',
        variant: 'info',
        icon: 'fas fa-user-alt'
    }
);
;
const bgClass = computed(() => `bg-${props.variant}`);
const icon = computed(() => `${props.icon}`)

</script>