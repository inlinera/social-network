// ================================= ALARM =================================

// SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE

// SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE

// SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE SENIOR CODE

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
import { myUserFriend } from '@/shared/constants/users/my-user-info'
import { AcceptFriend } from '@/features/users/add-friend'
import { NavChatFeature } from '@/features/users/nav-chat'
import s from './index.module.scss'

interface InfoBlockFriendButtons {
  userInfoFriend: IFriend
}

const tempStyle = { fontSize: '18px', color: '#fff' }

export const InfoBlockButton = observer(({ userInfoFriend }: InfoBlockFriendButtons) => {
  const { sendFriendRequest, removeFromFriends } = friendsApi
  const { userInfo } = userApi
  const { user } = authApi

  const userId = userInfo?.displayName

  const isMyPage = user?.displayName === userId

  const isUserFriend = user?.friends?.some((friend: IFriend) => friend.displayName === userId)

  const isUserExistIncReq = user?.incomingReq?.some((req: IFriend) => req.displayName === userId)
  const isUserExistOutReq = user?.outgoingReq?.some((req: IFriend) => req.displayName === userId)

  return (
    user && (
      <div className={`${s.infoBlockButton} flex jcc aic`}>
        {!isMyPage ? (
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
  )
})
