<template>
  <div>
    <PageHeader title="Buildings" subtitle="Manage your facility buildings" />
    <form class="w-full" @submit.prevent="handleRegister">
      <div>
        <p class="" v-if="error">{{ error.message }}</p>
      </div>

      <!-- <div class="mt-6">
        <label for="nickname" class=""> Name </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          class=""
          v-model="newUser.name"
        />
      </div> -->

      <!-- TODO: consider if placeholder should be "Enter your username" -->
      <UFormField :label="$t('label.username')">
        <UInput
          v-model="newUser.name"
          placeholder="Enter your username"
          type="text"
          name="nickname"
        />
      </UFormField>

      <UFormField :label="$t('label.email')">
        <UInput
          v-model="newUser.email"
          placeholder="Enter your email"
          type="email"
          name="email"
        />
      </UFormField>

      <UFormField :label="$t('label.language')">
        <USelect
          v-model="newUser.locale"
          :items="mylocales"
          placeholder="Select a language"
          name="locale"
        />
      </UFormField>

      <UFormField :label="$t('label.password')">
        <UInput
          v-model="newUser.password"
          placeholder="Enter your password"
          type="password"
          name="password"
        />
      </UFormField>

      <UButton type="submit">
        <span>{{ $t('button.register') }}</span>
      </UButton>
      <div class="flex justify-center">
        <ULink to="/auth/login">{{ $t('link.alreadyHaveAccount') }}</ULink>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import type { AuthError } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { ADD_NEW_USER } from '@/graphql/user.mutation'

export default {
  setup() {
    const { register } = useFirebase()
    const { replace } = useRouter()

    // const { mutate: addUserMutation, loading: addUserLoadingMutation } =
    const { mutate: addUserMutation } = useMutation(ADD_NEW_USER)
    const newUser = ref({
      name: '',
      email: '',
      password: '',
      locale: '',
    })

    const mylocales = [
      { value: 'en', label: 'English' },
      { value: 'nl', label: 'Nederlands' },
      // { value: 'es', label: 'Español' },
    ]

    const error = ref<AuthError | null>(null)

    const handleRegister = () => {
      // Register the user in Firebase
      register(newUser.value.name, newUser.value.email, newUser.value.password)
        .then(newFirebaseUser => {
          console.log('🎉 New Firebase user created')
          console.log(newFirebaseUser)
          console.log('uid', newFirebaseUser.uid)

          // Register the user in our database with the same uid
          addUserMutation({
            myinput: {
              uid: newFirebaseUser.uid,
              locale: newUser.value.locale,
              role: 'USER',
            },
          })
            .then(() => {
              console.log('🎉 User created in our database')
              replace({ name: 'myaccount' })
            })
            .catch(err => {
              console.error(err)
              error.value = err
            })
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    return {
      newUser,
      handleRegister,
      error,
      mylocales,
    }
  },
}
</script>
