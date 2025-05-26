import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import { InfoBlockButton } from './ui/button'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'

import userApi from '@/shared/store/api/user/profile/user-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

import { User, UsersRound } from 'lucide-react'

import { isVisible } from '@/shared/constants/isContentVisible'

import { useTranslation } from 'react-i18next'

import { useMobile } from '@/shared/hooks/useMobile'

interface UserBlockProps {
  loading: boolean
  setIsOpenedFriend: (_: boolean) => void
}

const tempStyle = {
  width: 17,
  height: 17,
}

export const UserBlock = observer(({ setIsOpenedFriend, loading }: UserBlockProps) => {
  const { user } = authApi
  const { userInfo } = userApi

  const { t } = useTranslation()

  const isMobile = useMobile()

  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div
        className={s.userInfo_meta_banner}
        style={
          !isMobile
            ? { background: 'transparent' }
            : !userInfo?.bannerUrl
            ? { background: 'linear-gradient(45deg, #4b0404, #e66a39)' }
            : { backgroundImage: `url(${userInfo?.bannerUrl})` }
        }
      />

      <div className={`${s.userInfo_meta_block} flex aic ${user && 'jcsb'}`}>
        <div className={`${s.avatar} flex aic jcc`}>
          <AvatarUI
            loading={loading}
            src={userInfo?.avatarUrl ?? null}
            userName={`${userInfo?.displayName}`}
            size={95}
          />
        </div>
        <TextUi loading={loading} lines={1}>
          <p style={{ whiteSpace: 'nowrap' }}>{userInfo?.displayName}</p>
        </TextUi>
        <InfoBlockButton />
      </div>
      <div className={`${s.userInfo_meta_someInfo}`}>
        {userInfo?.description && (
          <div className={s.desc}>
            <span>{t('profile.user_block.description')}:</span>
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
                {t('profile.user_block.friends._')}
              </TextUi>
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
