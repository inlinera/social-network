import authApi from '../store/api/user/auth/auth-api'
import userApi from '../store/api/user/profile/user-api'

export const isVisible = (visible: boolean): boolean => {
  const { user } = authApi
  const { userInfo } = userApi

  return (visible && !userInfo?.isPrivate) || user?.displayName === userInfo?.displayName
}
