<template>
  <UApp>
    <div class="flex h-screen">
      <AppHeader />
      <UContainer class="overflow-y-scroll p-8">
        <RouterView />
      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/generic/SideBar.vue'
</script>
