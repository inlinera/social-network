import { useEffect, useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import userStore from '@/shared/store/api/user/profile/user-api'

import { AvatarUI } from '@/shared/ui/avatar'

import { useButton } from '@/shared/hooks/user/button/useButton'
import { useMobile } from '@/shared/hooks/useMobile'
import authApi from '@/shared/store/api/user/auth/auth-api'

const el = document.querySelector('main')

const scrollTop = () => {
  el?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const UserHeader = observer(() => {
  const { user } = authApi
  const { userInfo, loading } = userStore
  const isMobile = useMobile()

  const [opacity, setOpacity] = useState<number>(0)

  const handleScroll = () => {
    const scrollTop = el?.scrollTop || 0
    const newOpacity = Math.min(scrollTop / 150, 1).toFixed(1)
    setOpacity(parseFloat(newOpacity))
  }

  useEffect(() => {
    el?.addEventListener('scroll', handleScroll)

    return () => {
      el?.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
