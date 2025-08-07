import type { CustomUser } from '@/interfaces/custom.user.interface'
import { ref } from 'vue'
import { GET_OWN_USER_ACCOUNT } from '@/graphql/user.query'
import useGraphql from './useGraphql'

const customUser = ref<CustomUser>()

const { apolloClient } = useGraphql()

const loading = ref(false)
const error = ref<Error | null>(null)

const restoreCustomUser = async () => {
  loading.value = true
  try {
    const { data } = await apolloClient.query({
      query: GET_OWN_USER_ACCOUNT,
      fetchPolicy: 'network-only', // important to not get stale data, no caching
    })
    customUser.value = data.ownUseraccount
  } catch (err) {
    error.value = err instanceof Error ? err : new Error(String(err))
  } finally {
    loading.value = false
  }
}

export default () => ({
  customUser,
  restoreCustomUser,
  loading,
  error,
})
