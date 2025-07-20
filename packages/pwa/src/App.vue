<template>
  <div>
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/generic/AppHeader.vue'
import AppFooter from '@/components/generic/AppFooter.vue'
</script>
