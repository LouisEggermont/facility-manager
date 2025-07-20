<template>
  <div
    class="flex flex-col bg-elevated transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- User -->
    <div class="p-4 border-b border-muted">user</div>

    <!-- Navigation -->
    <div class="flex-1 p-4">
      <UNavigationMenu
        orientation="vertical"
        :items="navigationItems"
        class="w-full"
        :collapsed="collapsed"
      />
    </div>

    <!-- Footer -->
    <div class="px-4 border-t border-muted">
      <UNavigationMenu
        orientation="vertical"
        :items="footerItems"
        class="w-full"
        :collapsed="collapsed"
      />
    </div>

    <!-- Collapse Toggle -->
    <div class="p-4 border-t border-muted">
      <UButton
        :icon="
          collapsed
            ? 'i-heroicons-chevron-right-20-solid'
            : 'i-heroicons-chevron-left-20-solid'
        "
        color="primary"
        variant="ghost"
        block
        square
        @click="collapsed = !collapsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import type { NavigationMenuItem } from '@nuxt/ui'
import { version } from '../../../package.json'

const route = useRoute()
const collapsed = ref(false)
const { firebaseUser } = useFirebase()

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    icon: 'i-heroicons-home-20-solid',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Birds',
    icon: 'i-lucide-feather',
    to: '/birds',
    active: route.path.startsWith('/birds'),
  },
  {
    label: collapsed.value ? undefined : 'Observations',
    icon: 'i-heroicons-eye-20-solid',
    to: '/observations',
    active: route.path.startsWith('/observations'),
  },
  firebaseUser.value
    ? {
        label: collapsed.value ? undefined : 'Account',
        icon: 'i-heroicons-user-20-solid',
        to: '/myaccount',
        active: route.path.startsWith('/myaccount'),
      }
    : {
        label: collapsed.value ? undefined : 'Login',
        icon: 'i-heroicons-key-20-solid',
        to: '/login',
        active: route.path.startsWith('/login'),
      },
])

// <footer>
//     <p>
//       Created by <a href="https://mct.be/">MCT</a> -
//       {{ new Date().getFullYear() }}
//     </p>
//     <p>v{{ version }}</p>
//   </footer>

const footerItems = computed<NavigationMenuItem[]>(() => [
  // {
  //   label: collapsed.value ? undefined : 'Help',
  //   icon: 'i-heroicons-question-mark-circle-20-solid',
  //   to: 'https://docs.example.com',
  //   target: '_blank',
  // },
  {
    label: collapsed.value ? undefined : 'MCT',
    icon: 'i-heroicons-academic-cap-20-solid',
    to: 'https://mct.be/',
    target: '_blank',
  },
  {
    label: collapsed.value ? undefined : `v${version}`,
    icon: 'i-heroicons-information-circle-20-solid',
    disabled: true,
  },
])
</script>

<!-- <template>
  <UNavigationMenu
    orientation="horizontal"
    :items="items"
    class="data-[orientation=vertical]:w-48"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { firebaseUser } = useFirebase()

const items = computed<NavigationMenuItem[]>(() => {
  const base = [
    { label: 'Home', to: '/', active: route.path === '/' },
    { label: 'Birds', to: '/birds', active: route.path.startsWith('/birds') },
    {
      label: 'Observations',
      to: '/observations',
      active: route.path.startsWith('/observations'),
    },
  ]
  const accountLink = firebaseUser.value
    ? { label: firebaseUser.value.displayName || 'Account', to: '/myaccount' }
    : { label: 'Login', to: '/login' }
  return [...base, accountLink]
})
</script> -->
