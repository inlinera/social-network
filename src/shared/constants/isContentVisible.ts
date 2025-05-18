import authApi from '../store/api/user/auth/auth-api'
import userApi from '../store/api/user/profile/user-api'

/**
 * Function that checks if user can view information
 */

export const isVisible = (visible: boolean): boolean => {
  const { user } = authApi
  const { userInfo } = userApi

  const isUserFriend = Boolean(user?.friends?.some(friend => friend.displayName === userInfo?.displayName))
  const isOutgoingReq = Boolean(userInfo?.outgoingReq?.some(req => req.displayName === user?.displayName))

  return (
    (visible && !userInfo?.isPrivate) ||
    user?.displayName === userInfo?.displayName ||
    isOutgoingReq ||
    isUserFriend
  )
}
