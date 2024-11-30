import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
import authApi from '@/shared/store/auth-api'
import getChatsApi from '@/shared/store/chats/get-chats-api'
import { useEffect, useState } from 'react'
import { ChatsList, ChatWindow, ChatWindowProps } from '@/entities/chats/index'
import { useMobile } from '@/shared/hooks/useMobile'

export const ChatsPage = observer(() => {
  const { user } = authApi
  const { getChats } = getChatsApi
  const isMobile = useMobile()

  const [chat, setChat] = useState<ChatWindowProps | null>(null)

  useEffect(() => {
    if (user?.displayName && user?.avatarUrl) {
      getChats({
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      })
    }
  }, [user?.displayName])

  return (
    <div className={`${s.chatsPage} flex`}>
      <ChatsList setChat={setChat} />
      {isMobile ? (
        chat?.people && (
          <ChatWindow
            messages={chat.messages}
            people={chat.people}
            setChat={() => setChat(null)}
          />
        )
      ) : (
        <ChatWindow
          messages={chat?.messages}
          people={chat?.people}
          setChat={() => setChat(null)}
        />
      )}
    </div>
  )
})
