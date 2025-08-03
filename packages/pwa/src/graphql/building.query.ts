import gql from 'graphql-tag' // ('graphql-tag' is a nice package to format code as a string.)

export const GET_BUILDINGS = gql`
  query getBuildings {
    buildings {
      id
      name
      description
    }
  }
`
