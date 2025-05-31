import { observer } from 'mobx-react-lite'

import s from './index.module.scss'

import { UserFriendItem } from '../item'

import { IFriend } from '@/shared/interfaces/IFriend'

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { v4 } from 'uuid'

interface UserFriendListProps {
  arr: IFriend[]
  listType: number
}

export const UserFriendList = observer(({ arr, listType }: UserFriendListProps) => {
  const parentRef = useRef<HTMLUListElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: arr?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 4,
  })

  return (
    <ul className={`flex fdc aic`} ref={parentRef} style={{ height: 'max-content', maxHeight: '360px' }}>
      {arr.length > 0 ? (
        <div
          className={`${s.friendList} flex fdc`}
          key={v4()}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const friend = arr?.[virtualRow.index]

            return <UserFriendItem item={friend} listType={listType} key={virtualRow.index} />
          })}
        </div>
      ) : (
        <div className="flex fdc jcc aic tac" style={{ height: '100%' }}>
          <img src="https://i.postimg.cc/vmx8V37m/20250420-115413.png" alt="2la" width={125} height={125} />
          <b>No data</b>
        </div>
      )}
    </ul>
  )
})
