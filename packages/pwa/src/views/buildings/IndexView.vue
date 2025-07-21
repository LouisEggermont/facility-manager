<template>
  <div>
    <PageHeader title="Buildings" subtitle="Manage your facility buildings" />
    <!-- <div v-if="loading">Loading...</div> -->

    <BuildingsTable :buildings="result?.buildings || []" :loading="loading" />
    <!-- <div v-for="building of result.buildings" :key="building.id">
      <p>{{ building.name }}</p>
    </div> -->
    <div v-for="building of result?.buildings || []" :key="building.id">
      <ULink
        :to="`/buildings/${building.name}`"
        class="text-primary-500 hover:text-primary-600"
      >
        {{ building.name }}
      </ULink>
    </div>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_BUILDINGS } from '@/graphql/building.query'

const { result, loading, error } = useQuery(GET_BUILDINGS)
</script>
