import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
//COMPONENTS
import { LoadingUI } from '@/shared/ui/loading'
import { ChatComponent } from './components/chat'
//INTERFACES
import { IChat } from '@/shared/interfaces/IChat'

export const ChatsList = observer(() => {
  const { user } = authApi
  const { chats, loading } = getChatsApi

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      {loading || chats?.length == 0 ? (
        <LoadingUI>Chats are loading...</LoadingUI>
      ) : (
        chats?.map((chat: IChat) => {
          const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
          const lastMessage = chat.messages[chat.messages.length - 1]
          const msgDate = new Date(lastMessage?.time)
          return (
            <ChatComponent
              chat={chat}
              chatUser={`${chatUser?.displayName}`}
              lastMessage={lastMessage}
              msgDate={msgDate}
              key={chat.chatId}
            />
          )
        })
      )}
    </div>
  )
})
