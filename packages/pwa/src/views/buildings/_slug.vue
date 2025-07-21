<!-- src/views/birds/_slug.vue -->
<template>
  <div>
    <PageHeader :title="buildingToFind" subtitle="Building Details" />
    You are looking at the building with the slug: {{ buildingToFind }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
// const buildingToFind = route.params.slug
const buildingToFind = route.params.slug as string
</script>
