import { memo, useState } from 'react'
import s from './index.module.scss'
import { Link } from 'react-router-dom'

import { Dropdown } from 'antd'
import { AvatarUI } from '@/shared/ui/avatar'

import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons'

import { items } from '@/shared/data/chats/dropdown'

import { useMobile } from '@/shared/hooks/useMobile'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'

import { IFriend } from '@/shared/interfaces/IFriend'

import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'

interface ChatUserBlockProps {
  chattingUser: IFriend
}

export const ChatUserBlock = memo(({ chattingUser }: ChatUserBlockProps) => {
  const { setChat, loading } = getChatApi
  const isMobile = useMobile()
  const [avatar, setAvatar] = useState<string | null>(null)

  const avatarUrl = async () => {
    const url = await useGetAvatar(chattingUser.displayName)
    setAvatar(url)
  }
  avatarUrl()

  return (
    <div className={`${s.chatWindow_user} flex aic jcsb`}>
      <div className="flex aic">
        {isMobile && (
          <button onClick={() => setChat(null)} className="fz17">
            <ArrowLeftOutlined />
          </button>
        )}
        <Link className={`${s.chatWindow_user__info} flex aic`} to={`/user/${chattingUser?.displayName}`}>
          <AvatarUI loading={loading} src={avatar} size={40} userName={chattingUser.displayName} />
          <h3>@{chattingUser?.displayName}</h3>
        </Link>
      </div>
      <Dropdown menu={{ items: items(chattingUser.displayName) }} trigger={['click']}>
        <button className="fz17">
          <MoreOutlined />
        </button>
      </Dropdown>
    </div>
  )
})
