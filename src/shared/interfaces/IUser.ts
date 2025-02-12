import firebase from 'firebase/compat/app'
import { IFriend } from './IFriend'

export interface IUser extends firebase.User {
  displayName: string
  email: string
  name: string
  password: string
  description?: string
  friends: IFriend[]
  avatarUrl: string
  incomingReq: IFriend[]
  outgoingReq: IFriend[]
  birthday: string
  chats: string[]
  areFriendsVisible: boolean
  isBirthdayVisible: boolean
  isNameVisible: boolean
}
