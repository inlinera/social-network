import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'

import { ChatComponent } from './components/chat'

import { IChat } from '@/shared/interfaces/IChat'

import { v4 } from 'uuid'

export const ChatsList = observer(() => {
  const { user } = authApi
  const { chats, loading } = getChatsApi

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      <div className={`${s.chatsList__up} flex aic`}>
        <h2>Chats</h2>
      </div>
      <div data-id="chats">
        {loading
          ? Array.from({ length: 5 }, () => <ChatComponent loading key={v4()} />)
          : chats?.map((chat: IChat) => {
              const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
              const lastMessage = chat.messages?.[chat.messages.length - 1]
              const msgDate = new Date(lastMessage?.time)

              return (
                <ChatComponent
                  loading={loading}
                  currChat={chat}
                  chatUser={`${chatUser?.displayName}`}
                  lastMessage={lastMessage}
                  msgDate={msgDate}
                  isTimeVisible
                  key={chat.chatId}
                />
              )
            })}
      </div>
    </div>
  )
})
