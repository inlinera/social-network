import { chatState } from '@/shared/store/functional/chat/content'
import s from './index.module.scss'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'

interface ChatCommonMsgViewUiProps {
  children: React.ReactNode
  id: string
}

export const ChatCommonMsgViewUi = ({ children, id }: ChatCommonMsgViewUiProps) => {
  const { setIsChat } = chatState
  const { chat } = getChatApi
  const useScrollToMsg = (id: string) => {
    setIsChat(true)
    const tgtMsg = chat?.messages.find(m => m.id == id)
    if (tgtMsg) {
      setTimeout(() => {
        const targetElement = document.getElementById(`${id}`)
        if (!targetElement) return alert('Message is not found')
        targetElement.classList.add('highlighted')
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          targetElement.classList.remove('highlighted')
        }, 1100)
      }, 10)
    }
  }
  return (
    <div className={`${s.editing} flex`} onClick={() => useScrollToMsg(id)}>
      <div className={s.leftBlock} />
      <div>{children}</div>
    </div>
  )
}
