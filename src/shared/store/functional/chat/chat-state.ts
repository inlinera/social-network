import { makeAutoObservable } from 'mobx'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IMessage } from '@/shared/interfaces/IChat'

export interface IChatState {
  people?: IFriend
  messages?: IMessage[]
  chatId?: string
  setChat: (_: IChatState | null) => void
}

class ChatState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== CHAT STATE ===================
  chat = null as IChatState | null

  setChat = (chat: IChatState | null) => (this.chat = chat)
}

export default new ChatState()
