import authApi from '@/shared/store/api/user/auth/auth-api'

export const myUserFriend = () => ({ displayName: `${authApi.user?.displayName}` })
