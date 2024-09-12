import { FC } from "react"
import { Link } from "react-router-dom"
//COMPONENTS
import { Avatar, List } from "antd"
//INTERFACES
import { IFriend } from "@/shared/interfaces/IFriend"
import { IUser } from "@/shared/interfaces/IUser"

export const UserFriendList: FC<{ userInfo?: IUser }> = ({ userInfo }) => {

  return (
    <List
        itemLayout="horizontal"
        dataSource={userInfo?.friends}
        renderItem={(item: IFriend) => (
            <Link to={`/user/${item?.displayName}`}>
            <List.Item>
                <List.Item.Meta
                    style={{ alignItems: 'center', display: 'flex' }}
                    avatar={<Avatar src={item.avatarUrl} size={40}/>}
                    title={<span style={{whiteSpace: 'nowrap'}}>{item?.displayName}</span>}
                />
            </List.Item>
            </Link>
        )}
    />
  )
}
