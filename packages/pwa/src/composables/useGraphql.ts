import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  uri: 'http://[::1]:3000/graphql', // will fix this later with environment variables
  credentials: 'same-origin',
})

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: (await firebaseUser.value?.getIdToken())
      ? `Bearer ${await firebaseUser.value?.getIdToken()}`
      : '',
  },
}))

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default () => {
  return {
    apolloClient,
  }
}
