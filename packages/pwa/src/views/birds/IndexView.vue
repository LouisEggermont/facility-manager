<template>
  <div>
    <h1>Buildings</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <div v-for="building of result.buildings" :key="building.id">
        <p>{{ building.name }}</p>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_BUILDINGS } from '@/graphql/building.query'

const { result, loading, error } = useQuery(GET_BUILDINGS)
</script>
