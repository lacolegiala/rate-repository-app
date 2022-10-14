import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          description
          fullName
          name
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`
export const GET_USER = gql`
  query GetUser {
    me {
      id
      username
    }
  }
`