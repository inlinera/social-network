import { observer } from 'mobx-react-lite'
//COMPONENTS
import { Avatar, List } from 'antd'
//MOBX
import authApi from '@/shared/store/auth-api'
import friendsApi from '@/shared/store/friends-api'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
//ICONS
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
//HOOKS
import { useNav } from '@/shared/hooks/useNav'

interface UserFriendListProps {
  array?: IFriend[]
  listType: string
}

export const UserFriendList = observer(({ array, listType }: UserFriendListProps) => {
  const { acceptFriendRequest, removeFromFriends } = friendsApi
  const { user } = authApi

  return (
    <List
      itemLayout="horizontal"
      dataSource={array}
      renderItem={(item: IFriend) => {
        const navToUserPage = useNav(`/user/${item?.displayName}`)

        const userInfoFriend = item
        const myUserInfoFriend = user as IFriend

        return (
          <List.Item>
            <button onClick={() => navToUserPage()}>
              <List.Item.Meta
                style={{ alignItems: 'center', display: 'flex' }}
                avatar={<Avatar src={item.avatarUrl} size={40} />}
                title={<span style={{ whiteSpace: 'nowrap' }}>{item?.displayName}</span>}
              />
            </button>
            <div>
              {listType == 'friend' && (
                <button onClick={() => removeFromFriends(userInfoFriend, myUserInfoFriend)}>
                  <UserDeleteOutlined style={{ fontSize: '17px' }} />
                </button>
              )}
              {listType == 'outgoingRequests' && (
                <button onClick={() => removeFromFriends(userInfoFriend, myUserInfoFriend)}>
                  <UserDeleteOutlined style={{ fontSize: '17px' }} />
                </button>
              )}
              {listType == 'incomingRequests' && (
                <button onClick={() => acceptFriendRequest(userInfoFriend, myUserInfoFriend)}>
                  <UserAddOutlined style={{ fontSize: '18px' }} />
                </button>
              )}
            </div>
          </List.Item>
        )
      }}
    />
  )
})
