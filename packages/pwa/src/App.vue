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
import useLanguage from './composables/useLanguage'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/generic/SideBar.vue'

const { setLocale, SUPPORTED_LOCALES, locale } = useLanguage()
// setLocale('nl')
setLocale(
  navigator.languages.find(locale =>
    Object.keys(SUPPORTED_LOCALES).includes(locale),
  ) ?? locale.value,
)
</script>
