import { UserModel } from "../../../../model/model"

export interface LoggedUserContextModel {
  user?: UserModel
  setUser: (user: UserModel) => void
}
