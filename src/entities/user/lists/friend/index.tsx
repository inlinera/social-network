import { FC } from "react"
//COMPONENTS
import { Avatar, List } from "antd"
//INTERFACES
import { IFriend } from "@/shared/interfaces/IFriend"
import { IUser } from "@/shared/interfaces/IUser"
//ICONS
import { UserDeleteOutlined } from "@ant-design/icons"
//HOOKS
import { useNav } from "@/shared/hooks/useNav"

export const UserFriendList: FC<{ userInfo?: IUser }> = ({ userInfo }) => {


  return (
    <List
        itemLayout="horizontal"
        dataSource={userInfo?.friends}
        renderItem={(item: IFriend) => {
          const navToUserPage = useNav(`/user/${item?.displayName}`)
          return (
            <List.Item>
            <button onClick={() => navToUserPage()}>
                <List.Item.Meta
                    style={{ alignItems: 'center', display: 'flex' }}
                    avatar={<Avatar src={item.avatarUrl} size={40}/>}
                    title={<span style={{whiteSpace: 'nowrap'}}>{item?.displayName}</span>}
                />
            </button>
                <div>
                  <button onClick={() => console.log('q')}>
                  <UserDeleteOutlined style={{fontSize: '17px'}}/>
                  </button>
                </div>
            </List.Item>
        )}
      }
    />
  )
}
