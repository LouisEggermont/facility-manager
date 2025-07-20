<!-- src/views/birds/_slug.vue -->
<template>
  <div>
    You are looking at the bird with the slug: {{ birdToFind }}
    <!--  You are looking at the bird with the slug: {{ $route.params.slug }}-->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const birdToFind = route.params.slug
</script>
