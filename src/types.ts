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
  url: string
}

export type RepoNode = {
  edges: Array<{
    node: Repository
  }>
}

export type AuthenticateInput = {
  username: string,
  password: string
}

export type SortOptions = {
  orderBy: 'CREATED_AT' | 'RATING_AVERAGE'
}

export type User = {
  username: string,
  id: string
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
  user: User
}

export type CreatedReview = {
  repositoryOwner: string,
  repositoryName: string,
  rating: number,
  text: string
}