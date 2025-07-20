<!-- LoginScreen.ts-->
<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input
          v-model="loginCredentials.email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          v-model="loginCredentials.password"
          type="password"
          placeholder="Password"
        />
      </div>

      <button type="submit">Login</button>

      <p v-if="error">❌ {{ error }}</p>
      <p v-if="firebaseUser">✅ Logged in as {{ firebaseUser.email }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import type { AuthError } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()
    const { replace } = useRouter()

    // Logic
    const loginCredentials = ref({
      email: 'christophe.laprudence@howest.be',
      password: '',
    })

    const error = ref('')

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          // During debugging you can leave this out
          replace('/')
        })
        .catch((err: AuthError) => {
          error.value = err.message
        })
    }

    return {
      loginCredentials,
      error,
      firebaseUser,
      handleLogin,
    }
  },
}
</script>
