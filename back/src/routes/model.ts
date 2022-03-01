export interface LoginQueryResultModel {
  id: number
  password: string
}

export interface CreateUserQueryResult {
  id: number
}

export interface FeedQueryResult {
  id: number
  creatorId: number
  title: string
  description: string
  username: string
}
