export interface FeedModel {
  publications?: PublicationModel[]
}

export interface PublicationModel {
  title: string
  workout: WorkoutModel
  date: string
}

export interface WorkoutModel {
  id?: number
  name: string
  description: string
  creator: CreatorModel
}

export interface CreatorModel {
  id?: number
  name: string
}

export interface UserModel {
  id: number
  username: string
}

export interface AuthenticationResponseModel {
  id: number
}

export interface LoginRequestModel {
  username: string
  password: string
}
