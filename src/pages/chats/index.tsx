import s from './index.module.scss'
import authApi from '@/shared/store/auth-api'
import getChatsApi from '@/shared/store/chats/get-chats-api'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

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
      <div>
        {chats?.map(chat => {
          const lastMessage = chat.messages[chat.messages.length - 1]
          const msgDate = new Date(lastMessage.time)
          return (
            <div className={`${s.chatElement} flex aic jcsb`} key={chat.messages[0].time}>
              <div className="flex fdc">
                <h4 className="fz17">{chat.people.filter(p => p != user?.displayName)}</h4>
                <p>{sliceStr(lastMessage.message, 25)}</p>
              </div>
              <p>{msgDate.getHours() + ':' + msgDate.getMinutes()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
})
