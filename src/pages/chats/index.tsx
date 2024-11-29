import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
import authApi from '@/shared/store/auth-api'
import getChatsApi from '@/shared/store/chats/get-chats-api'
import { useEffect, useState } from 'react'
import { Avatar, Spin } from 'antd'
import { ChatWindow, ChatWindowProps } from './components/chat'
import { useMobile } from '@/shared/hooks/useMobile'

export const ChatsPage = observer(() => {
  const { user } = authApi
  const { chats, getChats, loading } = getChatsApi
  const isMobile = useMobile()

  const [chat, setChat] = useState<ChatWindowProps | null>(null)

  const sliceStr = (str: string, m: number) => (str.length > m ? str.slice(0, m) + '...' : str)

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
      <div className={`${s.chatsList} flex fdc`}>
        {loading ? (
          <>
            <Spin size="large" />
            <p style={{ marginTop: '5px' }} className="cw">
              Loading chats
            </p>
          </>
        ) : (
          chats?.map(chat => {
            const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
            const lastMessage = chat.messages[chat.messages.length - 1]
            const msgDate = new Date(lastMessage.time)
            const chatInfo = {
              people: {
                displayName: chatUser?.displayName!,
                avatarUrl: chatUser?.avatarUrl!,
              },
              messages: chat.messages,
            }
            return (
              <div
                className={`${s.chatElement} flex aic jcsb`}
                key={chat.messages[0].time}
                onClick={() => setChat(chatInfo as ChatWindowProps)}
              >
                <div className="flex">
                  <Avatar size={50} src={chatUser?.avatarUrl} alt="avatar" draggable={false} />
                  <div className="flex fdc">
                    <h4>@{chatUser?.displayName}</h4>
                    <p>{sliceStr(lastMessage.message, 25)}</p>
                  </div>
                </div>
                <span>{msgDate.getHours() + ':' + msgDate.getMinutes()}</span>
              </div>
            )
          })
        )}
      </div>
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
