import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import userStore from '@/shared/store/api/user/profile/user-api'

import { AvatarUI } from '@/shared/ui/avatar'

import { useButton } from '@/shared/hooks/user/button/useButton'
import { useMobile } from '@/shared/hooks/useMobile'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { useScroll } from '@/pages/user/hooks/useScroll'

const el = document.querySelector('main')

export const UserHeader = observer(() => {
  const { user } = authApi
  const { userInfo, loading } = userStore
  const isMobile = useMobile()
  const { opacity, scrollTop } = useScroll(el, 150)

  return (
    isMobile && (
      <div
        className={`${s.userHeader} flex aic jcsb`}
        style={{ opacity, pointerEvents: opacity > 0 ? 'all' : 'none' }}
      >
        <button className={`${s.userHeader__info} flex aic`} onClick={scrollTop}>
          <div className={`${s.avatar} flex aic jcc`}>
            <AvatarUI src={userInfo?.avatarUrl} userName={userInfo?.displayName} size={40} loading={loading} />
          </div>
          <strong>@{userInfo?.displayName}</strong>
        </button>
        {useButton(userInfo, user!)}
      </div>
    )
  )
})
