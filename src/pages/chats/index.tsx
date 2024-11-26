import s from './index.module.scss'
import authApi from '@/shared/store/auth-api'
import getChatsApi from '@/shared/store/chats/get-chats-api'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Avatar } from 'antd'

export const ChatsPage = observer(() => {
  const { user } = authApi
  const { chats, getChats } = getChatsApi

  const sliceStr = (str: string, m: number) => (str.length > m ? str.slice(0, m) + '...' : str)

  useEffect(() => {
    if (user?.displayName) {
      getChats(user.displayName)
    }
  }, [user?.displayName])
  return (
    <div className={`${s.chatsPage}`}>
      <div className="flex fdc jcc aic">
        <h2 className="fz17">Your chats</h2>
        {chats?.map(chat => {
          const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
          const lastMessage = chat.messages[chat.messages.length - 1]
          const msgDate = new Date(lastMessage.time)
          return (
            <div className={`${s.chatElement} flex aic jcsb`} key={chat.messages[0].time}>
              <div className="flex aic jcc">
                <Avatar size={59} src={chatUser?.avatarUrl} alt="avatar" draggable={false} />
                <div className="flex fdc">
                  <h4 className="fz17">{chatUser?.displayName}</h4>
                  <p>{sliceStr(lastMessage.message, 25)}</p>
                </div>
              </div>
              <p>{msgDate.getHours() + ':' + msgDate.getMinutes()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
})
