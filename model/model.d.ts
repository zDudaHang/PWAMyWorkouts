export interface WorkoutModel {
  id?: number
  title: string
  description: string
  creator: CreatorModel
}

export interface CreatorModel {
  id?: number
  username: string
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

export interface CreateWorkoutRequestModel {
  title: string
  description: string
  creatorId: number
}
