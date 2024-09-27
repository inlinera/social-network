import firebase from "firebase/compat/app"
import { IFriend } from "./IFriend"
import { ITeam } from "./ITeam"

export interface IUser extends firebase.User {
    displayName: string
    email: string
    password?: string
    description?: string
    friends: IFriend[]
    avatarUrl: string
    incomingReq: IFriend[]
    outgoingReq: IFriend[]
    teams: ITeam[]
}