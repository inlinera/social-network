import firebase from "firebase/compat/app"

export interface IUser extends firebase.User {
    displayName: string
    email: string
    password?: string
    description?: string
    isPremium: boolean
    id?: string
    friends: string[]
    avatarUrl: string
}