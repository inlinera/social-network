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

export const ChatWindow = observer(() => {
  const { chat } = getChatApi
  const isMobile = useMobile()

  if (isMobile && !chat) return
  const chattingUser = chat?.people.filter(p => p.displayName != authApi.user?.displayName)[0]

  return (
    <div className={`${s.chatWindow} flex fdc ${!chat && 'jcc aic'}`}>
      {chat ? (
        <>
          <ChatUserBlock chattingUser={chattingUser!} />
          <ChatMessagesBlock chattingUser={chattingUser!} />
          <ChatInputUI />
        </>
      ) : (
        'Choose the chat'
      )}
    </div>
  )
})
