import { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import authApi from '@/shared/store/api/user/auth/auth-api'

import { ChatMessageUI } from '../../../../ui/message'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ChevronDown } from 'lucide-react'
import { useScrollBottom } from '@/shared/hooks/chats/useScrollBottom'

interface ChatMessagesListProps {
  setSelectedImg: (_: string | null) => void
}

export const ChatMessagesList = observer(({ setSelectedImg }: ChatMessagesListProps) => {
  const { user } = authApi
  const { chat } = getChatApi

  const parentRef = useRef<HTMLDivElement>(null)
  const [isInBottom, setIsInBottom] = useState(false)

  const rowVirtualizer = useVirtualizer({
    count: chat?.messages.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 6,
    measureElement: element => {
      return element.getBoundingClientRect().height
    },
  })

  return (
    <div
      className={`${s.msgList} flex fdc`}
      ref={parentRef}
      key={chat?.chatId}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {rowVirtualizer.getVirtualItems().map(message => {
        const m = chat?.messages?.[message.index]!
        const isThisMessageMy = m?.userId === user?.displayName

        return (
          <ChatMessageUI
            id={m.id}
            isThisMessageMy={isThisMessageMy}
            message={m}
            setSelectedImg={setSelectedImg}
            key={m.id}
            setIsInBottom={setIsInBottom}
          />
        )
      })}
      {!isInBottom && (
        <button
          className={`${s.chat_bottom} flex jcc aic`}
          onClick={() => useScrollBottom(`${chat?.messages[chat.messages.length - 1].id}`)}
        >
          <ChevronDown />
        </button>
      )}
    </div>
  )
})
