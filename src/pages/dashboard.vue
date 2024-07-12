<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">                
                <h1 class="m-0">{{ $t('labels.dashboard') }}</h1>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                        <router-link to="/"
                            >{{ $t('labels.home') }}</router-link
                        >
                    </li>
                    <li class="breadcrumb-item active">{{ $t('labels.dashboard') }}</li>
                </ol>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>150</h3>

                        <p>{{ $t('labels.newOrders') }}</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <router-link to="/" class="small-box-footer"
                        >{{ $t('labels.moreInfo') }} <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <h3>53<sup style="font-size: 20px">%</sup></h3>

                        <p>{{ $t('labels.bounceRate') }}</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <router-link to="/" class="small-box-footer"
                        >{{ $t('labels.moreInfo') }} <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>44</h3>

                        <p>{{ $t('labels.userRegistrations') }}</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <router-link to="/" class="small-box-footer"
                        >{{ $t('labels.moreInfo') }} <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <h3>65</h3>

                        <p>{{ $t('labels.uniqueVisitors') }}</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <router-link to="/" class="small-box-footer"
                        >{{ $t('labels.moreInfo') }} <i class="fas fa-arrow-circle-right"></i
                    ></router-link>
                </div>
            </div>
            <!-- ./col -->
        </div>
        <!-- /.row -->

        <div class="row">
            <div class="col-6 col-lg-6">
                <DualListbox availableItemTitle="Available Items" selectedItemTitle="Selected"
                    v-model:availableItems="availableItems" v-model:selectedItems="selectedItems"></DualListbox>
            </div>            
            <div class="col-6 col-lg-6">
                <Card title="Test"></Card>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/card.vue';
import DualListbox from '@/components/dual-listbox.vue';
import Map from '@components/Map.vue';


const availableItems = ref(['Policy 1', 'Policy 2', 'Policy 3', 'Policy 4', 'Policy 5']);
const selectedItems = ref(['Policy 6', 'Policy 7', 'Policy 8']);
</script>