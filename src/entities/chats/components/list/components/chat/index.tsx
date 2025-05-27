import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { addZero } from '@/shared/constants/addZero'

import { IChat, IMessage } from '@/shared/interfaces/IChat'
import { IUser } from '@/shared/interfaces/IUser'

import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { chatState } from '@/shared/store/functional/chat/content'

import { TextUi } from '@/shared/ui/text'
import { AvatarUI } from '@/shared/ui/avatar'

import { InView } from 'react-intersection-observer'
import { AvatarT, handleView } from '@/shared/constants/components-observer/handleView'
import { useTranslation } from 'react-i18next'

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
  ({ loading, chatUser, lastMessage, msgDate, currChat, isTimeVisible = true }: ChatComponentProps) => {
    const { getChat, chat } = getChatApi
    const { setIsChat } = chatState
    const [avatar, setAvatar] = useState<AvatarT>(null)
    const { t } = useTranslation()

    const isActive = chat?.people.find(u => u.displayName === chatUser)

    const handleGetChat = () => {
      if (currChat) {
        if (isActive) return

        setIsChat(true)
        getChat(`${currChat.chatId}`)
      }
    }

    return (
      <div
        className={`${s.chatElement} ${isActive && s.active} flex aic`}
        key={currChat?.messages[0]?.time}
        onClick={handleGetChat}
      >
        <InView
          as="div"
          onChange={inView => handleView(`${chatUser}`, inView, avatar, setAvatar)}
          className={`flex aic`}
        >
          <AvatarUI loading={loading} src={avatar} userName={`${chatUser}`} size={50} />
          <div className="flex fdc">
            <TextUi loading={loading} lines={1}>
              <h4>@{chatUser}</h4>
            </TextUi>
            <TextUi loading={loading} lines={1}>
              <p className={s.lastMsg}>
                {lastMessage ? (
                  <>
                    {lastMessage.image && t('chats.photo')} {lastMessage.message}
                  </>
                ) : (
                  '...'
                )}
              </p>
            </TextUi>
          </div>
        </InView>
        {isTimeVisible && (
          <TextUi loading={loading} lines={1}>
            <span>{lastMessage?.time && addZero(msgDate?.getHours()) + ':' + addZero(msgDate?.getMinutes())}</span>
          </TextUi>
        )}
      </div>
    )
  }
)
