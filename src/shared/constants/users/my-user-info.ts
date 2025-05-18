import { IFriend } from '@/shared/interfaces/IFriend'
import authApi from '@/shared/store/api/user/auth/auth-api'

export const myUserFriend = (): IFriend => ({ displayName: `${authApi.user?.displayName}` })
