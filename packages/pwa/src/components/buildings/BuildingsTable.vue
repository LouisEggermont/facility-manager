<template>
  <UTable
    :data="buildings"
    :columns="columns"
    :loading="loading"
    class="flex-1"
  />
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

type Building = {
  id: string
  name: string
  address: string
  description: string
}

interface Props {
  buildings: Building[]
  loading?: boolean
}

defineProps<Props>()

const columns: TableColumn<Building>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]
</script>
