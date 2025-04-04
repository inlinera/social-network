import { observer } from 'mobx-react-lite'

import { List } from 'antd'
import { UserFriendItem } from './ui/item'

import { IFriend } from '@/shared/interfaces/IFriend'

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
