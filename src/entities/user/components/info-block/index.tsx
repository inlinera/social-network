import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { InfoBlockButton } from './ui/button'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
// MOBX
import userApi from '@/shared/store/api/user/profile/user-api'
// ICONS
import { User, UsersRound } from 'lucide-react'

import { isVisible } from '@/shared/constants/isContentVisible'
import authApi from '@/shared/store/api/user/auth/auth-api'

interface UserBlockProps {
  loading: boolean
  setIsOpenedFriend: (_: boolean) => void
}

export const UserBlock = observer(({ setIsOpenedFriend, loading }: UserBlockProps) => {
  const { user } = authApi
  const { userInfo } = userApi

  const tempStyle = {
    width: parseInt(document.body.style.fontSize) || 14 + 3,
    height: parseInt(document.body.style.fontSize) || 14 + 3,
  }

  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div className={`flex aic ${user && 'jcsb'}`}>
        <AvatarUI loading={loading} src={userInfo?.avatarUrl} userName={userInfo.displayName} size={95} />
        <TextUi loading={loading} lines={1}>
          <p style={{ whiteSpace: 'nowrap' }}>{userInfo?.displayName}</p>
        </TextUi>
        <InfoBlockButton
          userInfoFriend={{
            displayName: `${userInfo?.displayName}`,
          }}
        />
      </div>
      <div className={`${s.userInfo_meta_someInfo}`}>
        {userInfo.description && (
          <div className={s.desc}>
            <span>Description:</span>
            <TextUi loading={loading} lines={2}>
              <p>{userInfo?.description}</p>
            </TextUi>
          </div>
        )}
        <div className={`${s.userInfo_meta_btns} flex fdc`}>
          {isVisible(Boolean(userInfo?.isNameVisible)) && userInfo?.name && (
            <div className="flex jcc aic">
              <User />{' '}
              <TextUi loading={loading} lines={1}>
                <b>{`${userInfo?.name?.charAt(0).toUpperCase()}` + userInfo?.name?.slice(1)}</b>
              </TextUi>
            </div>
          )}
          {isVisible(Boolean(userInfo?.areFriendsVisible)) && (
            <button onClick={() => setIsOpenedFriend(true)} className="flex jcc aic">
              <UsersRound style={tempStyle} />{' '}
              <TextUi loading={loading} lines={1}>
                Friends
              </TextUi>
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
