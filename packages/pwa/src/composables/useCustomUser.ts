import type { CustomUser } from '@/interfaces/custom.user.interface'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import { GET_OWN_USER_ACCOUNT } from '@/graphql/user.query'
import useGraphql from './useGraphql'

const customUser = ref<CustomUser>()

const { apolloClient } = useGraphql()

provideApolloClient(apolloClient)

const restoreCustomUser = async () => {
  return new Promise<void>(resolve => {
    const { onResult } = useQuery(GET_OWN_USER_ACCOUNT)
    onResult(result => {
      if (result.data) {
        console.log(result)
        customUser.value = result.data.ownUseraccount
        resolve()
      }
    })
  })
}

export default () => {
  return {
    customUser,
    restoreCustomUser,
  }
}
