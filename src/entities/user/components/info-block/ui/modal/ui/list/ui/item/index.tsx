import { useState } from 'react'

import { useNav } from '@/shared/hooks/useNav'

import { IFriend } from '@/shared/interfaces/IFriend'

import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import { List } from 'antd'
import { InView } from 'react-intersection-observer'

import { items } from './constants'

import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'
import { observer } from 'mobx-react-lite'

interface UserFriendProps {
  item: IFriend
  listType: number
}

export const UserFriendItem = observer(({ item, listType }: UserFriendProps) => {
  const { user } = authApi
  const { userInfo } = userApi

  const [avatar, setAvatar] = useState<AvatarT>(null)

  const nav = useNav(`/user/${item?.displayName}`)

  return (
    <List.Item>
      <InView
        as="button"
        onChange={inView => handleView(item.displayName, inView, avatar, setAvatar)}
        onClick={nav}
      >
        <List.Item.Meta
          style={{ alignItems: 'center', display: 'flex' }}
          avatar={<AvatarUI loading={false} src={avatar} userName={`${item.displayName}`} size={50} />}
          title={
            <TextUi lines={1} loading={avatar === ''}>
              <span style={{ whiteSpace: 'nowrap' }}>{item?.displayName}</span>
            </TextUi>
          }
        />
      </InView>
      <div>{user?.displayName === userInfo?.displayName && items(item)[listType].item}</div>
    </List.Item>
  )
})
