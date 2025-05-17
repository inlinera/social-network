import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'

import { useButton } from '@/shared/hooks/user/button/useButton'

interface InfoBlockFriendButtons {
  userInfoFriend: IFriend
}

export const InfoBlockButton = observer(({ userInfoFriend }: InfoBlockFriendButtons) => {
  const { user } = authApi

  return user && <div className={`${s.infoBlockButton} flex jcc aic`}>{useButton(userInfoFriend)}</div>
})
