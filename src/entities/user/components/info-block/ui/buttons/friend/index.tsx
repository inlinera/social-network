import { observer } from 'mobx-react-lite'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
//ICONS
import { SettingOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
//COMPONENTS
import { Link } from 'react-router-dom'
import userApi from '@/shared/store/api/user/profile/user-api'
import { myUserFriend } from '@/shared/data/users/my-user-info'
import { AcceptFriend } from '@/features/users/add-friend'
import { NavChatFeature } from '@/features/users/nav-chat'

interface InfoBlockFriendButtons {
  userInfoFriend: IFriend
}

export const InfoBlockFriendButtons = observer(
  ({ userInfoFriend }: InfoBlockFriendButtons) => {
    const { sendFriendRequest, removeFromFriends } = friendsApi
    const { userInfo } = userApi
    const { user } = authApi

    const userId = userInfo?.displayName

    const isMyPage = user?.displayName !== userInfo?.displayName

    const isUserFriend = user?.friends?.some(
      (friend: IFriend) => friend.displayName === userId
    )

    const isUserExistIncReq = user?.incomingReq?.some(
      (req: IFriend) => req.displayName === userId
    )
    const isUserExistOutReq = user?.outgoingReq?.some(
      (req: IFriend) => req.displayName === userId
    )
    const tempStyle = { fontSize: '18px', color: '#fff' }

    return (
      <div>
        {isMyPage ? (
          isUserFriend ? (
            <NavChatFeature userInfo={userInfo} />
          ) : isUserExistIncReq ? (
            <AcceptFriend userInfo={userInfoFriend} />
          ) : isUserExistOutReq ? (
            <button onClick={() => removeFromFriends(userInfoFriend, myUserFriend())}>
              <UserDeleteOutlined style={tempStyle} />
            </button>
          ) : (
            <button onClick={() => sendFriendRequest(userInfoFriend, myUserFriend())}>
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
