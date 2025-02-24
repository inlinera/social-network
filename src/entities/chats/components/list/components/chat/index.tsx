import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//HOOKS
import { useSliceStr } from '@/shared/hooks/useSliceStr'
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
//INTERFACES
import { IChat, IMessage } from '@/shared/interfaces/IChat'
//MOBX
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
//COMPONENTS
import { TextUi } from '@/shared/ui/text'
import { AvatarUI } from '@/shared/ui/avatar'
import { IUser } from '@/shared/interfaces/IUser'

interface ChatComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean
  chatUser?: string
  lastMessage?: IMessage
  msgDate?: Date
  currChat?: IChat
  isTimeVisible?: boolean
  userInfo?: IUser
}

export const ChatComponent = observer(
  ({
    loading,
    chatUser,
    lastMessage,
    msgDate,
    currChat,
    isTimeVisible,
  }: ChatComponentProps) => {
    console.log('chat rerender')
    const { getChat, chat } = getChatApi
    const [avatar, setAvatar] = useState('')
    const isActive = chat?.people.find(u => u.displayName === chatUser)

    const avatarUrl = async () => {
      const url = await useGetAvatar(`${chatUser}`)
      setAvatar(url)
    }
    avatarUrl()

    const handleGetChat = () => {
      if (currChat) {
        if (isActive) return
        return getChat(`${currChat.chatId}`)
      }
    }

    return (
      <div
        className={`${s.chatElement} ${isActive && s.active} flex aic jcsb`}
        key={currChat?.messages[0]?.time}
        onClick={handleGetChat}
      >
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
            <span>
              {lastMessage?.time && msgDate?.getHours() + ':' + msgDate?.getMinutes()}
            </span>
          </TextUi>
        )}
      </div>
    )
  }
)
