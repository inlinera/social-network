import { IFriend } from '@/shared/interfaces/IFriend'
import s from './index.module.scss'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { ChatMessageUI } from '../../ui/message'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { PinnedMsgs } from '../pinnedMsgs'
import { IMessage } from '@/shared/interfaces/IChat'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { InView } from 'react-intersection-observer'

interface ChatMessagesBlockProps {
  chattingUser: IFriend
}

export const ChatMessagesBlock = ({ chattingUser }: ChatMessagesBlockProps) => {
  const { user } = authApi
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
        {chat?.messages.map(m => {
          const isThisMessageMy = m.userId === user?.displayName
          return <ChatMessageUI isThisMessageMy={isThisMessageMy} message={m} key={m.id} />
        })}
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
}
