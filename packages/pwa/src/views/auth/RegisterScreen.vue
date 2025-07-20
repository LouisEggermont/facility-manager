<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          v-model="newUser.name"
          placeholder="Your name"
        />
      </div>

      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="newUser.email" placeholder="Your email" />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="newUser.password"
          placeholder="Your password"
        />
      </div>

      <button type="submit">Register</button>

      <!-- Error feedback -->
      <p v-if="error" style="color: red">❌ {{ error.message }}</p>

      <!-- Optional success feedback -->
      <p v-if="success" style="color: green">✅ Registration successful!</p>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '@/composables/useFirebase'
import type { AuthError, User } from 'firebase/auth'

export default {
  setup() {
    const { register } = useFirebase()

    const newUser = ref({
      name: '',
      email: '',
      password: '',
    })

    const error = ref<AuthError | null>(null)
    const success = ref(false)

    const handleRegister = () => {
      error.value = null
      success.value = false

      register(newUser.value.name, newUser.value.email, newUser.value.password)
        .then((user: User) => {
          console.log('User registered:', user)
          success.value = true
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    return {
      newUser,
      error,
      success,
      handleRegister,
    }
  },
}
</script>
