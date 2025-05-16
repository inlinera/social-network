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
  bannerUrl: string | null
  incomingReq: IFriend[]
  outgoingReq: IFriend[]
  chats: string[]
  isPrivate: boolean
  areFriendsVisible: boolean
  isNameVisible: boolean
}
