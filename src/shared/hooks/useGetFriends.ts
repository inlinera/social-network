import { IFriend } from '../interfaces/IFriend'

export const useGetFriends = (targetUserInfo: IFriend, myUserInfo: IFriend) => {
  const targetUserInformation = {
    displayName: targetUserInfo?.displayName,
    avatarUrl: targetUserInfo?.avatarUrl,
  }
  const myUserInformation = {
    displayName: myUserInfo?.displayName,
    avatarUrl: myUserInfo?.avatarUrl,
  }
  return [targetUserInformation, myUserInformation]
}