import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
//COMPONENTS
import { ChatComponent } from './components/chat'
//INTERFACES
import { IChat } from '@/shared/interfaces/IChat'
import { v4 } from 'uuid'
import { useState } from 'react'
import { NewChatBlock } from './components/newChatBlock'

export const ChatsList = observer(() => {
  const { user } = authApi
  const { chats, loading } = getChatsApi
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      {isVisible && <NewChatBlock setIsVisible={setIsVisible} />}
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
                  key={chat.chatId}
                />
              )
            })}
      </div>
      {!isVisible && (
        <div className={s.chatsList_more}>
          <button onClick={() => setIsVisible(true)}>+</button>
        </div>
      )}
    </div>
  )
})
