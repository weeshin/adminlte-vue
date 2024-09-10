<template>
  <Layout :menu-items="menu" :topbarMenuItems="topbarMenuItems">
    <!-- Main content goes here -->
    <p>Main content of the page</p>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const menu = [
  {
    name: t('labels.dashboard'),
    path: '/',
    children: [
      {
        name: t('labels.dashboard1'),
        path: 'dashboard'
      },
      {
        name: t('labels.dashboard2'),
        path: 'dashboard2'
      }
    ]
  },
  {
    name: t('labels.widgets'),
    children: [
      {
        name: t('labels.calendars'),
        path: '/calendars'
      },
      {
        name: t('labels.maps'),
        path: '/maps'
      },
      {
        name: t('labels.tables'),
        path: '/tables'
      },
      {
        name: 'Tables 2',
        path: '/tables2'
      },
      {
        name: 'Modals',
        path: '/modals'
      },
      {
        name: 'DatePickers',
        path: 'datepickers'
      },
      // {
      //   name: 'Cards',
      //   path: 'cards'
      // }
    ]
  },
  {
    name: t('labels.layout'),
    children: [
      {
        name: t('labels.layout'),
        path: '/layout'
      }
    ]
  }
];

const topbarMenuItems = [
  {
    name: t("labels.home"),
    path: 'dashboard'
  }
];
</script>