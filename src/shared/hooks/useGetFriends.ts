import { IFriend } from '../interfaces/IFriend'

const getUserInformation = (user: IFriend): IFriend => ({ displayName: user.displayName })

export const useGetFriends = (targetUserInfo: IFriend, myUserInfo: IFriend) => {
  const targetUserInformation = getUserInformation(targetUserInfo)
  const myUserInformation = getUserInformation(myUserInfo)

  return [targetUserInformation, myUserInformation]
}
