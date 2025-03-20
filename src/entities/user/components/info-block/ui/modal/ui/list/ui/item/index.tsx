import { AcceptFriend } from '@/features/users/add-friend'
import { myUserFriend } from '@/shared/data/users/my-user-info'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import { useNav } from '@/shared/hooks/useNav'
import { IFriend } from '@/shared/interfaces/IFriend'
import authApi from '@/shared/store/api/user/auth/auth-api'
import friendsApi from '@/shared/store/api/user/friends/friends-api'
import userApi from '@/shared/store/api/user/profile/user-api'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import { UserDeleteOutlined } from '@ant-design/icons'
import { List } from 'antd'
import { useState } from 'react'

interface UserFriendProps {
  item: IFriend
  listType: number
}

export const UserFriendItem = ({ item, listType }: UserFriendProps) => {
  const { removeFromFriends, removeFromOutFriends } = friendsApi
  const { user } = authApi
  const { userInfo } = userApi

  const [avatar, setAvatar] = useState<string | null>(null)

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
          avatar={<AvatarUI loading={false} src={avatar} userName={`${item.displayName}`} size={50} />}
          title={
            <TextUi lines={1} loading={avatar == ''}>
              <span style={{ whiteSpace: 'nowrap' }}>{item?.displayName}</span>
            </TextUi>
          }
        />
      </button>
      <div>
        {user?.displayName == userInfo?.displayName &&
          (listType === 0 ? (
            <button onClick={() => removeFromFriends(item, myUserFriend())}>
              <UserDeleteOutlined style={{ fontSize: '17px' }} />
            </button>
          ) : listType === 1 ? (
            <button onClick={() => removeFromOutFriends(item, myUserFriend())}>
              <UserDeleteOutlined style={{ fontSize: '17px' }} />
            </button>
          ) : (
            listType === 2 && <AcceptFriend userInfo={item} />
          ))}
      </div>
    </List.Item>
  )
}
