export type Repository = {
  id: string,
  fullName: string,
  description: string,
  language: string,
  forksCount: number,
  stargazersCount: number,
  ratingAverage: number,
  reviewCount: number,
  ownerAvatarUrl: string,
  url: string,
}

export type PageInfo = {
  hasPreviousPage: boolean,
  hasNextPage: boolean,
  startCursor: string,
  endCursor: string
}

export type RepoNode = {
  edges: Array<{
    node: Repository
  }>,
  pageInfo: PageInfo
}

export type AuthenticateInput = {
  username: string,
  password: string
}

export type SortOptions = {
  orderBy: 'CREATED_AT' | 'RATING_AVERAGE',
  orderDirection: 'ASC' | 'DESC'
}

export type User = {
  username: string,
  id: string
}

export type UserWithReviews = {
  me: {
    id: string,
    username: string,
    reviews: {
      edges: {
        node: Review
      }[]
    }
  }
}

export type CreatedUser = {
  username: string,
  password: string
}

export type AuthenticatedUser = {
  me: User
}

export type ReviewNode = {
  node: Review
}

export type Review = {
  id: string,
  text: string,
  rating: number,
  createdAt: string,
  user?: User,
  repository: Repository
}

export type CreatedReview = {
  repositoryOwner: string,
  repositoryName: string,
  rating: number,
  text: string
}