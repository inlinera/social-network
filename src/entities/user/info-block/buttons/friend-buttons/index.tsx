import { observer } from 'mobx-react-lite'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'
//MOBX
import authApi from '@/shared/store/auth-api'
import friendsApi from '@/shared/store/friends-api'
import { token } from '@/shared/token/token'
import {
  MessageOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'

interface InfoBlockFriendButtons {
  userInfo?: IUser
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
  userId?: string
}

export const InfoBlockFriendButtons = observer(
  ({ userInfo, userInfoFriend, myUserInfoFriend, userId }: InfoBlockFriendButtons) => {
    const { sendFriendRequest, acceptFriendRequest, removeFromFriends } = friendsApi
    const { user } = authApi

    return (
      <div>
        {token !== userInfo?.displayName ? (
          user?.friends.some((friend: IFriend) => friend.displayName === userId) ? (
            <button>
              <MessageOutlined style={{ fontSize: '18px' }} />
            </button>
          ) : user?.incomingReq.some((req: IFriend) => req.displayName === userId) ? (
            <Button
              type="primary"
              onClick={() => acceptFriendRequest(userInfoFriend, myUserInfoFriend)}
            >
              Accept
            </Button>
          ) : user?.outgoingReq.some((req: IFriend) => req.displayName === userId) ? (
            <button onClick={() => removeFromFriends(userInfoFriend, myUserInfoFriend)}>
              <UserDeleteOutlined style={{ fontSize: '18px' }} />
            </button>
          ) : (
            <button onClick={() => sendFriendRequest(userInfoFriend, myUserInfoFriend)}>
              <UserAddOutlined style={{ fontSize: '18px' }} />
            </button>
          )
        ) : (
          <button>
            <SettingOutlined style={{ fontSize: '18px' }} />
          </button>
        )}
      </div>
    )
  }
)
