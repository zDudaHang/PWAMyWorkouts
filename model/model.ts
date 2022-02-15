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
