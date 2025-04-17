import { useState } from 'react'
import s from './index.module.scss'
import { observer } from 'mobx-react-lite'

import { IFriend } from '@/shared/interfaces/IFriend'
import { IMessage } from '@/shared/interfaces/IChat'

import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'

import { PinnedMsgs } from '../pinnedMsgs'
import { InView } from 'react-intersection-observer'
import { ChatMessagesList } from './ui/list'
import { ChevronDown } from 'lucide-react'

import { useScrollBottom } from '@/shared/hooks/chats/useScrollBottom'
import { useTranslation } from 'react-i18next'

interface ChatMessagesBlockProps {
  chattingUser: IFriend
  setSelectedImg: (_: string | null) => void
}

export const ChatMessagesBlock = observer(({ chattingUser, setSelectedImg }: ChatMessagesBlockProps) => {
  const { chat } = getChatApi
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {(chat?.pinned.length as number) > 0 && <PinnedMsgs pin={chat?.pinned as IMessage[]} />}
      <div className={`${s.chat} flex fdc scroll`}>
        <div className="flex jcc aic">
          <b>
            {t('chats.window.start')} {chattingUser?.displayName}
          </b>
        </div>
        <ChatMessagesList setSelectedImg={setSelectedImg} />
        {!isVisible && (
          <button className={`${s.chat_bottom} flex jcc aic`} onClick={useScrollBottom}>
            <ChevronDown />
          </button>
        )}
        <InView as="div" threshold={0.1} onChange={inView => setIsVisible(inView)}>
          {({ ref }) => <div ref={ref} id="endRef" />}
        </InView>
      </div>
    </>
  )
})
