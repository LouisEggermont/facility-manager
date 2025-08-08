<template>
  <div class="min-h-screen p-6">
    <div class="max-w-2xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold">My Account</h1>
        <p class="mt-2">Manage your account settings and preferences</p>
      </div>

      <!-- Account Information Card -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">Account Information</h2>
        </template>

        <div class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                v-if="firebaseUser?.photoURL"
                :src="firebaseUser.photoURL"
                :alt="firebaseUser.displayName || 'User'"
                class="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
              <div
                v-else
                class="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700"
              >
                <UIcon
                  name="i-heroicons-user-20-solid"
                  class="w-8 h-8 text-gray-600 dark:text-gray-400"
                />
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium">
                {{ firebaseUser?.displayName || 'No name set' }}
              </h3>
              <p class="text-sm">Profile Picture</p>
            </div>
          </div>

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium mb-2"> Display Name </label>
            <UInput
              :value="firebaseUser?.displayName || ''"
              placeholder="No name set"
              disabled
              class="w-full"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Email Address
            </label>
            <UInput
              :value="firebaseUser?.email || ''"
              placeholder="No email"
              disabled
              class="w-full"
            />
          </div>

          <!-- Language Selector -->
          <form @submit.prevent="">
            <div>
              <UFormField :label="$t('label.language')">
                <USelect
                  v-model="locale"
                  :items="localeItems"
                  name="locale"
                  @change="setLanguage"
                />
              </UFormField>
            </div>
          </form>

          <!-- Account Created -->
          <div v-if="firebaseUser?.metadata?.creationTime">
            <label class="block text-sm font-medium mb-2"> Member Since </label>
            <UInput
              :value="formatDate(firebaseUser.metadata.creationTime)"
              disabled
              class="w-full"
            />
          </div>

          <!-- Last Sign In -->
          <div v-if="firebaseUser?.metadata?.lastSignInTime">
            <label class="block text-sm font-medium mb-2"> Last Sign In </label>
            <UInput
              :value="formatDate(firebaseUser.metadata.lastSignInTime)"
              disabled
              class="w-full"
            />
          </div>
        </div>
      </UCard>

      <!-- Account Actions Card -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Account Actions</h2>
        </template>

        <div class="space-y-4">
          <!-- Logout Button -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium">Sign Out</h3>
              <p class="text-sm">Sign out of your account on this device</p>
            </div>
            <UButton
              color="error"
              variant="outline"
              :loading="isLoggingOut"
              @click="handleLogout"
            >
              <UIcon
                name="i-heroicons-arrow-right-on-rectangle-20-solid"
                class="w-4 h-4 mr-2"
              />
              Sign Out
            </UButton>
          </div>

          <!-- Placeholder for future actions -->
          <div
            class="flex items-center justify-between pt-4 border-t border-muted"
          >
            <div>
              <h3 class="text-sm font-medium">Account Settings</h3>
              <p class="text-sm">
                Update your profile information and preferences
              </p>
            </div>
            <UButton color="neutral" variant="outline" disabled>
              <UIcon
                name="i-heroicons-cog-6-tooth-20-solid"
                class="w-4 h-4 mr-2"
              />
              Edit Profile
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import useLanguage from '@/composables/useLanguage'
import { useMutation } from '@vue/apollo-composable'
import { UPDATE_USER_LOCALE } from '@/graphql/user.mutation'
import useCustomUser from '@/composables/useCustomUser'

const router = useRouter()
const { firebaseUser, logout } = useFirebase()
const isLoggingOut = ref(false)

const { resetCustomUser } = useCustomUser()

const { SUPPORTED_LOCALES, locale, setLocale } = useLanguage()
const { mutate: updateUserLocaleMutation } = useMutation(UPDATE_USER_LOCALE)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const setLanguage = () => {
  console.log(locale.value)
  setLocale(locale.value) // Save in the composable
  // Update the customUser in the database
  updateUserLocaleMutation({
    myinput: {
      uid: firebaseUser?.value?.uid,
      locale: locale.value,
    },
  }).then(() => {
    console.log('Locale updated')
  })
}

// Compute the available locales for the USelect input
const localeItems = computed(() =>
  Object.entries(SUPPORTED_LOCALES).map(([value, label]) => ({ value, label })),
)

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await logout()
    resetCustomUser()
    router.push('/auth/login')
  } catch (error) {
    console.error('Error signing out:', error)
    // You could add a toast notification here
  } finally {
    isLoggingOut.value = false
  }
}

// Redirect if not authenticated
if (!firebaseUser.value) {
  router.push('/auth/login')
}
</script>
