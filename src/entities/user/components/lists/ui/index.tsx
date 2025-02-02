import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import { useNav } from '@/shared/hooks/useNav'
import { IFriend } from '@/shared/interfaces/IFriend'
import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd'
import { useState } from 'react'

interface UserFriendProps {
  item: IFriend
  listType: number
}

export const UserFriendItem = ({ item, listType }: UserFriendProps) => {
  const { acceptFriendRequest, removeFromFriends } = friendsApi
  const { user } = authApi
  const [avatar, setAvatar] = useState('')
  const avatarUrl = async () => {
    const url = await useGetAvatar(item.displayName)
    setAvatar(url)
  }
  avatarUrl()
  const nav = useNav(`/user/${item?.displayName}`)
  return (
    <List.Item>
      <button onClick={() => nav()}>
        <List.Item.Meta
          style={{ alignItems: 'center', display: 'flex' }}
          avatar={<Avatar src={avatar} size={40} />}
          title={<span style={{ whiteSpace: 'nowrap' }}>{item?.displayName}</span>}
        />
      </button>
      <div>
        {(listType === 0 || listType === 1) && (
          <button onClick={() => removeFromFriends(item)}>
            <UserDeleteOutlined style={{ fontSize: '17px' }} />
          </button>
        )}
        {listType === 2 && (
          <button
            onClick={() => acceptFriendRequest(item, { displayName: `${user?.displayName}` })}
          >
            <UserAddOutlined style={{ fontSize: '18px' }} />
          </button>
        )}
      </div>
    </List.Item>
  )
}
