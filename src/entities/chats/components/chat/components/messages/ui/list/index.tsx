import { observer } from 'mobx-react-lite'
// MOBX
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import authApi from '@/shared/store/api/user/auth/auth-api'
// COMPONENTS
import { ChatMessageUI } from '../../../../ui/message'

interface ChatMessagesListProps {
  setSelectedImg: (_: string | null) => void
}

export const ChatMessagesList = observer(({ setSelectedImg }: ChatMessagesListProps) => {
  const { user } = authApi
  const { chat } = getChatApi
  return chat?.messages.map(m => {
    const isThisMessageMy = m.userId === user?.displayName
    return (
      <ChatMessageUI
        isThisMessageMy={isThisMessageMy}
        message={m}
        setSelectedImg={setSelectedImg}
        key={m.id}
      />
    )
  })
})
