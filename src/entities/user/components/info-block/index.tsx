import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { InfoBlockFriendButtons } from './ui/buttons/friend'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'
// ICONS
import { Cake, User, UsersRound } from 'lucide-react'
// DATE
import { differenceInYears } from 'date-fns'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'

interface UserBlockProps {
  loading: boolean
  setIsOpenedFriend: (_: boolean) => void
}

export const UserBlock = observer(({ setIsOpenedFriend, loading }: UserBlockProps) => {
  const { user } = authApi
  const { userInfo } = userApi
  const isVisible = (visible: boolean) => visible || user?.displayName == userInfo?.displayName
  const fontSize = parseInt(document.body.style.fontSize) || 14
  const tempStyle = {
    width: fontSize + 3,
    height: fontSize + 3,
  }
  const years = differenceInYears(new Date(), `${userInfo?.birthday}`)

  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div className="flex aic jcsb">
        <AvatarUI loading={loading} src={`${userInfo?.avatarUrl}`} size={95} />
        <TextUi loading={loading} lines={1}>
          <p style={{ whiteSpace: 'nowrap' }}>{userInfo?.displayName}</p>
        </TextUi>
        <InfoBlockFriendButtons
          userInfoFriend={{
            displayName: `${userInfo?.displayName}`,
          }}
          myUserInfoFriend={user!}
        />
      </div>
      <div className={`${s.userInfo_meta_someInfo}`}>
        <i>Description:</i>
        <TextUi loading={loading} lines={2}>
          <p>{userInfo?.description}</p>
        </TextUi>
        <div className={`${s.userInfo_meta_btns} flex fdc`}>
          {isVisible(Boolean(userInfo?.isNameVisible)) && (
            <button className="flex jcc aic">
              <User />{' '}
              <TextUi loading={loading} lines={1}>
                <b>
                  {`${userInfo?.name?.charAt(0).toUpperCase()}` + userInfo?.name?.slice(1)}
                </b>
              </TextUi>
            </button>
          )}
          {isVisible(Boolean(userInfo?.isBirthdayVisible)) && !isNaN(years) && (
            <button className="flex jcc aic">
              <Cake />{' '}
              <TextUi loading={loading} lines={1}>
                <b>{userInfo?.birthday}</b>({years} y.o)
              </TextUi>
            </button>
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
