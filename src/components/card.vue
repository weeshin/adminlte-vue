<template>
    <div class="card" v-if="isCardVisible">
        <div class="card-header">
            <h3 class="card-title">{{ title }}</h3>
    
            <slot name="card-tools">
                <div class="card-tools">
                    <span class="badge badge-danger" v-if="badge">{{ badge }}</span>
                    <button type="button" class="btn btn-tool" @click="toggleCardBody" v-if="toolsBtn === 'on'">
                        <i :class="isCardBodyVisible ? 'fas fa-minus' : 'fas fa-plus'"></i>
                    </button>
                    <button type="button" class="btn btn-tool" @click="closeCard" v-if="toolsBtn ==='on'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>        
            </slot>
        </div>
        <!-- /.card-header -->
        <div class="card-body p-0" v-show="isCardBodyVisible">
            <slot></slot>
        </div>
        <!-- /.card-body -->
        <div class="card-footer text-center" v-if="$slots.footer" v-show="isCardBodyVisible">
            <slot name="footer"></slot>
        </div>
        <!-- /.card-footer -->
    </div>
    </template>
    
    <script setup lang="ts">
    import { ref, defineProps, withDefaults } from 'vue';
    
    withDefaults(
        defineProps<{
            title?: string;
            badge?: string;
            toolsBtn?: string;
        }>(), 
        {
            title: 'This is title',
            toolsBtn: "on"
        }
    );
    
    const isCardVisible = ref(true);
    const isCardBodyVisible = ref(true);
    
    const toggleCardBody = () => {
        isCardBodyVisible.value = !isCardBodyVisible.value;
    }
    
    const closeCard = () => {
        isCardVisible.value = false;
    }
    </script>