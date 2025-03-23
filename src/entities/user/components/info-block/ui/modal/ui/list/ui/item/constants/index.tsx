import { AcceptFriend } from '@/features/users/add-friend'
import { myUserFriend } from '@/shared/data/users/my-user-info'
import { IFriend } from '@/shared/interfaces/IFriend'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
import { UserDeleteOutlined } from '@ant-design/icons'

interface IItem {
  id: number
  item: React.ReactNode
}

const del = <UserDeleteOutlined style={{ fontSize: '17px' }} />

export const items = (item: IFriend) => {
  const { removeFromFriends, removeFromOutFriends } = friendsApi

  return [
    {
      id: 0,
      item: <button onClick={() => removeFromFriends(item, myUserFriend())}>{del}</button>,
    },
    { id: 1, item: <button onClick={() => removeFromOutFriends(item, myUserFriend())}>{del}</button> },
    {
      id: 2,
      item: <AcceptFriend userInfo={item} />,
    },
  ] as IItem[]
}
