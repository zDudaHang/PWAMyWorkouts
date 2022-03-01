export interface LoginQueryResultModel {
  id: number
  password: string
}

export interface CreateUserQueryResult {
  id: number
}

export interface FeedQueryResult {
  id: number
  creator_id: number
  title: string
  description: string
  username: string
}

export interface FollowersQueryResult {
  endpoint: string
  sub_public_key: string
  sub_private_key: string
  username: string
}
