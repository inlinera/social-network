import s from './index.module.scss'
//HOOKS
import { useSliceStr } from '@/shared/hooks/useSliceStr'
//INTERFACES
import { IChat, IMessage } from '@/shared/interfaces/IChat'
import { IFriend } from '@/shared/interfaces/IFriend'
//MOBX
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
//COMPONENTS
import { Avatar } from 'antd'

interface ChatComponentProps {
  chatUser: IFriend
  lastMessage: IMessage
  msgDate: Date
  chat: IChat
}

export const ChatComponent = ({
  chatUser,
  lastMessage,
  msgDate,
  chat,
}: ChatComponentProps) => {
  const { getChat } = getChatApi

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
          <p>{useSliceStr(lastMessage?.message, 6) || '......'}</p>
        </div>
      </div>
      <span>{lastMessage?.time && msgDate.getHours() + ':' + msgDate.getMinutes()}</span>
    </div>
  )
}
