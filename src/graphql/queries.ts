import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
  query GetUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($id: ID!) {
    repository(id: $id) {
      id
      description
      fullName
      url
      name
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
    }
  }
`
export const GET_REVIEWS = gql`
  query GetReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`