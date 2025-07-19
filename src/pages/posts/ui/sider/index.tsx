import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { AvatarUI } from '@/shared/ui/avatar'
import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Telegram } from '@/app/assets/icons/Telegram'
import { useCallback } from 'react'

export const PostsSider = observer(() => {
  const { user, loading, logout } = authApi

  const handleLogout = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    logout()
  }, [])

  return (
    <div className={`${s.sider} flex fdc`}>
      <Link
        className={`${s.userBlock} flex aic jcsb`}
        to={user ? `/user/${user?.displayName}` : 'https://t.me/hashtagduck'}
      >
        {user ? (
          <>
            <AvatarUI loading={loading} src={`${user?.avatarUrl}`} userName={`${user?.displayName}`} size={50} />
            <h2>{user?.displayName}</h2>
            <button title="Выход" onClick={handleLogout}>
              <LogOut />
            </button>
          </>
        ) : (
          <div className="flex aic" style={{ padding: '0vw 0.5vw', gap: '2vw', letterSpacing: 1.5 }}>
            <Telegram />
            <strong>Telegram</strong>
          </div>
        )}
      </Link>
    </div>
  )
})
