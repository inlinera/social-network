import s from './index.module.scss'
import { Link } from 'react-router-dom'
//COMPONENTS
import { Dropdown } from 'antd'
//ICONS
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons'
//DATA
import { items } from '@/shared/data/chats/dropdown'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
//MOBX
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { memo, useState } from 'react'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import { AvatarUI } from '@/shared/ui/avatar'

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
