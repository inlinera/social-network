import authApi from '../store/api/user/auth/auth-api'
import userApi from '../store/api/user/profile/user-api'
import { myUserFriend } from './users/my-user-info'

/**
 * Function that checks if user can view information
 */

export const isVisible = (visible: boolean): boolean => {
  const { user } = authApi
  const { userInfo } = userApi

  return (
    (visible && !userInfo?.isPrivate) ||
    user?.displayName === userInfo?.displayName ||
    userInfo?.friends.includes(myUserFriend()) ||
    userInfo?.outgoingReq.includes(myUserFriend())
  )
}
