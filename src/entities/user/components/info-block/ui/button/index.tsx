import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'

import { useButton } from '@/shared/hooks/user/button/useButton'

export const InfoBlockButton = observer(() => {
  const { user } = authApi
  const { userInfo } = userApi

  return user && <div className={`${s.infoBlockButton} flex jcc aic`}>{useButton(userInfo, user)}</div>
})
