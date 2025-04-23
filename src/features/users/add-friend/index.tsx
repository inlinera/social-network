import s from './index.module.scss'
import { myUserFriend } from '@/shared/constants/users/my-user-info'
import { IFriend } from '@/shared/interfaces/IFriend'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
import { UserAddOutlined } from '@ant-design/icons'

interface AcceptFriendProps {
  userInfo: IFriend
}

export const AcceptFriend = ({ userInfo }: AcceptFriendProps) => {
  const { acceptFriendRequest } = friendsApi
  return (
    <button className={s.acceptFriend} onClick={() => acceptFriendRequest(userInfo, myUserFriend())}>
      <UserAddOutlined />
    </button>
  )
}
