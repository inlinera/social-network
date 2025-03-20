import { IUser } from './IUser'

export interface IFriend extends Pick<IUser, 'displayName'> {}
