import { FC } from 'react'
import s from './index.module.scss'
import { token } from "@/shared/token/token"
//COMPONENTS
import { Avatar, Button } from 'antd'
//MOBX
import friendsApi from "@/shared/store/friends-api"
//INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
import { observer } from 'mobx-react-lite'


export const UserBlock: FC<{ user: IUser, userInfo: IUser, userId: string }> = observer(({
     user, userInfo, userId }) => {
        const { sendFriendRequest } = friendsApi

        const getUserFriends = () => {
            if (userInfo && userInfo.friends) {
              if (userInfo?.friends.length! % 10 === 1) return `friend`
              else return `${userInfo?.friends.length} friends`
            } else return "Friends not found"
          }

  return (
    <div className={`${s.userInfo_meta} grid jcc`}>
        <div className="grid aic">
                <Avatar size={100} icon={<img src={userInfo?.avatarUrl} alt="avatar" />} />
                <div className="flex aic">
                  <p style={{ whiteSpace: "nowrap" }}>{userInfo?.displayName}</p>
                  {token !== userId ? (
                user?.outgoingReq.some(req => req.userId === userId) ||
                user?.friends.some(friend => friend.userId === userId) ? (
                  <Button
                    type="primary"
                    onClick={() => console.log("q")}
                    className={s.userInfo_meta_btn}
                  >
                    -
                  </Button>
                ) : user?.incomingReq.some(req => req.userId === userId) ? (
                  <Button
                    type="primary"
                    onClick={() => sendFriendRequest(userId!)}
                    className={s.userInfo_meta_btn}
                  >
                    Accept
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => sendFriendRequest(userId!)}
                    className={s.userInfo_meta_btn}
                  >
                    +
                  </Button>
                )
              ) : (
                "settings"
              )}
                </div>
        </div>
        <div>
            <p>{userInfo?.description}</p>
            <p>{getUserFriends()}</p>
        </div>
    </div>
  )
})
