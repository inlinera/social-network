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
  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div className="flex aic jcsb">
        <Avatar
          size={100}
          icon={<img src={userInfo?.avatarUrl} alt="avatar" draggable={false} />}
        />
        <p style={{ whiteSpace: 'nowrap' }}>{userInfo?.displayName}</p>
        <InfoBlockFriendButtons
          userInfo={userInfo}
          userInfoFriend={{
            displayName: `${userInfo?.displayName}`,
            avatarUrl: `${userInfo?.avatarUrl}`,
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
              <User /> <b>Me</b>
            </button>
          )}
          {isVisible(Boolean(userInfo?.isBirthdayVisible)) && (
            <button className="flex jcc aic">
              <Cake /> <b>20.20.2020</b>
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
