import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar } from 'antd'
import { InfoBlockModalButtons } from './ui/buttons/modal'
import { InfoBlockFriendButtons } from './ui/buttons/friend'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'

interface UserBlockProps {
  setIsOpenedFriend: (_: boolean) => void
}

export const UserBlock = observer(({ setIsOpenedFriend }: UserBlockProps) => {
  const { user } = authApi
  const { userInfo } = userApi
  return (
    <div className={`${s.userInfo_meta} flex fdc jcc`}>
      <div className="flex aic">
        <Avatar
          size={100}
          icon={<img src={userInfo?.avatarUrl} alt="avatar" draggable={false} />}
        />
        <div className={`flex aic`}>
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
      </div>
      <div className={`${s.userInfo_meta_someInfo}`}>
        <i>Description:</i>
        <p>{userInfo?.description}</p>
        <div className={s.userInfo_meta_btns}>
          {(userInfo?.areFriendsVisible || user?.displayName == userInfo?.displayName) && (
            <InfoBlockModalButtons setIsOpenedFriend={setIsOpenedFriend} />
          )}
        </div>
      </div>
    </div>
  )
})
