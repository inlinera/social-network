import { FC } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar } from 'antd'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'
//ICONS
import { InfoBlockModalButtons } from './buttons/modal-buttons'
import { InfoBlockFriendButtons } from './buttons/friend-buttons'

interface UserBlockProps {
  userInfo?: IUser 
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
  setIsOpenedFriend: (state: boolean) => void
  setIsOpenedTeam: (state: boolean) => void
}

export const UserBlock: FC<UserBlockProps> = observer((
  { userInfo, userInfoFriend, myUserInfoFriend,
    setIsOpenedFriend, setIsOpenedTeam }) => {

      const userId = userInfo?.displayName

  return (
    <div className={`${s.userInfo_meta} grid jcc`}>
        <div className="grid aic">
                <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
                <div className="flex aic">
                  <p style={{ whiteSpace: "nowrap" }}>{userId}</p>
                    <InfoBlockFriendButtons
            userInfo={userInfo} userInfoFriend={userInfoFriend}
            myUserInfoFriend={myUserInfoFriend} userId={userId}/>
                </div>
        </div>
        <div>
            <p>{userInfo?.description}</p>
            <div className={s.userInfo_meta_btns}>
            <InfoBlockModalButtons setIsOpenedFriend={setIsOpenedFriend}
            setIsOpenedTeam={setIsOpenedTeam} />
            </div>
        </div>
    </div>
  )
})