import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
import { useState } from 'react'

import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import { chatState } from '@/shared/store/functional/chat/content'

import { useMobile } from '@/shared/hooks/useMobile'

import { ChatInputUI } from './ui/input'
import { ChatUserBlock } from './components/user-block'
import { ChatMessagesBlock } from './components/messages'
import { PinnedMsgsList } from './components/pinnedMsgsList'
import { ChatAddMediaBlock } from './components/add-media-block'
import { ImageModal } from '@/shared/ui/image-modal'

export const ChatWindow = observer(() => {
  const { chat } = getChatApi
  const { isChat } = chatState

  const [img, setImg] = useState<string | null>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  const handleSelectedImage = (image: boolean) => {
    if (!image) setSelectedImg(null)
  }

  const isMobile = useMobile()

  if (isMobile && !chat) return

  const chattingUser = chat?.people.filter(p => p.displayName !== authApi.user?.displayName)[0]

  return (
    <div className={`${s.chatWindow} flex fdc ${!chat && 'jcc aic'}`}>
      {chat ? (
        isChat ? (
          <>
            {selectedImg && (
              <ImageModal img={selectedImg} isOpened={selectedImg != null} setIsOpened={handleSelectedImage} />
            )}
            {img && <ChatAddMediaBlock image={img} setImage={setImg} chattingUser={chattingUser?.displayName} />}
            <ChatUserBlock chattingUser={chattingUser!} />
            <ChatMessagesBlock chattingUser={chattingUser!} setSelectedImg={setSelectedImg} />
            <ChatInputUI isAttachmentView image={img} setImage={setImg} chattingUser={chattingUser?.displayName} />
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
