<template>
  <div class="mb-6">
    <h1 class="text-3xl font-bold">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="mt-2">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>
