import { IUser } from "../interfaces/IUser";

export const nullUser: IUser = Object({
    displayName: '',
    email: '',
    password: '',
    description: '',
    avatarUrl: '',
    friends: [],
    incomingReq: [],
    outgoingReq: []
  })