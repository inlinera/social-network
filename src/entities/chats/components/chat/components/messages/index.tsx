import { IFriend } from '@/shared/interfaces/IFriend'
import s from './index.module.scss'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { ChatMessageUI } from '../../ui/message'
import authApi from '@/shared/store/api/user/auth/auth-api'

interface ChatMessagesBlockProps {
  chattingUser: IFriend
}

export const ChatMessagesBlock = ({ chattingUser }: ChatMessagesBlockProps) => {
  const { user } = authApi
  const { chat } = getChatApi

  return (
    <div className={`${s.chat} flex fdc aic`}>
      <i>Here was started your chat with {chattingUser?.displayName}</i>
      {chat?.messages.map(m => {
        const isThisMessageMy = m.userId == user?.displayName
        return <ChatMessageUI isThisMessageMy={isThisMessageMy} message={m} key={m.id} />
      })}
    </div>
  )
}
