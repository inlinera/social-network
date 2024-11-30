import getChatsApi from '@/shared/store/chats/get-chats-api'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'
import { ChatWindowProps } from '../chat'
import { Avatar } from 'antd'
import authApi from '@/shared/store/auth-api'
import { LoadingUI } from '@/shared/ui/loading'
import { IChat } from '@/shared/interfaces/IChat'

interface ChatsListProps {
  setChat: (_: ChatWindowProps | null) => void
}

export const ChatsList = observer(({ setChat }: ChatsListProps) => {
  const { chats, loading } = getChatsApi
  const { user } = authApi
  const sliceStr = (str: string, m: number) => (str.length > m ? str.slice(0, m) + '...' : str)

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      {loading || chats?.length == 0 ? (
        <LoadingUI>Chats are loading...</LoadingUI>
      ) : (
        chats?.map((chat: IChat) => {
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
              key={chat.messages[0]?.time}
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
  )
})
