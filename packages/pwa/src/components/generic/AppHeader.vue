<template>
  <header>
    <!-- Logo and Title -->
    <router-link to="/">
      <strong>Birds</strong>
    </router-link>

    <!-- Navigation -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/birds">Birds</router-link></li>
        <li><router-link to="/observations">Observations</router-link></li>
        <li>
          <router-link :to="firebaseUser ? '/myaccount' : '/login'">
            <span v-if="firebaseUser">
              {{ firebaseUser.displayName || 'Account' }}
            </span>
            <span v-else>Login</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()
</script>
