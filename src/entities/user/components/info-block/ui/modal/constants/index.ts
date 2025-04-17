import { IFriend } from '@/shared/interfaces/IFriend'
import userApi from '@/shared/store/api/user/profile/user-api'
import { useTranslation } from 'react-i18next'

interface IOption {
  label: string
  value: string
  arr: IFriend[] | undefined
}

const path = 'profile.user_block.friends.modal.dropdown.'

export const useItems = (): IOption[] => {
  const { userInfo } = userApi
  const { t } = useTranslation()

  return [
    {
      label: t(`${path}friends`),
      value: '0',
      arr: userInfo?.friends,
    },
    {
      label: t(`${path}outReq`),
      value: '1',
      arr: userInfo?.outgoingReq,
    },
    {
      label: t(`${path}incReq`),
      value: '2',
      arr: userInfo?.incomingReq,
    },
  ]
}
