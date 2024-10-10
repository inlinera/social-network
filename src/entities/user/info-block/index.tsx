import { FC } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar } from 'antd'
import { InfoBlockModalButtons } from './buttons/modal-buttons'
import { InfoBlockFriendButtons } from './buttons/friend-buttons'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'

interface UserBlockProps {
  userInfo?: IUser
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
  setIsOpenedFriend: (state: boolean) => void
}

export const UserBlock: FC<UserBlockProps> = observer(
  ({ userInfo, userInfoFriend, myUserInfoFriend, setIsOpenedFriend }) => {
    const userId = userInfo?.displayName

    return (
      <div className={`${s.userInfo_meta} grid jcc`}>
        <div className="grid aic">
          <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
          <div className="flex aic">
            <p style={{ whiteSpace: 'nowrap' }}>{userId}</p>
            <InfoBlockFriendButtons
              userInfo={userInfo}
              userInfoFriend={userInfoFriend}
              myUserInfoFriend={myUserInfoFriend}
              userId={userId}
            />
          </div>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>{userInfo?.description}</p>
          <div className={s.userInfo_meta_btns}>
            <InfoBlockModalButtons setIsOpenedFriend={setIsOpenedFriend} />
          </div>
        </div>
      </div>
    )
  }
)
