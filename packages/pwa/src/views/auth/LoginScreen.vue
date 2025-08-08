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

import useLanguage from '@/composables/useLanguage'
import useCustomUser from '@/composables/useCustomUser'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()
    const { setLocale } = useLanguage()
    const { replace } = useRouter()
    const { restoreCustomUser, resetCustomUser, customUser } = useCustomUser()

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
          resetCustomUser()
          restoreCustomUser().then(() => {
            if (customUser.value?.locale) {
              setLocale(customUser.value.locale)
            }
            replace('/')
          })
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
