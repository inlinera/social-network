import { IFriend } from '@/shared/interfaces/IFriend'
import s from './index.module.scss'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { PinnedMsgs } from '../pinnedMsgs'
import { IMessage } from '@/shared/interfaces/IChat'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { InView } from 'react-intersection-observer'
import { observer } from 'mobx-react-lite'
import { ChatMessagesList } from './ui/list'

interface ChatMessagesBlockProps {
  chattingUser: IFriend
}

export const ChatMessagesBlock = observer(({ chattingUser }: ChatMessagesBlockProps) => {
  const { chat } = getChatApi
  const [isVisible, setIsVisible] = useState(false)

  const handleScrollBottom = () => {
    const endElement = document.getElementById('endRef')
    if (endElement) {
      endElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {(chat?.pinned.length as number) > 0 && <PinnedMsgs pin={chat?.pinned as IMessage[]} />}
      <div className={`${s.chat} flex fdc`}>
        <div className="flex jcc aic">
          <b>Here was started your chat with {chattingUser?.displayName}</b>
        </div>
        <ChatMessagesList />
        {!isVisible && (
          <button className={`${s.chat_bottom} flex jcc aic`} onClick={handleScrollBottom}>
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
