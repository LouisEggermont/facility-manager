import gql from 'graphql-tag'

export const ADD_NEW_USER = gql`
  mutation createOwnAccount($myinput: CreateUserInput!) {
    createOwnUseraccount(createUserInput: $myinput) {
      id
      uid
      locale
      role
    }
  }
`
