import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'

class ChatState {
  constructor() {
    makeAutoObservable(this)
  }

  isChat = false
  setIsChat = (_: boolean) => (this.isChat = _)

  message: React.MutableRefObject<IMessage | null> | null = null
  setMessage = (_: React.MutableRefObject<IMessage | null> | null) => (this.message = _)
}

export const chatState = new ChatState()
