import { observer } from 'mobx-react-lite'
//COMPONENTS
import { List } from 'antd'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { UserFriendItem } from './ui/item'

interface UserFriendListProps {
  arr: IFriend[]
  listType: number
}

export const UserFriendList = observer(({ arr, listType }: UserFriendListProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={arr}
      renderItem={(item: IFriend) => <UserFriendItem item={item} listType={listType} />}
    />
  )
})
