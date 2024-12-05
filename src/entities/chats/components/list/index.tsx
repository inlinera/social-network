import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
import chatState from '@/shared/store/api/chats/chat/get-chat-api'
//COMPONENTS
import { LoadingUI } from '@/shared/ui/loading'
import { Avatar } from 'antd'
//INTERFACES
import { IChat } from '@/shared/interfaces/IChat'

export const ChatsList = observer(() => {
  const { user } = authApi
  const { chats, loading } = getChatsApi
  const { getChat } = chatState
  const sliceStr = (str: string, m = 6) => (str.length > m ? str.slice(0, m) + '...' : str)

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      {loading || chats?.length == 0 ? (
        <LoadingUI>Chats are loading...</LoadingUI>
      ) : (
        chats?.map((chat: IChat) => {
          const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
          const lastMessage = chat.messages[chat.messages.length - 1]
          const msgDate = new Date(lastMessage.time)
          return (
            <div
              className={`${s.chatElement} flex aic jcsb`}
              key={chat.messages[0]?.time}
              onClick={() => getChat(chat.chatId)}
            >
              <div className="flex">
                <Avatar size={50} src={chatUser?.avatarUrl} alt="avatar" draggable={false} />
                <div className="flex fdc">
                  <h4>@{chatUser?.displayName}</h4>
                  <p>{sliceStr(lastMessage.message)}</p>
                </div>
              </div>
              <span>{msgDate.getHours() + ':' + msgDate.getMinutes()}</span>
            </div>
          )
        })
      )}
    </div>
  )
})
