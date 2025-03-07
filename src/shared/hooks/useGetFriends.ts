import { IFriend } from '../interfaces/IFriend'

export const useGetFriends = (targetUserInfo: IFriend, myUserInfo: IFriend) => {
  const targetUserInformation = {
    displayName: targetUserInfo?.displayName,
  }
  const myUserInformation = {
    displayName: myUserInfo?.displayName,
  }
  return [targetUserInformation, myUserInformation]
}