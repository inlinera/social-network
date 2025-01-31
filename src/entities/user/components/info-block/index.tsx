import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar } from 'antd'
import { InfoBlockFriendButtons } from './ui/buttons/friend'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'
// ICONS
import { Cake, User, UsersRound } from 'lucide-react'
// DATE
import { differenceInYears } from 'date-fns'

interface UserBlockProps {
  setIsOpenedFriend: (_: boolean) => void
}

export const UserBlock = observer(({ setIsOpenedFriend }: UserBlockProps) => {
  const { user } = authApi
  const { userInfo } = userApi
  const isVisible = (visible: boolean) => visible || user?.displayName == userInfo?.displayName
  const tempStyle = {
    width: parseInt(document.body.style.fontSize) + 3,
    height: parseInt(document.body.style.fontSize) + 3,
  }
  const years = differenceInYears(new Date(), `${userInfo?.birthday}`)

  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div className="flex aic jcsb">
        <Avatar
          size={95}
          icon={<img src={userInfo?.avatarUrl} alt="avatar" draggable={false} />}
        />
        <p style={{ whiteSpace: 'nowrap' }}>{userInfo?.displayName}</p>
        <InfoBlockFriendButtons
          userInfoFriend={{
            displayName: `${userInfo?.displayName}`,
          }}
          myUserInfoFriend={user!}
        />
      </div>
      <div className={`${s.userInfo_meta_someInfo}`}>
        <i>Description:</i>
        <p>{userInfo?.description}</p>
        <div className={`${s.userInfo_meta_btns} flex fdc`}>
          {isVisible(Boolean(userInfo?.isNameVisible)) && (
            <button className="flex jcc aic">
              <User />{' '}
              <b>{`${userInfo?.name?.charAt(0).toUpperCase()}` + userInfo?.name?.slice(1)}</b>
            </button>
          )}
          {isVisible(Boolean(userInfo?.isBirthdayVisible)) && !isNaN(years) && (
            <button className="flex jcc aic">
              <Cake /> <b>{userInfo?.birthday}</b>({years} y.o)
            </button>
          )}
          {isVisible(Boolean(userInfo?.areFriendsVisible)) && (
            <button onClick={() => setIsOpenedFriend(true)} className="flex jcc aic">
              <UsersRound style={tempStyle} /> Friends
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
