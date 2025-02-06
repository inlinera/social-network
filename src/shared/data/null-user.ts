import { IUser } from '../interfaces/IUser'

export const nullUser: IUser = Object({
  displayName: '',
  email: '',
  password: '',
  description: '',
  avatarUrl: '',
  birthday: '',
  friends: [],
  incomingReq: [],
  outgoingReq: [],
  chats: [],
  isNameVisible: true,
  isBirthdayVisible: true,
  areFriendsVisible: true,
})
