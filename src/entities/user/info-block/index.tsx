import { FC } from 'react'
import s from './index.module.scss'
import { token } from "@/shared/token/token"
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar, Button } from 'antd'
//MOBX
import friendsApi from "@/shared/store/friends-api"
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'
//ICONS
import { MessageOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons'


interface UserBlockProps {
  user: IUser
  userInfo: IUser 
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
  setIsOpened: (state: boolean) => void
}

export const UserBlock: FC<UserBlockProps> = observer(({ user, userInfo,
   userInfoFriend, myUserInfoFriend, setIsOpened }): JSX.Element => {

        const {  sendFriendRequest, acceptFriendRequest } = friendsApi

        const getUserFriends = () => {
            if (userInfo && userInfo.friends) {
              if (userInfo?.friends.length! % 10 === 1) return `friend`
              else return `${userInfo?.friends.length} friends`
            }
          }

          const userId = userInfo?.displayName

  return (
    <div className={`${s.userInfo_meta} grid jcc`}>
        <div className="grid aic">
                <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
                <div className="flex aic">
                  <p style={{ whiteSpace: "nowrap" }}>{userId}</p>
                  {token !== userInfo?.displayName ? (
                user?.outgoingReq.some(req => req.displayName === userId) ||
                user?.friends.some(friend => friend.displayName === userId) ? (
                    <button>
                    <MessageOutlined style={{fontSize: '18px'}}/>
                    </button>
                ) : user?.incomingReq.some(req => req.displayName === userId) ? (
                  <Button
                    type="primary"
                    onClick={() => acceptFriendRequest(userInfoFriend, myUserInfoFriend)}
                    className={s.userInfo_meta_btn}
                  >
                    Accept
                  </Button>
                ) : (
                  <button onClick={() => sendFriendRequest(userInfoFriend, myUserInfoFriend)}>
                    <UserAddOutlined style={{fontSize: '18px'}}/>
                  </button>
                )
              ) : (
                <button>
                  <SettingOutlined style={{fontSize: '18px'}}/>
                </button>
              )}
                </div>
        </div>
        <div>
            <p>{userInfo?.description}</p>
            <button onClick={() => setIsOpened(true)}>{getUserFriends()}</button>
        </div>
    </div>
  )
})
