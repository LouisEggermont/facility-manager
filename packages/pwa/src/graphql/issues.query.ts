import gql from 'graphql-tag'

export const GET_ISSUES = gql`
  query {
    issues {
      id
      title
      description
    }
  }
`

export const GET_MY_ISSUES = gql`
  query {
    myissues {
      id
      title
      description
    }
  }
`
