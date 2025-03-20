import firebase from 'firebase/compat/app'
import { IFriend } from './IFriend'

export interface IUser extends firebase.User {
  displayName: string
  email: string
  name: string
  password: string
  description: string | null
  friends: IFriend[]
  avatarUrl: string | null
  incomingReq: IFriend[]
  outgoingReq: IFriend[]
  chats: string[]
  areFriendsVisible: boolean
  isNameVisible: boolean
}
