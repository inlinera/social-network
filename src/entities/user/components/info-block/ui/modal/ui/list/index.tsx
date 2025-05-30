import { observer } from 'mobx-react-lite'

import s from './index.module.scss'

import { UserFriendItem } from './ui/item'

import { IFriend } from '@/shared/interfaces/IFriend'

interface UserFriendListProps {
  arr: IFriend[]
  listType: number
}

export const UserFriendList = observer(({ arr, listType }: UserFriendListProps) => {
  return (
    <ul className={`${s.friendList} flex fdc aic jcc`}>
      {arr.length > 0 ? (
        arr.map((item: IFriend) => <UserFriendItem item={item} listType={listType} key={item.displayName} />)
      ) : (
        <div className="flex fdc tac">
          <img src="https://i.postimg.cc/vmx8V37m/20250420-115413.png" alt="2la" width={125} height={125} />
          <b>No data</b>
        </div>
      )}
    </ul>
  )
})
