import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import s from './index.module.scss'
//HOOKS
import { useSliceStr } from '@/shared/hooks/useSliceStr'
//INTERFACES
import { IChat, IMessage } from '@/shared/interfaces/IChat'
//MOBX
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
//COMPONENTS
import { useState } from 'react'
import { TextUi } from '@/shared/ui/text'
import { AvatarUI } from '@/shared/ui/avatar'

interface ChatComponentProps {
  loading: boolean
  chatUser?: string
  lastMessage?: IMessage
  msgDate?: Date
  chat?: IChat
  isTimeVisible?: boolean
}

export const ChatComponent = ({
  loading,
  chatUser,
  lastMessage,
  msgDate,
  chat,
  isTimeVisible,
}: ChatComponentProps) => {
  const { getChat } = getChatApi
  const [avatar, setAvatar] = useState('')

  const avatarUrl = async () => {
    const url = await useGetAvatar(`${chatUser}`)
    setAvatar(url)
  }
  avatarUrl()
  if (isTimeVisible == undefined) isTimeVisible = true

  return (
    <div
      className={`${s.chatElement} flex aic jcsb`}
      key={chat?.messages[0]?.time}
      onClick={() => chat && getChat(`${chat.chatId}`)}
    >
      {}
      <div className="flex aic jcsb">
        <AvatarUI loading={avatar == '' || loading} src={avatar} size={50} />
        <div className="flex fdc">
          <TextUi loading={loading} lines={1}>
            <h4>@{chatUser}</h4>
          </TextUi>
          {lastMessage && (
            <TextUi loading={loading} lines={1}>
              <p>{useSliceStr(`${lastMessage.message}`, 6) || ''}</p>
            </TextUi>
          )}
        </div>
      </div>
      {isTimeVisible && (
        <TextUi loading={loading} lines={1}>
          <span>{lastMessage?.time && msgDate?.getHours() + ':' + msgDate?.getMinutes()}</span>
        </TextUi>
      )}
    </div>
  )
}
