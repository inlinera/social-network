import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'
//COMPONENTS
import { ChatInputUI } from './ui/input'
import { ChatUserBlock } from './components/user-block'
import { ChatMessagesBlock } from './components/messages'
import { chatState } from '@/shared/store/functional/chat/content'
import { PinnedMsgsList } from './components/pinnedMsgsList'
import { useState } from 'react'
import { ChatAddMediaBlock } from './components/add-media-block'

export const ChatWindow = observer(() => {
  const { chat } = getChatApi
  const [img, setImg] = useState<string | null>(null)
  const isMobile = useMobile()

  if (isMobile && !chat) return
  const { isChat } = chatState
  const chattingUser = chat?.people.filter(p => p.displayName != authApi.user?.displayName)[0]

  return (
    <div className={`${s.chatWindow} flex fdc ${!chat && 'jcc aic'}`}>
      {chat ? (
        isChat ? (
          <>
            {img && <ChatAddMediaBlock image={img} setImage={setImg} />}
            <ChatUserBlock chattingUser={chattingUser!} />
            <ChatMessagesBlock chattingUser={chattingUser!} />
            <ChatInputUI isAttachmentView img={img} setImg={setImg} />
          </>
        ) : (
          <PinnedMsgsList pin={chat?.pinned} />
        )
      ) : (
        <b>Choose the chat</b>
      )}
    </div>
  )
})
