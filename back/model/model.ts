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
  creator: Creator
}

interface Creator {
  id?: number
  name: string
}
