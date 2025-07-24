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

export const UPDATE_USER_LOCALE = gql`
  mutation updateUser($myinput: UpdateUserInput!) {
    updateUser(updateUserInput: $myinput) {
      id
      uid
      locale
    }
  }
`
