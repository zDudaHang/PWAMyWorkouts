import Dexie, { Table } from "dexie"
import { WorkoutModel } from "../model/model"

export class MyWorkoutDexie extends Dexie {
  savedWorkouts!: Table<WorkoutModel>

  constructor() {
    super("MyWorkoutIndexedDatabase")
    this.version(1).stores({
      savedWorkouts: "++id, name, description", // Primary key and indexed props
    })
  }
}

export const db = new MyWorkoutDexie()
