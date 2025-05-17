import { myUserFriend } from '@/shared/constants/users/my-user-info'

import { IFriend } from '@/shared/interfaces/IFriend'

import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
import userApi from '@/shared/store/api/user/profile/user-api'

import { AcceptFriend } from '@/features/users/add-friend'
import { NavChatFeature } from '@/features/users/nav-chat'
import { UserDeleteOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const useButton = (userInfoFriend: IFriend): JSX.Element | null => {
  const { user } = authApi
  const { userInfo } = userApi
  const { sendFriendRequest, removeFromFriends } = friendsApi

  const isMyPage = user?.displayName === userInfo?.displayName
  const isUserFriend = user?.friends?.some((friend: IFriend) => friend.displayName === userInfo?.displayName)

  const isUserExistIncReq = user?.incomingReq?.some((req: IFriend) => req.displayName === userInfo?.displayName)
  const isUserExistOutReq = user?.outgoingReq?.some((req: IFriend) => req.displayName === userInfo?.displayName)

  if (!user) return null

  return !isMyPage ? (
    isUserFriend ? (
      <NavChatFeature userInfo={userInfo} />
    ) : isUserExistIncReq ? (
      <AcceptFriend userInfo={userInfo} />
    ) : isUserExistOutReq ? (
      <button onClick={() => removeFromFriends(userInfoFriend, myUserFriend())}>
        <UserDeleteOutlined style={{ fontSize: 20 }} />
      </button>
    ) : (
      <button onClick={() => sendFriendRequest(userInfoFriend, myUserFriend())}>
        <UserAddOutlined style={{ fontSize: 20 }} />
      </button>
    )
  ) : (
    <Link to="/settings">
      <SettingOutlined style={{ fontSize: 20 }} />
    </Link>
  )
}
