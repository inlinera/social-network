import s from './index.module.scss'
import { HTMLAttributes, useRef, useEffect } from 'react'

import { IMessage } from '@/shared/interfaces/IChat'

import { items } from '@/shared/data/chats/context'

import { LinkifyText } from '@/shared/ui/parseText'
import { ContextMenuUI } from '@/shared/ui/context-menu'
import { ChatCommonMsgViewUi } from '../common/msg-view'
import { ImageUI } from '@/shared/ui/image'

import { sliceStr } from '@/shared/constants/sliceStr'
import { addZero } from '@/shared/constants/addZero'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { useInViewport } from '@/shared/hooks/useInViewport'

interface ChatMessageUIProps extends HTMLAttributes<HTMLDivElement> {
  isThisMessageMy: boolean
  message: IMessage
  setSelectedImg: (_: string | null) => void
  className?: string
  setIsInBottom: (_: boolean) => void
}

export const ChatMessageUI = ({
  isThisMessageMy,
  message,
  setSelectedImg,
  className,
  setIsInBottom,
  ...props
}: ChatMessageUIProps) => {
  const { chat } = getChatApi
  const lastMsgRef = useRef<HTMLDivElement>(null)
  const isInViewport = useInViewport(lastMsgRef)

  const msgDate = new Date(message?.time)
  const isLastMessage = chat?.messages[chat.messages.length - 1].id === message.id

  const time = {
    mon: msgDate.getMonth(),
    d: msgDate.getDate(),
    hr: msgDate.getHours(),
    min: msgDate.getMinutes(),
  }

  const handleOpenImage = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation()
    setSelectedImg(`${message.image}`)
  }

  useEffect(() => {
    if (isLastMessage) {
      setIsInBottom(isInViewport)
    }
  }, [isLastMessage, setIsInBottom, isInViewport])

  return (
    <div
      className={`${className} ${isThisMessageMy ? s.myMessage : s.notMyMessage}`}
      ref={isLastMessage ? lastMsgRef : null}
      {...props}
    >
      <ContextMenuUI items={isThisMessageMy ? items(message).my : items(message).notMy}>
        <div data-id="msg" className="flex aic jcc fdc">
          {message.reply && (
            <div onClick={e => e.stopPropagation()}>
              <ChatCommonMsgViewUi id={message.reply.id}>
                <h4>@{message.reply.userId}</h4>
                <p>{sliceStr(message.reply.message, 9)}</p>
              </ChatCommonMsgViewUi>
            </div>
          )}
          <div className={s.image}>
            {message.image && <ImageUI src={message.image} alt="" borderRadius={10} onClick={handleOpenImage} />}
          </div>
          <p>
            <LinkifyText text={message.message} />
          </p>
        </div>
      </ContextMenuUI>
      <b>
        {time.hr}:{addZero(time.min)}, {addZero(time.d)}/{addZero(time.mon + 1)}
      </b>
    </div>
  )
}
