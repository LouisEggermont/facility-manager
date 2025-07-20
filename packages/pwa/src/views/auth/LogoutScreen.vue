<template>
  <h1 v-if="firebaseUser" class="text-4xl font-bold tracking-wide mb-6">
    Hi, {{ firebaseUser?.displayName }} {{ firebaseUser?.email }}
  </h1>
  <h1 v-else class="text-4xl font-bold tracking-wide mb-6">Not logged in</h1>

  <form @submit.prevent="">
    <button
      @click="logoutUser"
      class="px-6 py-2 text-white bg-red-600 rounded-md focus:outline-none focus-visible:ring-4 ring-red-300 hover:bg-red-800"
    >
      Log out
    </button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase'

const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()

// Fetch the Firebase token for authenticated requests
firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

// Logout function to sign the user out and redirect to home page
const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}
</script>
