import { IFriend } from '@/shared/interfaces/IFriend'
import { IUser } from '@/shared/interfaces/IUser'

import friendsApi from '@/shared/store/api/user/friends/friends-api'

import { AcceptFriend } from '@/features/users/add-friend'
import { NavChatFeature } from '@/features/users/nav-chat'
import { UserDeleteOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const useButton = <T extends IUser>(targetUserInformation: T, myUserInformation: T): JSX.Element | null => {
  const { sendFriendRequest, removeFromOutFriends } = friendsApi

  const isMyPage = myUserInformation?.displayName === targetUserInformation?.displayName
  const isUserFriend = myUserInformation?.friends?.some(
    (friend: IFriend) => friend.displayName === targetUserInformation?.displayName
  )

  const isUserExistIncReq = myUserInformation?.incomingReq?.some(
    (req: IFriend) => req.displayName === targetUserInformation?.displayName
  )
  const isUserExistOutReq = myUserInformation?.outgoingReq?.some(
    (req: IFriend) => req.displayName === targetUserInformation?.displayName
  )

  const userInfo = { displayName: targetUserInformation?.displayName }
  const myUserInfo = { displayName: myUserInformation?.displayName }

  if (!myUserInformation) return null

  if (isMyPage) {
    return (
      <Link to="/settings">
        <SettingOutlined style={{ fontSize: 20 }} />
      </Link>
    )
  }

  if (isUserFriend) {
    return <NavChatFeature userInfo={targetUserInformation} />
  }

  if (isUserExistIncReq) {
    return <AcceptFriend userInfo={userInfo} />
  }

  if (isUserExistOutReq) {
    return (
      <button onClick={() => removeFromOutFriends(userInfo, myUserInfo)}>
        <UserDeleteOutlined style={{ fontSize: 20 }} />
      </button>
    )
  }

  return (
    <button onClick={() => sendFriendRequest(userInfo, myUserInfo)}>
      <UserAddOutlined style={{ fontSize: 20 }} />
    </button>
  )
}
