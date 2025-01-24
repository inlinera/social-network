import { observer } from 'mobx-react-lite'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
//ICONS
import {
  MessageOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Link } from 'react-router-dom'

interface InfoBlockFriendButtons {
  userInfo?: IUser
  userInfoFriend: IFriend
  myUserInfoFriend: IFriend
}

export const InfoBlockFriendButtons = observer(
  ({ userInfo, userInfoFriend, myUserInfoFriend }: InfoBlockFriendButtons) => {
    const { sendFriendRequest, acceptFriendRequest, removeFromFriends } = friendsApi
    const { user } = authApi

    const userId = userInfo?.displayName

    const isMyPage = user?.displayName !== userInfo?.displayName

    const isUserFriend = user?.friends.some((friend: IFriend) => friend.displayName === userId)

    const isUserExistIncReq = user?.incomingReq.some(
      (req: IFriend) => req.displayName === userId
    )
    const isUserExistOutReq = user?.outgoingReq.some(
      (req: IFriend) => req.displayName === userId
    )
    const tempStyle = { fontSize: '18px', color: '#fff' }

    return (
      <div>
        {isMyPage ? (
          isUserFriend ? (
            <button>
              <MessageOutlined style={tempStyle} />
            </button>
          ) : isUserExistIncReq ? (
            <RedButtonUI onClick={() => acceptFriendRequest(userInfoFriend, myUserInfoFriend)}>
              Accept
            </RedButtonUI>
          ) : isUserExistOutReq ? (
            <button onClick={() => removeFromFriends(userInfoFriend, myUserInfoFriend)}>
              <UserDeleteOutlined style={tempStyle} />
            </button>
          ) : (
            <button onClick={() => sendFriendRequest(userInfoFriend, myUserInfoFriend)}>
              <UserAddOutlined style={tempStyle} />
            </button>
          )
        ) : (
          <Link to={'/settings'}>
            <SettingOutlined style={tempStyle} />
          </Link>
        )}
      </div>
    )
  }
)
