import { ref } from 'vue'
import { GET_OWN_USER_ACCOUNT } from '@/graphql/user.query'
import useGraphql from './useGraphql'
import type { CustomUser } from '@/interfaces/custom.user.interface'
import { parseRole } from '@/utils/role.helpers'

const customUser = ref<CustomUser | undefined>(undefined)
const isLoaded = ref(false)

const { apolloClient } = useGraphql()

const restoreCustomUser = async () => {
  if (isLoaded.value) return // Don't fetch again
  try {
    const { data } = await apolloClient.query({
      query: GET_OWN_USER_ACCOUNT,
      fetchPolicy: 'network-only',
    })

    const rawUser = data.ownUseraccount

    customUser.value = {
      ...rawUser,
      role: parseRole(String(rawUser.role)), // ← Converts "ADMIN" to 800
    }

    console.log('✅ Parsed role:', customUser.value.role)
  } catch (e) {
    console.error('Failed to fetch custom user', e)
  } finally {
    isLoaded.value = true
  }
}

const resetCustomUser = () => {
  customUser.value = undefined
  isLoaded.value = false
}

export default function useCustomUser() {
  return {
    customUser,
    restoreCustomUser,
    resetCustomUser,
    isLoaded,
  }
}
