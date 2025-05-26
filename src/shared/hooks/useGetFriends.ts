import { IFriend } from '../interfaces/IFriend'
import { IUser } from '../interfaces/IUser'

type T = IFriend | IUser

const getUserInformation = (user: T): IFriend => ({ displayName: `${user?.displayName}` })

export const useGetFriends = (targetUserInfo: T, myUserInfo: T) => {
  const targetUserInformation = getUserInformation(targetUserInfo)
  const myUserInformation = getUserInformation(myUserInfo)

  return [targetUserInformation, myUserInformation]
}
