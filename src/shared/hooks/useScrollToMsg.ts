import getChatApi from '../store/api/chats/chat/get-chat-api'
import { chatState } from '../store/functional/chat/content'

export const useScrollToMsg = (id: string) => {
  const { setIsChat } = chatState
  const { chat } = getChatApi
  setIsChat(true)
  const tgtMsg = chat?.messages.find(m => m.id == id)
  if (tgtMsg) {
    setTimeout(() => {
      const targetElement = document.getElementById(`${id}`)
      if (!targetElement) return alert('Message is not found')
      targetElement.classList.add('highlighted')
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        targetElement.classList.remove('highlighted')
      }, 1100)
    }, 10)
  }
}
