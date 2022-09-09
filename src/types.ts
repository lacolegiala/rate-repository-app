export type Repository = {
  id: string,
  fullName: string,
  description: string,
  language: string,
  forksCount: number,
  stargazersCount: number,
  ratingAverage: number,
  reviewCount: number,
  ownerAvatarUrl: string
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