import type { CustomUser } from '@/interfaces/custom.user.interface'
import type { TypedDocumentNode } from '@apollo/client/core'
import gql from 'graphql-tag'

export const GET_OWN_USER_ACCOUNT: TypedDocumentNode<{
  ownUseraccount: CustomUser
}> = gql`
  query ownUseraccount {
    ownUseraccount {
      id
      uid
      locale
      role
      createdAt
      updatedAt
    }
  }
`
