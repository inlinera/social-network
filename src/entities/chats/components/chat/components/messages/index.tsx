import { IFriend } from '@/shared/interfaces/IFriend'
import s from './index.module.scss'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { ChatMessageUI } from '../../ui/message'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { PinnedMsgs } from '../pinnedMsgs'
import { IMessage } from '@/shared/interfaces/IChat'

interface ChatMessagesBlockProps {
  chattingUser: IFriend
}

export const ChatMessagesBlock = ({ chattingUser }: ChatMessagesBlockProps) => {
  const { user } = authApi
  const { chat } = getChatApi

  return (
    <>
      {(chat?.pinned.length as number) > 0 && <PinnedMsgs pin={chat?.pinned as IMessage[]} />}
      <div className={`${s.chat} flex fdc`}>
        <div className="flex jcc aic">
          <b>Here was started your chat with {chattingUser?.displayName}</b>
        </div>
        {chat?.messages.map(m => {
          const isThisMessageMy = m.userId == user?.displayName
          return <ChatMessageUI isThisMessageMy={isThisMessageMy} message={m} key={m.id} />
        })}
      </div>
    </>
  )
}
