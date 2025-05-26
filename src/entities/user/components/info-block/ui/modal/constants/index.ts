import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'

import { useTranslation } from 'react-i18next'

interface IOption {
  label: string
  value: string
  arr: IFriend[] | undefined
}

const path = 'profile.user_block.friends.modal.dropdown.'

export const useItems = (userInfo: IUser): IOption[] => {
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
