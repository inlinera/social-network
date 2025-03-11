import { IFriend } from '@/shared/interfaces/IFriend'
import userApi from '@/shared/store/api/user/profile/user-api'

interface IOption {
  label: string
  value: string
  arr: IFriend[]
}

export const items = (): IOption[] => {
  const { userInfo } = userApi

  return [
    {
      label: 'Friends',
      value: '0',
      arr: userInfo?.friends,
    },
    {
      label: 'Outgoing Requests',
      value: '1',
      arr: userInfo?.outgoingReq,
    },
    {
      label: 'Incoming Requests',
      value: '2',
      arr: userInfo?.incomingReq,
    },
  ]
}
