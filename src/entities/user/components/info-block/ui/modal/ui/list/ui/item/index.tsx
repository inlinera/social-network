import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import s from './index.module.scss'

import { useNav } from '@/shared/hooks/useNav'

import { IFriend } from '@/shared/interfaces/IFriend'

import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'

import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
import { InView } from 'react-intersection-observer'

import { items } from './constants'

import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'

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
    <li className={`${s.friendItem} flex aic jcsb`}>
      <InView
        as="button"
        onChange={inView => handleView(item.displayName, inView, avatar, setAvatar)}
        onClick={nav}
      >
        <div className={`${s.friendItem__meta} flex aic`}>
          <AvatarUI loading={false} src={avatar} userName={`${item.displayName}`} size={50} />
          <TextUi lines={1} loading={avatar === ''}>
            <span>{item?.displayName}</span>
          </TextUi>
        </div>
      </InView>
      <div>{user?.displayName === userInfo?.displayName && items(item)[listType].item}</div>
    </li>
  )
})
